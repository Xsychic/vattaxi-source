<script setup>
    import paper from 'paper';
    import DataProvider from '@/js/map/positionData';
    import TempTools from '@/components/TempTools.vue';
    import mapTransformations from '@/js/map/mapTransformations';
    import WrongTurnBanner from '@/components/Map/WrongTurnBanner.vue';
    
    import { generateDirections } from '@/js/map/directionLogic';
    import { ref, onMounted, watch, defineProps, defineEmits, toRaw } from 'vue';
    import { calculatePixelCoords, parseRoute, trimRoute } from '@/js/map/mapLogic';
    import { getSegment, checkSegment, checkWrongTurn } from '@/js/map/segmentLogic';
    import { setupCanvas, drawGraph, drawRoute, clearPaths, plotPosition } from '@/js/map/drawingFunctions';


    const props = defineProps(['routeStringArr', 'routeFound', 'segment', 'turnDetection']);
    const emit = defineEmits(['updateConnection', 'updateRouteFound', 'updateSegment', 'clearRoute', 'newRouteArr', 'newDirections', 'updateRouteStringArr']);

    // transformation functions var
    let transformations;

    // filter vars
    const showFilters = ref(false);
    const layerStatus = ref({
        rwyMarkings: true,
        taxiMarkings: true,
        hpMarkings: true,
        standMarkings: true,
        taxiLabels: true,
        hpLabels: true,
        standLabels: true,
        buildingLabels: true 
    }, { deep: true });

    
    const rasters = {};
    const layers = {};

    onMounted(() => {
        // setup paper canvas
        const chartFrame = document.querySelector('.chart');
        const chart = document.querySelector('#chart-stack');
        const canvas = document.querySelector('#canvas');

        // setup canvas with paper.js and add images to background
        setupCanvas(canvas, rasters, layers)

        // create map transformations object
        transformations = new mapTransformations(chartFrame, chart);

        // timeout allows for components to be mounted that initMap relies on (required at least 5ms on my pc)
        setTimeout(transformations.initMap, 50);

        
        // add map scroll listener
        transformations.chartFrame.addEventListener("wheel", (e)=> {
            if (e.deltaY > 0) {
                transformations.zoom('out')
            } else {
                transformations.zoom('in');
            }
        });      

        if(showGraph.value) {
            drawGraph(graphPaths, layers);
        }
    });   

    // get position data and sim connection status
    const { connected, data } = new DataProvider();
    const plot = ref(); 
    const drawnRoute = ref([]);
    const allSegments = ref([]);
    const routeArr = ref([]);
    const pxCoords = ref({});
    const displayBanner = ref(false);
    let oldSegment = false;

    watch(connected, (connectionStatus) => {
        emit('updateConnection', connectionStatus);
    
        if(!connectionStatus) {
            if(plot.value) {
                plot.value.remove();
                plot.value = false;
            }

            pxCoords.value = {};
            allSegments.value = [];
            displayBanner.value = false;
            oldSegment = false;
            emit('updateSegment', false);
            emit('clearRoute');

            

            if(drawnRoute.value?.length) {
                clearPaths(drawnRoute.value);
            }
        }
    });


    watch(data, (newValue) => {
        // get x and y pixel coords and check if in bounds of map
        const { x, y, oob = false } = calculatePixelCoords(newValue);
        
        if(plot.value) {
            plot.value.remove(); 
        }

        if(oob) {
            if(plot.value) {
                plot.value = false;
                pxCoords.value = {};
                emit('updateSegment', false);
            }
            return;
        }

        let coords = {
            x: Math.round(x * 10) / 10, 
            y: Math.round(y * 10) / 10
        };

        // find list of possible segments and select the best if any found
        let newSeg = getSegment(x, y, oldSegment, props);
        
        if(!oldSegment || newSeg !== oldSegment) {
            // segment change - can't be in watcher, changes must happen before route trimmed
            oldSegment = newSeg;
            emit('updateSegment', newSeg);
        }

        trimRoute(coords, routeArr, drawnRoute);
        plotPosition(coords, plot, layers, routeArr.value, drawnRoute);

        if(!routeArr.value.length) {
           emit('clearRoute');
        }

        pxCoords.value = coords;
    });


    watch(() => props.segment, (newSegment, oldSegment) => {
        if(!props.turnDetection || !routeArr.value?.length || !pxCoords.value?.x)
            return;

        checkWrongTurn(newSegment, oldSegment, allSegments, routeArr, pxCoords, props, displayBanner);
    });

    
    watch(() => props.routeStringArr, async (newRoute) => {
        // if route string array changes, parse new route

        clearPaths(drawnRoute.value);

        if(!props.segment || !newRoute?.length) {
            // either no current segment or no route so can't parse
            if(routeArr.value?.length) {
                routeArr.value = [];
            }
            return;
        }

        // get the best one of the possible segments
        const { segment: newSeg = false, implicitTaxiway = false, pathFound } = checkSegment(props.segment, pxCoords.value, newRoute);

        if(!pathFound || !newSeg) {
            // if no route found
            if(props.routeFound)
                emit('updateRouteFound', false);
            routeArr.value = [];
            return;
        }

        if(newSeg !== props.segment) {
            emit('updateSegment', newSeg);
        }

        if(implicitTaxiway) {
            newRoute.splice(0, 0, newSeg.name);
            emit('newRouteArr', newRoute);
        }

        let loopCounter = 0;

        while(newSeg !== toRaw(props.segment)) {
            loopCounter++;
            if(loopCounter === 200) {
                // have been looping for 2 seconds, report error and exit
                alert('uh oh, looks like something\'s gone wrong :( (sorry!)');
                console.log('timeout waiting for segment to update');
                return;
            }
                
            await new Promise((resolve) => setTimeout(resolve, 10));
        }

        const point = props.segment.points[0];
        const newRouteArr = parseRoute(point, newRoute, props.segment, allSegments, pxCoords.value);

        if(newRouteArr && newRouteArr[0]?.x) {
            // make sure at least one taxiway segment linked to first point is in the allSegments array to prevent wrong turn detection tripping at start of route
            let firstPoint = newRouteArr[0];
            let inc = false;

            for(let i = 0; i < firstPoint.adjacentTaxiwaySegments.length; i++) {
                let segment = firstPoint.adjacentTaxiwaySegments[i];
                if(allSegments.value.includes(segment)) {
                    inc = true;
                    break;
                }
            }

            if(inc === false && firstPoint.adjacentTaxiwaySegments.length) {
                // no taxiway segment linked to first point is in the allSegments array
                allSegments.value.splice(0, 0, firstPoint.adjacentTaxiwaySegments[0])
            }
        }

        if(!newRouteArr) {
            // if no route found
            if(props.routeFound)
                emit('updateRouteFound', false);
            routeArr.value = [];
            return;
        } else {
            emit('updateRouteFound', true);
            routeArr.value = newRouteArr;
        }

        // route found - generate directions and draw route
        let directions = generateDirections(routeArr, newRoute, props.segment, pxCoords.value);
        emit('newRouteArr', routeArr.value);
        emit('newDirections', directions);

        if(!newRouteArr || !newRouteArr.length)
            return;

        drawnRoute.value = drawRoute(newRouteArr, pxCoords.value);
    });


    watch(routeArr, (newRouteArr) => {
        emit('newRouteArr', newRouteArr);
    });

    // temp tools stuff

    var locator = ref(false);
    var segment = ref(false);
    const demoTool = ref(false);
    const locatorTool = ref(false);
    const segmentTool = ref(false);
    const demoToolOn = ref(false);
    const locatorToolOn = ref(false);
    const segmentToolOn = ref(false);
    const showGraph = ref(true);
    const graphPaths = [];

    watch(showGraph, (show) => {
        if(show) {
            drawGraph(graphPaths, layers);
        } else {
            clearPaths(graphPaths);
        }
    });

    const turnOffTools = () => {
        if(locatorTool.value) {
            locatorTool.value.remove();
            locatorTool.value = false;
            locatorToolOn.value = false;
            locator.value = false;
        }
        
        if(segmentTool.value) {
            segmentTool.value.remove();
            segmentTool.value = false;
            segmentToolOn.value = false;
            segment.value = false;
        }
        
        if(demoTool.value) {
            demoTool.value.remove();
            demoTool.value = false;
            demoToolOn.value = false;
        }
    }

    const toggleLocatorTool = () => {          
        if(!locatorToolOn.value) {
            turnOffTools();

            locatorToolOn.value = true;
            locatorTool.value = new paper.Tool();

            locatorTool.value.onMouseUp = (event) => {
                event.scale = transformations.scale;
                locator.value = event;
                // write points to clipboard in json format
                navigator.clipboard.writeText(`{x: ${Math.round(10* event.point.x / event.scale)/10}, y: ${Math.round(10*event.point.y / event.scale)/10}}`);
            }

            locatorTool.value.activate();
        } else {
            turnOffTools();
            locatorToolOn.value = false;
        }
    }


    const toggleSegmentTool = () => {
        if(!segmentToolOn.value) {
            turnOffTools();
            segmentToolOn.value = true;
            segmentTool.value = new paper.Tool();

            segmentTool.value.onMouseUp = (event) => {
                event.scale = transformations.scale;
                const adjustedX = Math.round(10 * event.point.x / event.scale) / 10;
                const adjustedY = Math.round(10 * event.point.y / event.scale) / 10;
                
                let seg = getSegment(adjustedX, adjustedY, false, props, true);

                if(seg) {
                    if(!Array.isArray(seg)) {
                        seg = [seg];
                    }
                    
                    // point in only one segment
                    let formattedSegment = `(${adjustedX}, ${adjustedY}), ${ (seg.length > 1 ? 'Twys' : 'Twy' ) } `;
                    let formatPoint = (point) => `{x: ${ point.x }, y: ${ point.y }}`;
                    // console.clear();

                    for(let i = 0; i < seg.length; i++) {
                        formattedSegment += seg[i].name + ' ';
                        let printString = `Twy ${ seg[i].name } bounds:\n`;

                        for(let j = 0; j < seg[i].bounds.length; j++) {
                            let pt = seg[i].bounds[j];
                            printString += formatPoint(pt);
                            
                            if(j !== seg[i].bounds.length - 1)
                                printString += ',\n'
                        }
                        console.log(printString);
                    }

                    segment.value = formattedSegment;
                } else {
                    segment.value = `(${adjustedX}, ${adjustedY}) not in segment`;
                }
            }

            segmentTool.value.activate();
        } else {
            turnOffTools();
            segmentToolOn.value = false;
        }
    }


    const pxToLatLong = (x, y) => {
        const baseLat = 51.150559; // T/J Intersection
        const baseLong = -0.214077; // J4
        const baseYPx = 1512; // T/J Intersection
        const baseXPx = 568; // J4
        const pxPerLat = -880 / 0.012625; // T/J -> St574
        const pxPerLong = 1970 / 0.045032; // J4 -> A2
        let latitude = (y - baseYPx) / pxPerLat + baseLat;
        let longitude = (x - baseXPx) / pxPerLong + baseLong;

        return { latitude, longitude };
    }

    const toggleDemoTool = () => {
        if(!demoToolOn.value) {
            // turn on demo tool
            turnOffTools();
            demoToolOn.value = true;

            
            demoTool.value = new paper.Tool();

            demoTool.value.onMouseUp = (event) => {
                event.scale = transformations.scale;
                // write points to clipboard in json format
                const x = Math.round(10 * event.point.x / event.scale) / 10;
                const y = Math.round(10 * event.point.y / event.scale) / 10;
                const crds = pxToLatLong(x, y);
                data.value = crds; 
            }

            demoTool.value.activate();

        } else {
            turnOffTools();
        }
    }

    // function to show/hide map layers
    const toggleLayer = (event) => {
        let layerName = event.target.name;
        layers[layerName].visible = layerStatus.value[layerName];
    }
