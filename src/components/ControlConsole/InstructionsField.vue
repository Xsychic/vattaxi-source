<script setup>
    import { ref, defineProps, defineEmits, watch } from 'vue';

    const props = defineProps(['routeStringArr', 'routeFound', 'segment']);
    const emit = defineEmits(['updateRouteStringArr']);
    
    const showTooltip = ref(false);
    const routeString = ref('');
    const routeValid = ref(0);

    const isValidRoute = (route) => {
        /*
            RULES

            - Each element in route is a taxiway, holding point, hold short or stand
            - Route ends in holding point, hold short or stand
            - Route starts on taxiway that user is on

        */
        
        // create regexs
        const singleTaxiways = ['Q', 'L'];
        const singleTwysExp = `[${ singleTaxiways.join('') }]`;
        const doubleTaxiways = ['QA', 'QB', 'QC'];
        let doubleTwysExp = '';

        for(let i = 0; i < doubleTaxiways.length; i++) {
            doubleTwysExp += `(?:${ doubleTaxiways[i] })`;
            if((i+1) !== doubleTaxiways.length)
                doubleTwysExp += '|';
        }

        const standExp = `(?:S\\d{1,3}[LR]?)`;
        const holdingPointExp = String.raw`(?:\/[a-z]{1,2}|\/[abcdeghjmnpqrstuwyz][1-7])`;

        // global flag must not be used
        const validElementString = String.raw`^(${ singleTwysExp }{1}|${ doubleTwysExp })$`;
        const validElement = new RegExp(validElementString, 'mi');

        const validTerminatorString = String.raw`^(${ standExp }|${ holdingPointExp })$`;
        const validTerminator = new RegExp(validTerminatorString, 'mi');

        // route ends in termination point
        if(!validTerminator.test(route[route.length - 1])) {
            return false;
        }

        // rest of route consists of taxiways
        const restOfRoute = route.splice(0,-1);
        for(let i = 0; i < restOfRoute.length; i++) {
            if(!validElement.test(restOfRoute[i])) {
                return false;
            }
        }

        return true;   
    }

    watch(routeString, (newRoute, oldRoute) => {
        // split route into array on 1+ whitespace chars
        let route = newRoute.split(/\s+/g).filter((el) => el);
        route = route.map((el) => el.toUpperCase());

        if(!props.segment) {
            routeValid.value = 0;
            return;
        }

        if(route[0] !== props.segment.name) {
            route.unshift(props.segment.name);
        }

        if(route.length < 2) {
            // route at least has two elements
            // can't be in validation function for feedback v-else-if
            if(props.routeStringArr.length != 0) {
                routeValid.value = 0;
                emit('updateRouteStringArr', []);
            }
            return;
        }

        if(isValidRoute(route)) {
            routeValid.value = 1;
            emit('updateRouteStringArr', route);
        } else {
            routeValid.value = -1;
        }
    });

    watch(() => props.routeStringArr, (newRouteStringArr) => {
        if(!newRouteStringArr.length)
            routeString.value = '';
    })
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
        <textarea class='instructions' id='instructions' name='instructions' rows='4' placeholder='Enter your taxi route' v-model='routeString'></textarea>
        <div class='route-status route-valid' v-if='routeString && routeValid == 1 && routeFound'>
            valid route
            <font-awesome-icon icon='fa-solid fa-check'></font-awesome-icon>
        </div>
        <div class='route-status route-invalid' v-else-if='routeValid == -1 && !routeString || routeString && routeValid == 1 && !routeFound'>
            invalid route
            <font-awesome-icon icon='fa-solid fa-times'></font-awesome-icon>
        </div>
        <div class='route-status' v-else></div>
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

    .route-invalid {
        color: var(--red);
    }

    .route-status {
        font-size: 14px;
        font-weight: bold;
        height: 22.4px;
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

    .route-valid {
        color: var(--green);
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