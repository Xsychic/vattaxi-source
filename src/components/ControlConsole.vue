<script setup>    
    import InstructionsField from '@/components/ControlConsole/InstructionsField.vue';
    import Directions from '@/components/ControlConsole/Directions.vue'

    import { defineEmits, defineProps } from 'vue';

    const props = defineProps(['routeStringArr', 'routeFound', 'segment', 'routeArr', 'directions', 'turnDetection']);
    const emit = defineEmits(['updateRouteStringArr', 'toggleTurnDetection']);

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
            :segment='segment'
            @updateRouteStringArr='updateRouteStringArr'
        />
        <Directions
            :segment='segment'
            :routeArr='routeArr'
            :directions='directions'
        />

        <div class='turn-detection-switch'>
            <span class='turn-detection-status'>
                Wrong Turn Notifications (Experimental)
            </span>

            <!-- switch from https://www.w3schools.com/howto/howto_css_switch.asp -->
            <label class="switch">
                <input type="checkbox" :checked='turnDetection' @change='emit("toggleTurnDetection")'>
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
        display: flex;
        flex-direction: column;
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

    .turn-detection-status {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
    }

    .turn-detection-switch {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
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

    .title {
        margin: 0;
        font-size: 24px;
    }
</style>