<script setup>
    import { ref, onMounted } from 'vue';

    // filter vars
    const showFilters = ref(false);
    const rwyMarkings = ref(true);
    const taxiMarkings = ref(true);
    const hpMarkings = ref(true);
    const standMarkings = ref(true);
    const taxiLabels = ref(true);
    const hpLabels = ref(true);
    const standLabels = ref(true);
    const buildingLabels = ref(true);
    
    // map panning vars
    let chartLastPosition = false;
    let chartFrame = {};
    let chart = {};
    const initialX = -800;
    const initialY = -300;

    onMounted(() => {
        chartFrame = document.querySelector('.chart');
        chart = document.querySelector('#chart-stack');

        // remove not-allowed cursor
        document.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    })


    const drag = (event) => {
        if(!chartLastPosition) {
            chartLastPosition = event;
            return;
        }

        if(event.x == 0 && event.y == 0)
            return;

        // translate on x axis
        let currentLeft = chart.style.left || `${ initialX }px`;
        currentLeft = parseInt(currentLeft.replace('px', ''));
        const xDifference = event.screenX - chartLastPosition.screenX;
        let newLeft = currentLeft + xDifference;

        // x bound checks
        if(newLeft > 0)
            newLeft = 0;

        const minLeft = -1 * (event.target.width - chartFrame.clientWidth);

        if(newLeft < minLeft)
            newLeft = minLeft;

        newLeft = `${ newLeft }px`;
        chart.style.left = newLeft;

        // translate on y axis
        let currentTop = chart.style.top || `${ initialY }px`;
        currentTop = parseInt(currentTop.replace('px', ''));
        const yDifference = event.screenY - chartLastPosition.screenY;
        let newTop = currentTop + yDifference;

        // y bound checks
        if(newTop > 0) 
            newTop = 0;

        const minTop = -1 * (event.target.height - chartFrame.clientHeight);

        if(newTop < minTop)
            newTop = minTop;

        newTop = `${ newTop }px`;
        chart.style.top = newTop;

        chartLastPosition = event;

    }

    const dragEnd = (event) => {
        drag(event)
        chartLastPosition = false;
    }

</script>

<template>
    <div class='chart'>
        <div id="chart-wrapper">
            <div id="chart-stack" @drag='drag' @dragend='dragEnd'>
                <img class='chart-layer' src='@/assets/chart/kk-concrete.png' alt='airfield chart concrete base layer'>
                <img class='chart-layer' src='@/assets/chart/kk-runway-markings.png' alt='airfield chart runway markings' v-if='rwyMarkings'>
                <img class='chart-layer' src='@/assets/chart/kk-taxi-markings.png' alt='airfield chart taxi markings' v-if='taxiMarkings'>
                <img class='chart-layer' src='@/assets/chart/kk-holding-point-markings.png' alt='airfield chart holding point markings' v-if='hpMarkings'>
                <img class='chart-layer' src='@/assets/chart/kk-stand-markings.png' alt='airfield chart stand markings' v-if='standMarkings'>
                <img class='chart-layer' src='@/assets/chart/kk-taxi-labels.png' alt='airfield chart taxi labels' v-if='taxiLabels'>
                <img class='chart-layer' src='@/assets/chart/kk-holding-point-labels.png' alt='airfield chart holding point labels' v-if='hpLabels'>
                <img class='chart-layer' src='@/assets/chart/kk-stand-labels.png' alt='airfield chart stand labels' v-if='standLabels'>
                <img class='chart-layer' src='@/assets/chart/kk-building-labels.png' alt='airfield chart building labels' v-if='buildingLabels'>
            </div>
        </div>
        
        <div class='controls'>
            <div class='buttons'>
                <div class='control-button filter' @click='showFilters = !showFilters'>
                    <font-awesome-icon icon='fa-solid fa-filter'></font-awesome-icon>
                </div>  
                
                <div class='zoom'>
                    <div class='control-button zoom-in'>
                        <font-awesome-icon icon='fa-solid fa-plus'></font-awesome-icon>
                    </div>
                    <div class='control-button zoom-out'>
                        <font-awesome-icon icon='fa-solid fa-minus'></font-awesome-icon>
                    
                    </div>
                </div>
            </div>

            <div class='filters' v-show='showFilters'>
                <h5 class='filter-header'>Markings</h5>
                <ul class='filter-list'>
                    <li>
                        <input class='filter-checkbox' name='runway-markings' type='checkbox' v-model='rwyMarkings'>
                        Runway
                    </li>
                    <li>
                        <input class='filter-checkbox' name='taxi-markings' type='checkbox' v-model='taxiMarkings'>
                        Taxi
                    </li>
                    <li>
                        <input class='filter-checkbox' name='hp-markings' type='checkbox' v-model='hpMarkings'>
                        Holding Point
                    </li>
                    <li>
                        <input class='filter-checkbox' name='stand-markings' type='checkbox' v-model='standMarkings'>
                        Stand
                    </li>
                </ul>

                <h5 class='filter-header'>Labels</h5>
                <ul class='filter-list'>
                    <li>
                        <input class='filter-checkbox' name='taxi-labels' type='checkbox' v-model='taxiLabels'>
                        Taxi
                    </li>
                    <li>
                        <input class='filter-checkbox' name='hp-labels' type='checkbox' v-model='hpLabels'>
                        Holding Point
                    </li>
                    <li>
                        <input class='filter-checkbox' name='stand-labels' type='checkbox' v-model='standLabels'>
                        Stand
                    </li>
                    <li>
                        <input class='filter-checkbox' name='building-labels' type='checkbox' v-model='buildingLabels'>
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
    }

    .chart-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 2000px;
    }

    .controls {
        position: absolute;
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-end;
        bottom: 15px;
        right: 15px;
        z-index: 2;
    }

    .control-button {
        height: 40px;
        border-radius: 10px;
        background: var(--dark-grey);
        color: var(--marble-grey);
        font-size: 30px;
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
        font-size: 22px;
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

    #chart-stack {
        z-index: 1;
        position: absolute;
        top: -300px;
        left: -800px;
    }

    #chart-wrapper {
        position: relative;
    }
</style>