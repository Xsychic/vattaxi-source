<script setup>

    const close = () => window.ipcRenderer.window.close();
    const maximise = () => {
        window.ipcRenderer.window.maximise();
        // toggle icon
    }
    const minimise = () => window.ipcRenderer.window.minimise();

</script>

<template>
    <nav>
        <div class="nav-controls">
            <span class="nav-link" @click="minimise">&minus;</span>
            <span class="nav-link" @click="maximise">&#128470;</span>
            <span class="nav-link" @click="close">&#10006;</span>
        </div>
    </nav>
</template>

<style scoped>
    nav {
        height: 40px;
        width: 100vw;
        background-color: #202124;
        color: white;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        -webkit-app-region: drag;
    }

    .nav-controls {
        height: 100%;
        display: flex;
        user-select: none;
        -webkit-user-select: none;
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
        background: #424242;
    }

    .nav-link:hover:last-of-type {
        background: #dd112b;
    }
</style>