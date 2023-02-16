<script setup>    
    import InstructionsField from '@/components/ControlConsole/InstructionsField.vue';
    import DirectionsComponent from '@/components/ControlConsole/DirectionsComponent.vue'

    import { defineEmits, defineProps } from 'vue';

    const props = defineProps(['modeOnline', 'routeStringArr', 'routeFound']);
    const emit = defineEmits(['toggleMode', 'updateRouteStringArr']);

    const updateRouteStringArr = (newRoute) => emit('updateRouteStringArr', newRoute);

</script>

<template>
    <div class="console">
        <header class='header'>
            <h2 class='title'>EGKK - LONDON GATWICK</h2>
        </header>

        <InstructionsField 
            :routeStringArr='routeStringArr'
            :routeFound='routeFound'
            @updateRouteStringArr='updateRouteStringArr'
        />
        <DirectionsComponent></DirectionsComponent>

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

    
</template>

<style scoped>
    .console {
        margin: 30px;
        margin-bottom: 0;
        position: relative;
        flex-grow: 1;
        min-width: 320px;
        height: calc(100% - 30px);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--off-white);
        border-bottom: 1px solid var(--middle-grey);
        padding-bottom: 10px;
    }

    input:checked + .slider {
        background-color: var(--green);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--green);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    .mode-status {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 17px;
    }

    .mode-switch {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
    }

    .title {
        margin: 0;
        font-size: 24px;
    }

    .settings {
        font-size: 18px;
        position: relative;
        bottom: 1px;
    }

    .settings:active, .settings:focus, .settings:hover {
        color: var(--middle-grey);
        cursor: pointer;
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
</style>