<script setup>
    import { ref, defineProps, defineEmits } from 'vue';

    const props = defineProps(['plot', 'locator', 'showGraph']);
    const emit = defineEmits(['locatorTool', 'toggleGraph']);

    const toolOn = ref(false);

    const handle = () => {
        toolOn.value = !toolOn.value;
        emit("locatorTool"); 
    }
</script>

<template>
    <div class='tools'>
        <div class='block'>Plotted position: {{ (plot?.position ? plot.position : 'No plot') }}</div>
        <div class='block' @click='handle'>Locator: {{ (locator?.point ? `x: ${ Math.round(locator.point.x) }, y: ${ Math.round(locator.point.y) }, scale: ${ Math.round(locator.scale * 100) / 100 } Ax: ${ Math.round(locator.point.x / locator.scale) }, Ay: ${ Math.round(locator.point.y / locator.scale) }` : (toolOn ? 'On' : 'Off')) }}</div>
        <div class='block'>
            Display Graph: 
            <input type='checkbox' :checked='showGraph' v-on:change='emit("toggleGraph")'>
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