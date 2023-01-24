<script setup>
    import { defineProps } from 'vue';

    const props = defineProps(['connected']);

    const close = () => window.ipcRenderer.window.close();
    const maximise = () => {
        window.ipcRenderer.window.maximise();
        // toggle icon
    }
    const minimise = () => window.ipcRenderer.window.minimise();

</script>

<template>
    <nav>
        <h1 class="title">VATTAXI</h1>
        
        <div class="nav-right">
            <div class="simulator-status">
                <div class="status-light" :class='"status-light-" + (connected ? "green" : "red")'></div>
                {{ (connected ? "C" : "Not c") }}onnected to simulator
            </div>

            <div class="nav-controls">
                <span class="nav-link" @click="minimise">
                    <font-awesome-icon icon='fa-solid fa-window-minimize'></font-awesome-icon>
                </span>
                <span class="nav-link" @click="maximise">&#128470;</span>
                <span class="nav-link" @click="close">&#10006;</span>
            </div>
        </div>

    </nav>
</template>

<style scoped>
    nav {
        height: 40px;
        width: 100vw;
        background-color: var(--not-black);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-app-region: drag;
    }

    .nav-controls {
        height: 100%;
        display: flex;
        -webkit-app-region: no-drag;
    }

    .nav-link {
        padding: 0 12px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
    }

    .nav-link:nth-of-type(2) {
        padding-bottom: 3px;
        height: calc(100% - 3px);
    }

    .nav-link:hover {
        background: var(--active-grey);
    }

    .nav-link:hover:last-of-type {
        background: var(--red);
    }

    .nav-right {
        height: 100%;
        display: flex;
        user-select: none;
        -webkit-user-select: none;
    }

    .simulator-status {
        margin-right: 15px;
        font-weight: 600;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .status-light {
        height: 9px;
        width: 9px;
        border-radius: 50%;
        margin: 0 3px;
    }

    .status-light-green {
        background: var(--green);
    }

    .status-light-red {
        background: var(--red);
    }

    .title {
        font-weight: 600;
        font-size: 24px;
        margin-left: 15px;
    }
</style>