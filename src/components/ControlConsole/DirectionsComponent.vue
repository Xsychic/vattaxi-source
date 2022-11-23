<script setup>
    const directions = [
        ['fa-arrow-left', 'NEXT LEFT (Q)'],
        ['fa-arrow-right', 'SECOND RIGHT (L)'],
        ['fa-arrow-right', 'TURN RIGHT ONTO STAND 102']
    ]
</script>

<template>
    <div class='directions-container'>
        <div class='header-row'>
            <h3 class='title'>Directions</h3>
            <div class='current-taxiway-strap'>
                You are on: <span class='current-taxiway'>J</span>
            </div>
        </div>

        <div class='directions'>
            <div class='direction' v-for='direction in directions' :key='direction'>
                <font-awesome-icon :icon='`fa-solid ${ direction[0] }`'></font-awesome-icon>
                {{ direction[1] }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .current-taxiway-strap {
        font-weight: bold;
        font-size: 16px;
    }

    .current-taxiway {
        font-size: 22px;
        position: relative;
        top: 1px;
        margin-left: 2px;
    }

    .direction {
        font-weight: 600;
        font-size: 18px;
        padding: 12px 6px 10px 6px;
        border-bottom: 1px solid var(--subtle-grey);
        
    }

    .direction:first-of-type {
        border-top: 1px solid var(--subtle-grey);
    }

    .direction svg {
        position: relative;
        top: 4px;
        margin-right: 12px;
        font-size: 25px;
        color: var(--icon-grey);
    }

    .directions-container {
        width: 100%;
        color: var(--marble-grey);
    }

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 18px;
    }
</style>