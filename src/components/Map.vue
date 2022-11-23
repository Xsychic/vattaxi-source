<script setup>

</script>

<template>
    <div class='chart'>
        <div class='controls'>
            <div class='control-button filter'>
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
    </div>
</template>

<style scoped>
    .chart {
        min-width: 800px;
        min-height: 700px;
        height: 100%;
        width: 70%;
        background: url('@/assets/chart/kk-all-layers.png');
        background-position: center;
        background-size: 2500px;
        position: relative;
    }

    .controls {
        position: absolute;
        bottom: 15px;
        right: 15px;
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
    }

    .control-button:active, .control-button:focus, .control-button:hover {
        background: var(--active-grey);
        cursor: pointer;
    }

    .filter {
        margin-bottom: 10px;
        font-size: 22px;
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
</style>