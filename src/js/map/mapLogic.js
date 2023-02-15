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
    // console.log(`latitude: ${ latitude }\nlongitude: ${ longitude }\nlatDiff: ${ latitude - baseLat }\nlongDiff: ${ longitude - baseLong }\npxPerLat: ${ pxPerLat }\npxPerLong: ${ pxPerLong }\nlatOffset: ${ (latitude - baseLat) * pxPerLat }\nlongOffset: ${ (longitude - baseLong) * pxPerLong }\nxPx: ${ xPx }\nyPx: ${ yPx }`);
    
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

    return segments;
}
