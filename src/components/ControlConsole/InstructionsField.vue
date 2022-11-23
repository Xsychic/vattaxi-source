<script setup>
    import { ref } from 'vue';

    const showTooltip = ref(false);
</script>

<template>
    <div class="instructions-group">
        <div class="label-row">
            <label for='instructions' class='label'>ATC instructions:</label>
            <div class='explain' @mouseover='showTooltip = true' @mouseleave='showTooltip = false'>
                ?
                <div class='tooltip-container' v-show='showTooltip'>
                    <div class='tooltip'>
                        <h5 class='tooltip-header'>Taxi Route</h5>
                        <p class='tooltip-desc'>
                            Enter the taxi route you've received from ATC here using the following syntax:
                        </p>

                        <ul class='tooltip-list'>
                            <li>
                                <em>A</em> - taxiway A
                            </li>
                            <li>
                                <em>/J</em> - hold short of taxiway J
                            </li>
                            <li>
                                <em>/A2</em> - hold short of holding point A2
                            </li>
                            <li>
                                <em>S552</em> - stand 552
                            </li>
                        </ul>

                        <div class='tooltip-triangle'></div>
                    </div>
                </div>
            </div>

        </div>
        <textarea class='instructions' id='instructions' name='instructions' rows='4' placeholder='Enter your taxi route'></textarea>
        <div class='route-status'>
            valid route
            <font-awesome-icon icon='fa-solid fa-check'></font-awesome-icon>
        </div>
    </div>
</template>

<style scoped>
    .explain {
        color: var(--blue);
        font-weight: bold;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        position: relative;
        padding-left: 4px;
    }

    .instructions {
        width: calc(100% - 30px);
        background: var(--active-grey);
        border: none;
        border-radius: 2px;
        resize: none;
        font-size: 16px;
        padding: 15px;
        color: var(--marble-grey);
        font-family: var(--font);
        outline: none;
    }

    .instructions-group {
        width: 100%;
        border-bottom: 1px solid var(--middle-grey);
        padding: 20px 0 22px 0;
    }

    .label {
        font-size: 12px;
        font-weight: bold;
        margin-top: 2px;
    }

    .label-row {
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        align-items: center;
    }

    .route-status {
        font-size: 14px;
        font-weight: bold;
        color: var(--green);
        width: calc(100% - 10px);
        text-align: right;
        padding: 0 5px;
        margin-top: -7px;
    }

    .route-status svg {
        position: relative;
        top: 1px;
        font-size: 16px;
    }

    .tooltip {
        width: 220px;
        background: var(--off-white);
        border-radius: 5px;
        position: relative;
        color: var(--active-grey);
        padding: 10px;
    }

    .tooltip-container {
        position: absolute;
        right: 18px;
        top: -5px;
    }

    .tooltip-desc {
        font-size: 12px;
        margin: 0;
        font-weight: 500;
        line-height: 1.2;
    }

    .tooltip-header {
        margin: 0;
        margin-bottom: 4px;
        font-size: 13px;
    }

    .tooltip-list {
        font-size: 12px;
        font-weight: 500;
        margin: 0;
        margin-top: 5px;
        list-style-type: none;
        padding: 0;
    }

    .tooltip-list li em {
        font-weight: bold;
        font-style: normal;
    }

    .tooltip-triangle {
        height: 0;
        width: 0;
        border-bottom: 8px solid transparent;
        border-top: 8px solid transparent;
        border-left: 8px solid var(--off-white);
        position: absolute;
        left: 100%;
        top: 10px;
    }
</style>