</script>

<template>
    <div class='chart'>
        <TempTools 
            :plot='plot' 
            :locator='locator' 
            :segment='segment'
            :demoToolOn='demoToolOn'
            :locatorToolOn='locatorToolOn'
            :segmentToolOn='segmentToolOn'
            :showGraph='showGraph' 
            @demoTool='toggleDemoTool'
            @locatorTool='toggleLocatorTool' 
            @segmentTool='toggleSegmentTool' 
            @toggleGraph='showGraph = !showGraph'
        />

        <WrongTurnBanner @closeBanner='displayBanner = false' v-if='displayBanner' />

        <div id="chart-wrapper">
            <div id="chart-stack">
                <!-- 3452 2759 -->
                <canvas id='canvas' width='3452' height='2759' @dragstart='transformations.dragStart' @drag='transformations.drag' @dragend='transformations.dragEnd' draggable='true'></canvas>
                <img class='chart-layer' id='chart-base-layer' src='@/assets/chart/kk-concrete.png' alt='airfield chart concrete base layer'>
                <img class='chart-layer' id='chart-rwy-markings-layer' src='@/assets/chart/kk-runway-markings.png' alt='airfield chart runway markings'>
                <img class='chart-layer' id='chart-taxi-markings-layer' src='@/assets/chart/kk-taxi-markings.png' alt='airfield chart taxi markings'>
                <img class='chart-layer' id='chart-hp-markings-layer' src='@/assets/chart/kk-holding-point-markings.png' alt='airfield chart holding point markings'>
                <img class='chart-layer' id='chart-stand-markings-layer' src='@/assets/chart/kk-stand-markings.png' alt='airfield chart stand markings'>
                <img class='chart-layer' id='chart-taxi-labels-layer' src='@/assets/chart/kk-taxi-labels.png' alt='airfield chart taxi labels'>
                <img class='chart-layer' id='chart-hp-labels-layer' src='@/assets/chart/kk-holding-point-labels.png' alt='airfield chart holding point labels'>
                <img class='chart-layer' id='chart-stand-labels-layer' src='@/assets/chart/kk-stand-labels.png' alt='airfield chart stand labels'>
                <img class='chart-layer' id='chart-building-labels-layer' src='@/assets/chart/kk-building-labels.png' alt='airfield chart building labels'>
            </div>
        </div>

        <div class='controls'>
            <div>
                <div class='control-button filter' @click='showFilters = !showFilters'>
                    <font-awesome-icon icon='fa-solid fa-filter'></font-awesome-icon>
                </div>  
                
                <div class='zoom'>
                    <div class='control-button zoom-in' @click='transformations.zoom("in")'>
                        <font-awesome-icon icon='fa-solid fa-plus'></font-awesome-icon>
                    </div>
                    <div class='control-button zoom-out' @click='transformations.zoom("out")'>
                        <font-awesome-icon icon='fa-solid fa-minus'></font-awesome-icon>
                    
                    </div>
                </div>
            </div>

            <div class='filters' v-show='showFilters'>
                <h5 class='filter-header'>Markings</h5>
                <ul class='filter-list'>
                    <li>
                        <input class='filter-checkbox' name='rwyMarkings' type='checkbox' v-model='layerStatus.rwyMarkings' @change='toggleLayer'>
                        Runway
                    </li>
                    <li>
                        <input class='filter-checkbox' name='taxiMarkings' type='checkbox' v-model='layerStatus.taxiMarkings' @change='toggleLayer'>
                        Taxi
                    </li>
                    <li>
                        <input class='filter-checkbox' name='hpMarkings' type='checkbox' v-model='layerStatus.hpMarkings' @change='toggleLayer'>
                        Holding Point
                    </li>
                    <li>
                        <input class='filter-checkbox' name='standMarkings' type='checkbox' v-model='layerStatus.standMarkings' @change='toggleLayer'>
                        Stand
                    </li>
                </ul>

                <h5 class='filter-header'>Labels</h5>
                <ul class='filter-list'>
                    <li>
                        <input class='filter-checkbox' name='taxiLabels' type='checkbox' v-model='layerStatus.taxiLabels' @change='toggleLayer'>
                        Taxi
                    </li>
                    <li>
                        <input class='filter-checkbox' name='hpLabels' type='checkbox' v-model='layerStatus.hpLabels' @change='toggleLayer'>
                        Holding Point
                    </li>
                    <li>
                        <input class='filter-checkbox' name='standLabels' type='checkbox' v-model='layerStatus.standLabels' @change='toggleLayer'>
                        Stand
                    </li>
                    <li>
                        <input class='filter-checkbox' name='buildingLabels' type='checkbox' v-model='layerStatus.buildingLabels' @change='toggleLayer'>
                        Building
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .chart {
        min-width: 800px;
        min-height: 700px;
        height: 100%;
        width: 70%;
        position: relative;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
    }

    .chart-layer {
        display: none;
    }

    .controls {
        position: absolute;
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-end;
        bottom: 15px;
        right: 9px;
        z-index: 2;
    }

    .control-button {
        height: 34px;
        width: 34px;
        border-radius: 10px;
        background: var(--dark-grey);
        color: var(--marble-grey);
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        -webkit-user-select: none;
    }

    .control-button:active, .control-button:focus, .control-button:hover {
        background: var(--active-grey);
        cursor: pointer;
    }

    .filter {
        margin-bottom: 10px;
        font-size: 18px;
    }

    .filter-checkbox {
        position: relative;
        top: 3px;
        margin: 0;
        transform: scale(0.85);
    }

    .filter-header {
        margin: 0;
        margin-bottom: 1px;
        font-size: 13px;
    }

    .filter-header:nth-of-type(2) {
        margin-top: 4px;
    }

    .filter-list {
        list-style-type: none;
        padding: 0;
        font-size: 13px;
        margin: 0;
    }

    .filter-list li {
        margin-top: -2px;
    }

    .filters {
        background: var(--dark-grey);
        margin-right: 10px;
        border-radius: 10px;
        padding: 6px 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: 15px;
        width: 110px;
    }

    .zoom {
        width: 40px;
        display: flex;
        flex-direction: column;
    }

    .zoom-in {
        border-bottom: 1px solid var(--middle-grey);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .zoom-out {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        background: #aaaaaa;
    }

    #chart-stack {
        z-index: 1;
        position: absolute;
    }

    #chart-wrapper {
        position: relative;
    }
</style>