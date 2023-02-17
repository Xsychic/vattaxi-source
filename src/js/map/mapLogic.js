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


export const parseRoute = (point, route, currentSegment) => {
    const path = traversePoint(point, route, []);
    console.log('final path')
    console.log(path)
    if(path && path[1] == currentSegment) {
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
        console.log(pointArr)
        const i = pointArr.reduce((iMin, el, i, arr) => (el.length < arr[iMin].length ? i : iMin), 0);
        return foundPaths[i];
    }
}


export const drawRoute = (route) => {
    console.log(route);
}