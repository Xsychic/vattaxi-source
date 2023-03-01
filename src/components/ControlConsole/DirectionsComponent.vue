<script setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps(['segment', 'routeArr', 'directions']);

    // const directions = [
    //     ['fa-arrow-left', 'NEXT LEFT (Q)'],
    //     ['fa-arrow-right', 'SECOND RIGHT (L)'],
    //     ['fa-arrow-right', 'TURN RIGHT ONTO STAND 102']
    // ]

    const directions = computed(() => {
        let directions = [];
        
        if(!props.routeArr?.length)
            return [];

        for(let i = 0; i < props.directions.length; i++) {
            let el = props.directions[i].el;
            if(props.routeArr.includes(el)) {
                directions.push(props.directions[i]);
            }
        }

        return directions;
    });

    const getIcon = (iconCode) => {
        switch(iconCode) {
            case -1:
                return 'fa-arrow-left';
            case 0: 
                return 'fa-arrow-up';
            case 1:
                return 'fa-arrow-right';
            case 2:
                return 'fa-hand';
        }
    }
</script>

<template>
    <div class='directions-container'>
        <div class='header-row'>
            <h3 class='title'>Directions</h3>
            <div class='current-taxiway-strap' v-if='segment?.name'>
                You are on: <span class='current-taxiway'>{{ segment.name }}</span>
            </div>
        </div>

        <div class='directions'>
            <h5 class='no-directions' v-if='!directions?.length'>Enter ATC instructions for directions...</h5>
            <div class='direction' v-else v-for='direction in directions' :key='direction'>
                <font-awesome-icon :icon='`fa-solid ${ getIcon(direction.dir) }`'></font-awesome-icon>
                {{ direction.text }}
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

    .no-directions {
        font-weight: 500;
        width: 100%;
        display: flex;
        justify-content: center;
        font-style: italic;
    }

    .title {
        font-size: 18px;
    }
</style>