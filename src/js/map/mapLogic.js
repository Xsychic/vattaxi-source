import '@/js/graph/index';
import pointInPolygon from 'point-in-polygon';
import { traversePoint } from './graphTraversalAlgorithms/dfs';
import { traversePointDijk } from './graphTraversalAlgorithms/dijkstra';


export const calculatePixelCoords = (newValue) => {
    let { latitude = false, longitude = false } = newValue;
        
    const latLower = 51.10631, latUpper = 51.20330;
    const longLower = -0.28233, longUpper = -0.07946;

    // if no position coords or coords out of bounds
    if(!latitude || !longitude || latitude < latLower || latitude > latUpper || longitude < longLower || longitude > longUpper) {
        return { oob: true };
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
    
    const yLower = 0, yUpper = 2765;
    const xLower = 0, xUpper = 3455;

    if(xPx < xLower || xPx > xUpper || yPx < yLower || yPx > yUpper) {
        return { oob: true }
    }
    
    return { x: xPx, y: yPx };
}



export const pythagDistance = (origin, dest) => {
    const xDiff = dest.x - origin.x;
    const yDiff = dest.y - origin.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}


export const getBounds = (point, nextEl) => {
    // function to get bounds of a rectangle across current taxiway intersecting first point
    let nextElCoords = {};

    if(nextEl.x) {
        // second el is a point or stand
        nextElCoords = { x: nextEl.x, y: nextEl.y };
    } else if(nextEl.points) {
        // second el is a taxiway segment
        let pairPoint = nextEl.points.filter((pt) => pt !== point);
       
        if(pairPoint.length !== 1) {
            console.error('mapLogic.js getBounds() could not get pairPoint from twysegment');
            return;
        } 

        let pPt = pairPoint[0];
        nextElCoords = { x: pPt.x, y: pPt.y };
    } else if(nextEl.joinPoint) {
        nextElCoords = nextEl.joinPoint;
    }

    let gradient = (nextElCoords.y - point.y) / (nextElCoords.x - point.x);
    let normalGradient = -1 / gradient;

    // change in x = sqrt((desired line length)^2 / (1 + gradient^2))
    let segmentWidth = 45;
    let deltaXBaseline = Math.sqrt((segmentWidth ** 2) / (1 + normalGradient ** 2));
    let xAdjBaseline = Math.round(deltaXBaseline * 10) / 20;
    
    let baseLineConstant = point.y - normalGradient * point.x;
    let baseLineY = (x) => normalGradient * x + baseLineConstant;

    let bounds = [[], [], [], []];

    bounds[0][0] = point.x - xAdjBaseline;
    bounds[0][1] = baseLineY(bounds[0][0]);
    bounds[1][0] = point.x + xAdjBaseline;
    bounds[1][1] = baseLineY(bounds[1][0]);

    let segmentDepth = 14;
    let deltaXSideline = Math.sqrt((segmentDepth ** 2) / (1 + gradient ** 2));
    let xAdjSideline = Math.round(deltaXSideline * 10) / 10;
    
    bounds[2][0] = bounds[1][0] - xAdjSideline;
    bounds[3][0] = bounds[0][0] - xAdjSideline;

    if(gradient !== Infinity) {
        // gradient along taxiway is not infinite
        let sideLineC1 = bounds[0][1] - gradient * bounds[0][0];
        let sideLineC2 = bounds[1][1] - gradient * bounds[1][0];
        let sideLineY = (x, c) => gradient * x + c;
    
        bounds[2][1] = sideLineY(bounds[2][0], sideLineC2);
        bounds[3][1] = sideLineY(bounds[3][0], sideLineC1);
    } else {
        // gradient along taxiway is infinite
        bounds[2][1] = bounds[1][1] + segmentDepth;
        bounds[3][1] = bounds[0][1] + segmentDepth;
    }

    return bounds;
}


export const trimRoute = (coords, routeArr, drawnRoute) => {
    // function to remove parts of the route that have been passed and update the path depiction

    if(!routeArr.value?.length || !drawnRoute.value?.length) 
        return;

    // find closest point in route from current position
    let minDist = 10**6;
    let minDistIndex;
    let minDistPoint;
    let visited = 0;

    for(let i = 0; i < routeArr.value.length; i++) {
        let point = routeArr.value[i];

        // if already checked first three points then break
        if(visited >= 3)
            break;
        
        if(point.x || point.joinPoint) { 
            visited++;
            let x, y;

            if(point.joinPoint) {
                x = point.joinPoint.x;
                y = point.joinPoint.y;
            } else {
                x = point.x;
                y = point.y;
            }

            // check if within 8px radius of first point
            const dist = pythagDistance(coords, {x, y});


            if(i === 0 && dist < 8 && routeArr.value.length > 1) {
                // current position within 8 pixels of first point, do not count as closest point so it will get removed
                continue;
            } else {        
                if(i === 0 && dist <= 30) { // if not within 30, cannot be inside detection zone (diagonal size of bounding box from centre of long edge (intersecting point))
                    // test pip rectangular segment intersecting at first point - only reachable if not within 8pxs

                    if(routeArr.value.length === 1) {
                        // reached end of route
                        let lastEl = routeArr.value[0];

                        if(dist < 20){
                            // within 20 pixels of termination point
                            if(lastEl.joinPoint) {
                                routeArr.value[0] = routeArr.value[0].stopPoint;
                            } else {
                                routeArr.value = [];
                            }
                            drawnRoute.value.shift().remove();
                            return;
                        }
                    }

                    let bounds;
                    
                    // generate bounds array of bounded detection area
                    // intersecting point using another point to calculate gradients
                    if(routeArr.value[1]) {
                        // if no other point in the route, this el must be a point or 
                        // the stop point of a stand. Therefore, bounds would be calculated
                        // with reference to the point and coords, not possible
                        // to be in bounded area (would be perpendicular to aircraft path so max distance 
                        // of detection is  the deptch of the bounded area) and not in the radius of
                        // the point (20px). Therefore this is only possibly true if
                        // there's another point in the route
                        bounds = getBounds(point, routeArr.value[1]);
                    }
                    
                    if(pointInPolygon(bounds && [coords.x, coords.y], bounds)) {
                        // current position within detection bounds, do not count current point as closest point 
                        // so that it will get removed
                        continue;
                    }
                }

                if(dist < minDist) {
                    // new min distance point found
                    minDist = dist;
                    minDistIndex = i;
                    minDistPoint = point;
                }
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


export const parseRoute = (point, route, currentSegment, allSegments, coords) => {
    // function to turn routeStringArray into graph element array

    let start = Date.now()
    let path = traversePoint(point, route, []);
    // let path = traversePointDijk(point, route);
    let end = Date.now()
    console.log(`${ end - start }ms`);

    if(!path)
        return false;

    allSegments.value = path.filter((el) => typeof el.bounds !== 'undefined');

    if(path[1] === currentSegment) {
        // if initially picked wrong point at wrong end of current segment, remove it and current segment
        path = path.slice(2);
    }

    if(path[0]?.x && path[1]?.x) {
        // if first two route elements are points, check if the path doubles back on itself
        // if it does double back then removing the first point will always fix this since it removes the 'spike' in the route
        const pointOne = coords;
        const pointTwo = path[0];
        const pointThree = path[1];

        if(typeof pointOne.x !== 'undefined') {
            // calculate inside angle between vectors joining points one and two, and two and three

            // vectors must point away from point at which they meet
            const vecOne = { x: pointOne.x - pointTwo.x, y: pointOne.y - pointTwo.y };
            const vecTwo = { x: pointThree.x - pointTwo.x, y: pointThree.y - pointTwo.y };

            // cos theta = (a . b) / (|a||b|)
            const vecMag = (vec) => Math.sqrt(vec.x ** 2 + vec.y ** 2);
            const dotProd = (vOne, vTwo) => vOne.x * vTwo.x + vOne.y * vTwo.y;
            const angle = Math.acos(dotProd(vecOne, vecTwo) / (vecMag(vecOne) * vecMag(vecTwo))); // angle in radians

            const degToRad = (deg) => deg / 180 * Math.PI;

            if(angle < degToRad(70)) {
                // initial path doubles back, remove first point
                path = path.slice(1);
            }
        }
    }

    return path;
}





