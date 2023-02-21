import pointInPolygon from 'point-in-polygon';
import taxiwaySegments from '@/js/graph/taxiways';


export const calculatePixelCoords = (newValue) => {
    let { latitude = false, longitude = false } = newValue;
        
    const latLower = 51.10631, latUpper = 51.20330;
    const longLower = -0.28233, longUpper = -0.07946;
    
    // if no position coords or coords out of bounds
    if(!latitude || !longitude || latitude < latLower || latitude > latUpper || longitude < longLower || longitude > longUpper) {
        return {oob: true };
    }
    
    // coord translation to pixels
    // lat is vertical, long horizontal
    const baseLat = 51.150559; // T/J Intersection
    const baseLong = -0.214077; // J4
    const baseYPx = 1512; // T/J Intersection
    const baseXPx = 568; // J4
    const pxPerLat = -880 / 0.012625; // T/J -> St574
    const pxPerLong = 1970 / 0.045032; // J4 -> A2
    let yPx = baseYPx + (latitude - baseLat) * pxPerLat;
    let xPx = baseXPx + (longitude - baseLong) * pxPerLong;
    
    const yLower = 0, yUpper = 3452;
    const xLower = 0, xUpper = 2759;
    
    if(xPx < xLower || xPx > xUpper || yPx < yLower || yPx > yUpper) {
        return { oob: true }
    }

    return { x: xPx, y: yPx };
}


export const getSegment = (x = false, y = false) => {
    const segments = [];

    if(x == false || y == false) {
        console.log("no coords for get segment :(");
        return [];
    }

    for(const [taxiway, boundObjs] of Object.entries(taxiwaySegments)) {
        for(let i = 0; i < boundObjs.length; i++) {
            const boundObj = boundObjs[i];
            if(pointInPolygon([x, y], boundObj.bounds)) {
                segments.push(boundObj.object)
            }
        }
    }

    if(segments.length == 0)
        return false;
    return segments[0];
}


const pythagDistance = (origin, dest) => {
    const xDiff = dest.x - origin.x;
    const yDiff = dest.y - origin.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}


export const trimRoute = (coords, routeArr, drawnRoute) => {
    if(!routeArr.value?.length || !drawnRoute.value?.length) 
        return;

    // find closest point in route from current position
    let minDist = 10**6;
    let minDistIndex;
    let minDistPoint;

    for(let i = 0; i < routeArr.value.length; i++) {
        const point = routeArr.value[i];
        
        if(point.x) { 
            const dist = pythagDistance(coords, {x: point.x, y: point.y});

            if(i === 0 && dist < 8) {
                // current position within 8 pixels of first point, remove this point
                continue;
            } else if(dist < minDist) {
                // new min distance point found
                minDist = dist;
                minDistIndex = i;
                minDistPoint = point;
            }
        }
    }
    
    if(minDistIndex === 0) {
        return;
    }    

    // remove all points before closest point
    let pointsRemoved = 0;

    while(routeArr.value[0] !== minDistPoint && routeArr.value.length) {
        const el = routeArr.value.shift();
        if(typeof el.x !== 'undefined') {
            pointsRemoved++;
        }
    }

    for(let i = 0; i < pointsRemoved; i++) {
        if(drawnRoute.value.length) {
            drawnRoute.value.shift().remove();
        }
    }
};


export const parseRoute = (point, route, currentSegment, allSegments) => {
    const path = traversePoint(point, route, []);

    if(!path)
        return false;

    allSegments.value = path.filter((el) => typeof el.name !== 'undefined');

    if(path[1] == currentSegment) {
        // if initially picked wrong point in current segment, remove it and current segment
        return path.slice(2);
    }
    return path;
}

const traversePoint = (point, route, path) => {
    path.push(point)

    if(route == [])
        return path;

    if(route[1] && route[1][0] == '/') {
        // next point in route is an explicit holding point
        if(point?.holdingPoint?.name == route[1].slice(1))
            return path;
    }

    const foundPaths = [];
        
    for(let segment of point.adjacentTaxiwaySegments) {
        if(route[1] && route[1][0] == '/') {
            // next point in route is a hold short instruction that matches next node
            if(route[1].slice(1) == segment.name)
                return path;
        }

        if(route[0] == segment.name) {
            if(route[1][0] == 'S' && route[1].length > 1) {
                // next point is a stand
                let standName = route[1].slice(1);
                let stand = segment.stands.find((stand) => standName == stand.name);

                if(typeof stand != 'undefined') {
                    path.push(stand);
                    return path;
                }
            }
        }

        if(route.slice(0,2).includes(segment.name)) {
            let newRoute;
            let pairPoint = segment.points.find(p => p != point);
            
            if(route[0] == segment.name) {
                newRoute = route;
            } else {
                newRoute = route.slice(1);
            }

            if(!path.includes(pairPoint)) {
                let pathCopy = path.map((el) => el);
                pathCopy.push(segment);
                let returnedPath = traversePoint(pairPoint, newRoute, pathCopy);

                if(returnedPath != false)
                    foundPaths.push(returnedPath); 
            }
        }
    }

    for(const pairPoint of point.adjoiningPoints) {
        if(route[1] && route[1][0] == '/') {
            // some kind of hold short/holding point instruction next
            if(pairPoint?.holdingPoint?.name == route[1]) {
                // next point in route is a named holding point at pairPoint
                // TODO: test this works
                path.push(pairPoint);   
                return path;
            }

            for(let tw of pairPoint.adjacentTaxiwaySegments) {
                // next point in route is a hold short instruction that matches next segment
                if(route[1].slice(1) == tw.name)
                    return path;
            }
        }

        for(let segment of pairPoint.adjacentTaxiwaySegments) {
            if(route.slice(0,2).includes(segment.name)) {
                if(!path.includes(pairPoint)) {
                    let newRoute;

                    if(route[0] == segment.name) {
                        newRoute = route;
                    } else {
                        newRoute = route.slice(1);
                    }
                    let pathCopy = path.map((el) => el);
                    let returnedPath = traversePoint(pairPoint, newRoute, pathCopy);
                    if(returnedPath != false)
                        foundPaths.push(returnedPath);
                }
            }
        }
    }
     
    if(foundPaths.length == 0) {
        return false;
    } else {
        const pointArr = foundPaths.map((path) => {
            return path.filter((el) => el.x);
        });
        const i = pointArr.reduce((iMin, el, i, arr) => (el.length < arr[iMin].length ? i : iMin), 0);
        return foundPaths[i];
    }
}