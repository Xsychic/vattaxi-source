<script setup>
    import { ref, defineProps, defineEmits, watch } from 'vue';

    const props = defineProps(['routeStringArr', 'routeFound', 'segment']);
    const emit = defineEmits(['updateRouteStringArr']);
    
    const showTooltip = ref(false);
    const routeString = ref('');
    const routeValid = ref(false);
    const routeChecked = ref(false);

    const isValidRoute = (route) => {
        /*
            RULES

            - Each element in route is a taxiway, holding point, hold short or stand
            - Route ends in holding point, hold short or stand
            - Route starts on taxiway that user is on

        */
        
        // create regexs
        const singleTaxiways = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
        const singleTwysExp = `[${ singleTaxiways.join('') }]`;
        const doubleTaxiways = ['AN', 'AS', 'BR', 'CR', 'FR', 'GR', 'KA', 'NA', 'QA', 'QB', 'QC', 'RA', '08L/26R', '08R/26L'];
        let doubleTwysExp = '';

        for(let i = 0; i < doubleTaxiways.length; i++) {
            doubleTwysExp += `${ doubleTaxiways[i] }`;
            if((i+1) !== doubleTaxiways.length)
                doubleTwysExp += '|';
        }

        const standExp = `(?:S\\d{1,3}[LREW]?)`;
        const holdingPointExp = String.raw`(?:\/[a-z]{1,2}|\/[abcdeghjmnpqrstuwyz][1-7]|\/08L\/26R|\/08R\/26L)`;
        const maintenanceAreaExp = `(?:MA1|MA2)`;

        // global flag must not be used
        const validElementString = String.raw`^(${ singleTwysExp }{1}|${ doubleTwysExp })$`;
        const validElement = new RegExp(validElementString, 'mi');
        const holdShortExp = `(?:/(?:${ validElementString.slice(2, -2)}))`;


        const validTerminatorString = String.raw`^(${ standExp }|${ holdingPointExp }|${ holdShortExp }|${ maintenanceAreaExp })$`;
        const validTerminator = new RegExp(validTerminatorString, 'mi');

        // route ends in termination point
        if(!validTerminator.test(route[route.length - 1])) {
            return false;
        }

        // rest of route consists of taxiways
        const restOfRoute = route.slice(0,-1);

        for(const el of restOfRoute) {
            if(!validElement.test(el)) {
                return false;
            }
        }

        return true;   
    }

    const parseRoute = () => {
        // function to run regex's on input before generating route string array to trigger graph parsing

        routeChecked.value = true;

        // replace runway designations with full runway description
        let newRoute = routeString.value;
        newRoute = newRoute.replace(/(08L|26R)/i, '08L/26R');
        newRoute = newRoute.replace(/(08R|26L)/i, '08R/26L');

        // split route into array on 1+ whitespace chars
        let route = newRoute.split(/\s+/g).filter((el) => el);
        route = route.map((el) => el.toUpperCase());


        if(!props.segment) {
            // if there's no current segment, the route can't be valid as there's not starting point
            routeValid.value = false;
            return;
        }

        if(route.length < 1) {
            // route needs at least one element (allowing for implicit first taxiway)
            // can't be in validation function for feedback v-else-if
            return;
        }

        const hpRegex = /\/[abcdeghjmnpqrstuwy][1234567]/i
        const terminator = route[route.length - 1];

        if(hpRegex.test(terminator)) {
            // last point is a named holding point - if taxiway of same name not in route, add it (except g1,g2,a2,b1)
            // these exceptions are because these taxiways are on taxiways with different names
            const hpIdentRegex = /(?:\/([cdehjmnpqrstuwy])[1234567])|(?:\/(g)3|\/(fr)|\/(a)1|\/(a)3)/i
            let ident = terminator.match(hpIdentRegex);

            
            if(ident) {

                ident = ident.filter((el) => el ? true : false);

                if(ident[1] && route[route.length - 2] !== ident[1]) {
                    route.splice(route.length - 1, 0, ident[1]);
                }
            }
        }

        if(isValidRoute(route)) {
            routeValid.value = true;
            emit('updateRouteStringArr', route);
        } else {
            // route validation checks failed
            routeValid.value = false;
        }            
    }

    watch(() => props.routeStringArr, (newRouteStringArr) => {
        if(!newRouteStringArr.length && routeValid.value) {
            routeString.value = '';
            routeChecked.value = false;
        }
    });

    watch(routeString, (newValue) => {
        // if input has been emptied and the routeStringArray is not empty, reset all relevant variables
        if(!newValue?.length && props.routeStringArr?.length) {
            routeValid.value = false;
            routeChecked.value = false;
            emit('updateRouteStringArr', []);
        }
    })

    const clear = () => {
        routeString.value = ''; 
        routeChecked.value = false;
        routeValid.value = false;
        emit("updateRouteStringArr", []);
    } 
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
                            Enter the taxi route you've received from ATC here using the following syntax, separated by spaces:
                        </p>

                        <ul class='tooltip-list'>
                            <li>
                                <em>A</em> - taxiway A
                            </li>
                            <li>
                                <em>08L</em> - runway 08L
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
                            <li>
                                <em>MA1</em> - maintenance area 1
                            </li>
                        </ul>

                        <div class='tooltip-triangle'></div>
                    </div>
                </div>
            </div>

        </div>
        <textarea class='instructions' id='instructions' name='instructions' rows='4' placeholder='Enter your taxi route' v-model='routeString' @keypress.enter.prevent='parseRoute'></textarea>
        <div class='control-row'>
            <div class='route-status route-valid' v-if='routeChecked && routeString && routeValid && routeFound'>
                valid route
                <font-awesome-icon icon='fa-solid fa-check'></font-awesome-icon>
            </div>
            <div class='route-status route-invalid' v-else-if='routeChecked && routeString && (!routeValid || !routeFound)'>
                invalid route
                <font-awesome-icon icon='fa-solid fa-times'></font-awesome-icon>
            </div>
            <div class='route-status' v-else></div>

            <div class='buttons'>
                <div class='button button-grey' role='button' @click='clear' v-if='routeString'>Clear</div>
                <div class='button button-green' role='button' @click='parseRoute' v-if='!routeString || routeString && (!routeValid || !routeFound)'>Check Route</div>
                <div class='button button-orange' role='button' @click='parseRoute' v-else>Recheck Route</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .button {
        padding: 2px 8px;
        margin-left: 4px;
        color: var(--white);
        border-radius: 2px;
    }

    .button:hover {
        cursor: pointer;
    }

    .button-green {
        background: var(--green);
    }

    .button-grey {
        background: var(--icon-grey)
    }

    .button-orange {
        background: var(--orange);
    }

    .buttons {
        display: flex;
        min-width: 178px;
        justify-content: flex-end;
    }

    .control-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
    }

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
        padding: 20px 0 14px 0;
        display: flex;
        flex-direction: column;
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
        flex-grow: 1;
        font-size: 14px;
        font-weight: bold;
        height: 22.4px;
        width: calc(100% - 10px);
        text-align: left;
        padding: 0 5px;
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