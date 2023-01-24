<script setup>
    import { defineEmits, defineProps } from 'vue';

    const props = defineProps(['modeOnline']);
    const emit = defineEmits(['closeSettings', 'toggleMode']);
</script>

<template>
    <div class='settings-container'>
        <header class='header'>
            <h1 class='title'>Settings</h1>
            <span class='close'>
                <font-awesome-icon icon='fa-solid fa-multiply' @click='emit("closeSettings")'></font-awesome-icon>
            </span>
        </header>

        <div class='settings'>
            <div class='location-select'>
                <label class='text-label' for='location'>Flight Simulator Location:</label>
                <div class='text-input-group'>
                    <input type='text' name='location' class='text-input'>
                    <button class='text-button'>Browse</button>
                </div>
            </div>


            <div class='mode-switch'>
                <span class='mode-status'>
                    App Mode: Online
                    <div class='status-light'></div>
                </span>

                <!-- switch from https://www.w3schools.com/howto/howto_css_switch.asp -->
                <label class="switch">
                    <input type="checkbox" :checked='modeOnline' @change='emit("toggleMode")'>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .close {
        font-size: 30px;
        position: relative;
        top: 6px;
        right: 10px;
    }

    .close:active, .close:focus, .close:hover {
        color: var(--middle-grey);
        cursor: pointer;
    }

    .header {
        border-bottom: 1px solid var(--icon-grey);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }

    input[type='checkbox']:checked + .slider {
        background-color: var(--green);
    }

    input[type='checkbox']:focus + .slider {
        box-shadow: 0 0 1px var(--green);
    }

    input[type='checkbox']:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    .location-select {
        width: 100%;
    }

    .mode-status {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 17px;
    }

    .mode-switch {
        display: flex;
        margin-top: 30px;
        justify-content: space-between;
        align-items: center;
    }

    .settings {
        margin: 40px 0;
    }

    .settings-container {
        margin: 35px;
        flex-grow: 1;
        height: calc(100% - 35px);
        color: var(--off-white);
    }

    .status-light {
        height: 9px;
        width: 9px;
        background: var(--green);
        border-radius: 50%;
        margin: 0 3px 0 5px;
    }

    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 22px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--middle-grey);
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 3.5px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .text-button {
        background: var(--icon-grey);
        color: var(--dark-grey);
        border-radius: 6px;
        width: 220px;
        margin-left: 10px;
        font-family: var(--font);
        font-weight: 600;
        font-size: 14px;
        box-shadow: none;
        border: none;
    }

    .text-button:active, .text-button:hover {
        cursor: pointer;
        outline: none;
        border: none;
        box-shadow: none;
        background: var(--middle-grey);
    }

    .text-input {
        outline: none;
        border: none;
        background: var(--active-grey);
        color: var(--marble-grey);
        border-radius: 6px;
        padding: 5px 10px;
        width: calc(100% - 230px);
        font-size: 16px;
        font-family: var(--font);
    }

    .text-input-group {
        display: flex;
        margin-top: 5px;
    }

    .text-label {
        font-weight: 600;
        position: relative;
        left: 4px;
    }

    .title {
        margin: 0;
    }
</style>