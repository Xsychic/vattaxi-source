
const turnDirection = (pointOne, pointTwo, pointThree) => {
    // function that returns direction given three points (from, pivot, to)
    // -1 = left, 0 = straight, 1 = right

    if(!pointOne?.x) {
        console.error('point one, directionLogic.js turnDirection()');
        console.log(pointOne);
        return;
    }
    if(!pointTwo?.x) {
        console.error('point two, directionLogic.js turnDirection()');
        console.log(pointTwo);
        return;
    }
    if(!pointThree?.x) {
        console.error('point three, directionLogic.js turnDirection()');
        console.log(pointThree);
        return;
    }

    // create vectors from points
    const vecOne = [
        pointTwo.x - pointOne.x, 
        pointTwo.y - pointOne.y
    ];

    const vecTwo = [
        pointThree.x - pointTwo.x,
        pointThree.y - pointTwo.y
    ];
    
    // helper functions
    const scalarProduct = (vecA, vecB) => vecA[0] * vecB[0] + vecA[1] * vecB[1];
    const magnitude = (vec) => Math.sqrt((vec[0] ** 2 + vec[1] ** 2));


    // scalar product of reversed vector one and vector two to calculate angle between them
    const scalarOneTwo = scalarProduct([-vecOne[0], -vecOne[1]], vecTwo);
    const vectorAngle = Math.acos(scalarOneTwo / (magnitude(vecOne) * magnitude(vecTwo)));

    // check if second vector in same direction as first (within 10 degrees either way)
    const straightToleranceDegrees = 10;
    const toleranceRad = straightToleranceDegrees / 180 * Math.PI;

    if(vectorAngle >= Math.PI - toleranceRad && vectorAngle <= Math.PI + toleranceRad ) {
        return 0;
    }

    // rotate vecOne clockwise 90 deg to see if vecTwo goes to the left or right of vecOne
    const rotatedVecOne = [vecOne[1], -vecOne[0]];
    const scalarRotOneTwo = scalarProduct(rotatedVecOne, vecTwo);

    if(scalarRotOneTwo < 0)
        return 1;
    return -1;
}


const createDirectionObj = (ptOne, ptTwo, ptThree, name, el) => {
    switch(turnDirection(ptOne, ptTwo, ptThree)) {
        case 0:
            return { dir: 0, text: `Continue straight ahead onto ${ name }`, el };
        case -1:
            return { dir: -1, text: `Turn left onto ${ name }`, el };
        case 1:
            return { dir: 1, text: `Turn right onto ${ name }`, el };
    }
}



export const generateDirections = (routeArr, routeStringArr) => {
    // point, taxiwaySegment, stand
    let currentTwy = false;
    let directions = [];

    for(let i = 0; i < routeArr.value.length; i++) {
        let el = routeArr.value[i];

        if(el.name) {
            // el is twySegment or stand
            if(!currentTwy) {
                // first twySegment
                currentTwy = { name: el.name, i };
            } else {
                if(currentTwy.name === el.name) {
                    // update current taxiway and move on if same as previous taxiway
                    currentTwy = { name: el.name, i };
                    continue;
                }

                // generate direction 

                let ptOne = routeArr.value[currentTwy.i + 1];
                let ptTwo = routeArr.value[i - 1];
                let ptThree = routeArr.value[i + 1];

                // believe this is unnecessary
                // if(ptOne === ptTwo) {
                //     ptOne = routeArr.value[currentTwy.i - 1];
                // }

                if(typeof ptThree === 'undefined') {
                    // el is stand

                    // add instruction onto stand taxiway if not already done
                    let secondToLastTwy = routeStringArr[routeStringArr.length - 2];
                    if(secondToLastTwy !== currentTwy.name) {
                        let ptOne = routeArr.value[currentTwy.i - 1];
                        let ptTwo = routeArr.value[currentTwy.i + 1];
                        let ptThree = el.joinPoint;
                        directions.push(createDirectionObj(ptOne, ptTwo, ptThree, secondToLastTwy, el));
                    }

                    // change points to the ones contained in the stand
                    ptTwo = el.joinPoint;
                    ptThree = el.stopPoint;
                    // change element name to include 'stand'
                    var nameOverride = `Stand ${ el.name }`;
                }

                currentTwy = { name: el.name, i };

                if(nameOverride)
                    currentTwy.name = nameOverride;

                directions.push(createDirectionObj(ptOne, ptTwo, ptThree, currentTwy.name, el));
            }
        }

        let lastStringEl = routeStringArr[routeStringArr.length - 1];
        if(i === routeArr.value.length - 1 && el.x && lastStringEl[0] === '/') {
            // last element is a point - a hold short or holding point
            directions.push({dir: 2, text: `Hold short of ${ lastStringEl.slice(1) }`, el: routeArr.value[routeArr.value.length - 1]});
        }
    }

    return directions;
}