<script setup>
    import Map from '@/components/Map.vue';
    import Settings from '@/components/Settings.vue';
    import TitleBar from '@/components/TitleBar.vue';
    import ControlConsole from '@/components/ControlConsole.vue';

    import { ref } from 'vue'

    const showSettings = ref(false);
</script>

<template>
    <TitleBar></TitleBar>
    
    <div class="content">
        <Map v-show='!showSettings'></Map>
        <ControlConsole @openSettings='showSettings = !showSettings' v-show='!showSettings'></ControlConsole>
        <Settings @closeSettings='showSettings = !showSettings' v-show='showSettings'></Settings>
    </div>

</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap');

    :root {
        /* colour definitions */

        /* accent colours */
        --green: #43cf2d;
        --blue: #1aa0c9;
        --red: #dd112b;

        /* shades */
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
