import graphPoints from '@/js/graph/graphPoints';
import { pythagDistance } from '../mapLogic';


const reachedTerminator = (point, terminator) => {
    if(terminator[0] === '/' && point?.holdingPoint?.name === terminator.slice(1)) {
        // reached terminating named holding point
        return { finished: true, addElement: false }
    }
    
    if(terminator[0] === '/' && !/\d/.test(terminator)) {
        // check if short of 'hold short taxiway'
        const taxiways = [];
        const terminatorName = terminator.slice(1);

        for(const adjPoint of point.adjoiningPoints)
            for(const taxiSeg of adjPoint.adjacentTaxiwaySegments)
                taxiways.push(taxiSeg.name);

        if(taxiways.includes(terminatorName)) {
            return { finished: true, addElement: false };
        }
    }
    
    if(terminator.length > 1 && (terminator[0] === 'S' || terminator.slice(0,2) === 'MA')) {
        // check if reached point adjacent to taxiway segment containing stand
        let term = terminator;
        if(terminator[0] === 'S')
            term = terminator.slice(1);

        for(const twySeg of point.adjacentTaxiwaySegments) {
            for(const stand of twySeg.stands) {
                if(stand.name === term) {
                    return { finished: true, addElement: stand };
                }
            }
        }
    }

    return { finished: false };
}



// helper function to create id given a point
const getPtId = (pt) => `${pt.x}${pt.y}`;

const getPathArr = (source, target, prev) => {
    // rebuilds path array travelling backwards from target to source
    const pointPath = [];
    let node = target;
    if(typeof prev[getPtId(node)] !== 'undefined' || node === source) {
        while(typeof node !== 'undefined') {
            pointPath.unshift(node);
            node = prev[getPtId(node)];
        }
    }

    if(!pointPath.length)
        return [];

    const path = [ pointPath[0] ];

    // insert taxiways segments
    for(let i = 1; i < pointPath.length; i++) {
        const pointOne = pointPath[i-1];
        const pointTwo = pointPath[i];

        for(const twySeg of pointOne.adjacentTaxiwaySegments) {
            if(twySeg.points.includes(pointTwo)) {
                path.push(twySeg);
                break;
            }
        }
        path.push(pointTwo);
    }
    
    return path;
}


const getCurrentTaxiway = (point, route) => {
    // returns the index of the element in the route array that the current point is part of

    const possibleTaxiways = point.adjacentTaxiwaySegments.map((twySeg) => twySeg.name);

    for(let i = 0; i < route.length; i++) {
        if(possibleTaxiways.includes(route[i]))
            return i;
    }

    return -1;
}


export const traversePointDijk = (source, route) => {
    // implement dijkstras shortest path algorithm

    const dist = {};
    const prev = {};
    const queue = {};

    // helper functions: get id of point, get pythagorean distance between points

    // populate initial variables
    for(const point of graphPoints) {
        const id = getPtId(point);
        dist[id] = Infinity;
        prev[id] = undefined;
        queue[id] = point;
    }

    // set distance of starting point to 0
    dist[getPtId(source)] = 0;
    let finished = false;
    const terminator = route[route.length - 1];
    

    while(Object.keys(queue).length > 0 && !finished) {
        // choose point from queue with smallest distance from source
        let minValue = Infinity;
        let minKey;

        for(const [key, value] of Object.entries(dist)) {

            if(key in queue && value < minValue) {
                minKey = key;
                minValue = value;
            }
        }

        if(!minKey) {
            console.log('hmm, dijkstra queue id undefined')
            return false;
        }

        const point = queue[minKey];
        delete queue[minKey];

        
        // check if reached end point
        const { finished, addElement = false } = reachedTerminator(point, terminator);

        if(finished) {
            // get path array if finished
            const path = getPathArr(source, point, prev);
            if(addElement)
                path.push(addElement);
            return path;
        }

        const neighbours = [];
        const currentTaxiwayIndex = getCurrentTaxiway(point, route);

        if(currentTaxiwayIndex === -1) {
            // run out of valid paths to check
            return false;
        }

        let validTaxiways = route.map(el => el);
        validTaxiways.pop();
        validTaxiways = validTaxiways.slice(currentTaxiwayIndex, currentTaxiwayIndex + 2);


        // get unvisited TaxiwaySegment linked point neighbours
        for(const twySeg of point.adjacentTaxiwaySegments) {
            // check if segment is a valid taxiway before adding pair point
            if(!validTaxiways.includes(twySeg.name)) {
                continue;
            }

            const pairPoint = twySeg.points.find((pt) => pt !== point);
            if(getPtId(pairPoint) in queue)
                neighbours.push(pairPoint);
        }

        // get unvisited adjoiningPoint neighbours
        for(const pairPoint of point.adjoiningPoints) {
            let containsValidTwySeg = false;
            for(const twySeg of pairPoint.adjacentTaxiwaySegments) {
                if(validTaxiways.includes(twySeg.name))
                    containsValidTwySeg = true;
            }

            if(!containsValidTwySeg)
                continue;

            if(getPtId(pairPoint) in queue)
                neighbours.push(pairPoint);
        }

        // for each neighbour, update their distance from the source if this is a shorter route
        for(const pairPoint of neighbours) {
            const pId = getPtId(point), ppId = getPtId(pairPoint);
            const newDist = pythagDistance(point, pairPoint) + dist[pId];
            if(newDist < dist[ppId]) {
                dist[ppId] = newDist;
                prev[ppId] = point;
            }
        }
    }

    return false;
}