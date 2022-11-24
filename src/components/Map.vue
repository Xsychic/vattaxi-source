<script setup>
    import { ref } from 'vue';

    const showFilters = ref(false);
    let chartLastPosition = false;

    const drag = (event) => {
        const target = event.target;

        if(target.id !== 'chart-image')
            return;
        
        if(!chartLastPosition) {
            chartLastPosition = event;
            return;
        }

        const xChange = event.x - chartLastPosition.x;

        let currentLeft = target.style.left || '0px';
        currentLeft = parseInt(currentLeft.replace('px', ''));
        const newLeft = `${ currentLeft + xChange }px`;
        target.style.left = newLeft;

        chartLastPosition = event;

    }
</script>

<template>
    <div class='chart'>
        <img id='chart-image' src='@/assets/chart/kk-all-layers.png' alt='airfield chart' @drag='drag'>

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
                        <input class='filter-checkbox' name='runway-markings' type='checkbox' checked>
                        Runway
                    </li>
                    <li>
                        <input class='filter-checkbox' name='taxi-markings' type='checkbox' checked>
                        Taxi
                    </li>
                    <li>
                        <input class='filter-checkbox' name='hp-markings' type='checkbox' checked>
                        Holding Point
                    </li>
                    <li>
                        <input class='filter-checkbox' name='stand-markings' type='checkbox' checked>
                        Stand
                    </li>
                </ul>

                <h5 class='filter-header'>Labels</h5>
                <ul class='filter-list'>
                    <li>
                        <input class='filter-checkbox' name='taxi-labels' type='checkbox' checked>
                        Taxi
                    </li>
                    <li>
                        <input class='filter-checkbox' name='hp-labels' type='checkbox' checked>
                        Holding Point
                    </li>
                    <li>
                        <input class='filter-checkbox' name='stand-labels' type='checkbox' checked>
                        Stand
                    </li>
                    <li>
                        <input class='filter-checkbox' name='building-labels' type='checkbox' checked>
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

    #chart-image {
        z-index: 1;
        position: absolute;
        bottom: 800px;
        width: 1000px;
        top: 0;
        /* right: 1700px; */
    }
</style>