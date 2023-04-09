<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps(['plot', 'locator', 'segment', 'showGraph', 'locatorToolOn', 'segmentToolOn', 'demoToolOn']);
    const emit = defineEmits(['locatorTool', 'segmentTool', 'toggleGraph', 'demoTool']);


    const locatorTool = () => {
        emit("locatorTool"); 
    }

    const segmentTool = () => {
        emit('segmentTool');
    }

    const demoTool = () => {
        emit('demoTool');
    }
</script>

<template>
    <div class='tools'>
        <div class='block'>Plotted position: {{ (plot?.position ? `x: ${Math.round(plot.position.x)}, y: ${Math.round(plot.position.y)}` : 'No plot') }}</div>
        <div class='block' @click='locatorTool'>
            Locator: {{ ( locator !== false ? `
                x: ${ Math.round(locator.point.x) }, 
                y: ${ Math.round(locator.point.y) }, 
                scale: ${ Math.round(locator.scale * 100) / 100 } 
                Ax: ${ Math.round(locator.point.x / locator.scale * 10) / 10 }, 
                Ay: ${ Math.round(locator.point.y / locator.scale * 10) / 10 }` : (locatorToolOn ? 'On' : 'Off')) }}
        </div>
        <div class='block' @click='segmentTool'>
            Segment: {{ ( segment !== false ? segment : (segmentToolOn ? 'On' : 'Off') ) }}
        </div>
        <div class='block'>
            Display Graph: 
            <input type='checkbox' :checked='showGraph' v-on:change='emit("toggleGraph")'>
        </div>
        <div class='block' @click='demoTool'>
            Demo Tool: {{ ( demoToolOn ? 'On' : 'Off' ) }}
        </div>
    </div>

</template>

<style scoped>
    input {
        margin-left: 6px;
        position: relative;
        top: 1px;
    }

    .tools {
        display: flex;
        color: black;
        z-index: 100;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .block {
        min-width: 50px;
        height: 30px;
        background: white;
        padding: 3px;
        margin-right: 5px;
        display: flex;
        align-items: center;
    }
</style>