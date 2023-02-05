<script setup>
    import paper from 'paper';
    import draw from '@/js/drawingFunctions';
    import DataProvider from '@/js/positionData';
    import TempTools from '@/components/TempTools.vue';
    import mapTransformations from '@/js/mapTransformations';
    import { ref, onMounted, watch, defineEmits } from 'vue';


    const emit = defineEmits(['updateConnection']);

    // transformation functions var
    let transformations;

    // for temp tools - REMOVE
    var locator = ref();
    const tool = ref(false);

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
    

    // get position data and sim connection status
    const { connected, data } = new DataProvider();
    const plot = ref();

    watch(connected, (newValue) => emit('updateConnection', newValue));
    watch(data, (newValue) => {

        let { latitude = false, longitude = false } = newValue;
        
        const latLower = 51.10631, latUpper = 51.20330;
        const longLower = -0.28233, longUpper = -0.07946;

        // if no position coords or coords out of bounds
        if(!latitude || !longitude || latitude < latLower || latitude > latUpper || longitude < longLower || longitude > longUpper) {
            if(plot.value) {
                plot.value.remove();
                plot.value = false;
            }

            return;
        }

        // coord translation to pixels
        // lat is vertical, long horizontal
        const baseLat = 51.150559; // T/J Intersection
        const baseLong = -0.214077; // J4
        const baseYPx = 1512; // T/J Intersection
        const baseXPx = 568; // J4
        const pxPerLat = -880 / 0.012625; // T/J -> St574
        const pxPerLong = 1970 / 0.045032; // J4 -> A2
        let yPx = baseYPx + (latitude - baseLat) * pxPerLat;
        let xPx = baseXPx + (longitude - baseLong) * pxPerLong;
        // console.log(`latitude: ${ latitude }\nlongitude: ${ longitude }\nlatDiff: ${ latitude - baseLat }\nlongDiff: ${ longitude - baseLong }\npxPerLat: ${ pxPerLat }\npxPerLong: ${ pxPerLong }\nlatOffset: ${ (latitude - baseLat) * pxPerLat }\nlongOffset: ${ (longitude - baseLong) * pxPerLong }\nxPx: ${ xPx }\nyPx: ${ yPx }`);
        let point = new paper.Point(xPx, yPx);
        
        const yLower = 0, yUpper = 3452;
        const xLower = 0, xUpper = 2759;

        if(plot.value)
            plot.value.remove();
        
        if(xPx < xLower || xPx > xUpper || yPx < yLower || yPx > yUpper) {
            if(plot.value)
                plot.value = false;
            return;
        }

        plot.value = new paper.Path.Circle(point, 6);
        plot.value.fillColor = 'red';
    });


    const rasters = {};
    const layers = {};

    onMounted(() => {
        // setup paper canvas
        const chartFrame = document.querySelector('.chart');
        const chart = document.querySelector('#chart-stack');
        const canvas = document.querySelector('#canvas');
        
        // setup canvas with paper.js and add images to background
        draw.setupCanvas(canvas, rasters, layers)

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
            draw.drawGraph(graphPaths);
        }
    });    

    const showGraph = ref(true);
    const graphPaths = [];

    watch(showGraph, (show) => {
        if(show) {
            draw.drawGraph(graphPaths);
        } else {
            while(graphPaths.length > 0) {
                graphPaths.pop().remove();
            }
        }
    });

    const toggleTool = () => {
        if(tool.value) {
            tool.value.remove();
            locator.value = {};
            tool.value = false;
        } else {
            tool.value = new paper.Tool();

            tool.value.onMouseUp = (event) => {
                event.scale = transformations.scale;
                locator.value = event;
                // write points to clipboard in json format
                navigator.clipboard.writeText(`{x: ${Math.round(event.point.x / event.scale)}, y: ${Math.round(event.point.y / event.scale)}}`);
            }

            tool.value.activate();
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
        <TempTools :plot='plot' :locator='locator' :showGraph='showGraph' @locatorTool='toggleTool' @toggleGraph='showGraph = !showGraph'></TempTools>
        
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