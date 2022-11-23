<script setup>
    
</script>

<template>
    <div class="instructions-group">
        <div class="label-row">
            <label for='instructions' class='label'>ATC instructions:</label>
            <span class='explain'>?</span>
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
</style>