<script setup>
    import TitleBar from '@/components/TitleBar.vue';
</script>

<template>
    <TitleBar></TitleBar>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap');

    :root {
        /* colour definitions */

        /* accent colours */
        --green: #43cf2d;
        --red: #dd112b;

        /* shades */
        --active-grey: #424242;
        --dark-grey: #35363a;
        --not-black: #202124;
    }

    body {
        margin: 0;
        background-color: var(--dark-grey);
    } 

    .app {
        position: relative;
    }

    #app {
        font-family: "Baloo 2", Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
    }
</style>
