<script setup>
    import Map from '@/components/Map.vue';
    import TitleBar from '@/components/TitleBar.vue';
    import ControlConsole from '@/components/ControlConsole.vue';
    // import taxiwayCompiler from '@/js/utilities/taxiwayBoundCompiler';

    import { ref } from 'vue'

    const connected = ref(false);
    const routeStringArr = ref([]);
    const routeFound = ref(false);
    const segment = ref(false);
    const routeArr = ref([]);
    const directions = ref([]);
    const turnDetection = ref(true);

    const updateConnection = (newStatus) => connected.value = newStatus;
    const updateRouteStringArr = (newRouteStringArr) => routeStringArr.value = newRouteStringArr;
    const updateRouteFound = (routeValidity) => routeFound.value = routeValidity;
    const updateSegment = (newSegment) => segment.value = newSegment;
    const newRouteArr = (newRouteArr) => routeArr.value = newRouteArr;
    const newDirections = (newDirections) => directions.value = newDirections;
    const toggleTurnDetection = () => turnDetection.value = !turnDetection.value;
    const clearRoute = () => {
        routeStringArr.value = [];
        routeFound.value = false;
        routeArr.value = [];
        directions.value = [];
    }
</script>

<template>
    <TitleBar :connected='connected'></TitleBar>
    
    <div class="content">
        <Map 
            :routeStringArr='routeStringArr'
            :routeFound='routeFound'
            :segment='segment'
            :turnDetection='turnDetection'
            @updateConnection='updateConnection'
            @updateRouteFound='updateRouteFound'
            @updateSegment='updateSegment'
            @clearRoute='clearRoute'
            @newRouteArr='newRouteArr'
            @newDirections='newDirections'
            @updateRouteStringArr='updateRouteStringArr'
        ></Map>
        <ControlConsole 
            :routeStringArr='routeStringArr'
            :routeFound='routeFound'
            :segment='segment'
            :routeArr='routeArr'
            :directions='directions'
            :turnDetection='turnDetection'
            @updateRouteStringArr='updateRouteStringArr'
            @toggleTurnDetection='toggleTurnDetection'
        ></ControlConsole>
    </div>

</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap');

    :root {
        /* colour definitions */

        /* accent colours */
        --green: #43cf2d;
        --blue: #1aa0c9;
        --orange: #e08d2a;
        --red: #dd112b;
        --yellow: #ffcc00;

        /* shades */
        --white: #ffffff;
        --off-white: #eeeeee;
        --marble-grey: #d1d1d1;
        --middle-grey: #969696;
        --icon-grey: #828282;
        --subtle-grey: #626262;
        --active-grey: #424242;
        --dark-grey: #35363a;
        --not-black: #202124;

        /* font definition */
        --font: "Baloo 2", Avenir, Helvetica, Arial, sans-serif;
    }

    body {
        margin: 0;
        background-color: var(--dark-grey);
    } 

    .app {
        position: relative;
    }

    .content {
        height: calc(100vh - 70px);
        width: calc(100vw - 30px);
        margin: 15px;
        display: flex;
        align-items: flex-start;
    }

    #app {
        font-family: var(--font);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
    }
</style>
