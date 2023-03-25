import pointInPolygon from 'point-in-polygon';
import taxiwaySegments from '@/js/graph/taxiways';

import { ref } from 'vue'; 
import { parseRoute, pickShortestPath, pythagDistance } from '@/js/map/mapLogic';


export const getSegment = (x = false, y = false, currentSegment = false, props, multipleSegments = false) => {
    // function to check which segment the aircraft is in
    const segments = [];

    if(x === false || y === false) {
        console.log("no coords for get segment :(");
        return false;
    }

    for(const boundObjs of Object.values(taxiwaySegments)) {
        for(let i = 0; i < boundObjs.length; i++) {
            const boundObj = boundObjs[i];
            if(pointInPolygon([x, y], boundObj.bounds)) {
                segments.push(boundObj.object);
            }
        }
    }

    // return different value depending on number of matching segments found and if any of them match the current segment
    if(segments.length == 0)
        return false;
    if(segments.length == 1)
        return segments[0];
    if(currentSegment && segments.includes(currentSegment))
        // aircraft still in old segment
        return currentSegment;


    // still more than one possible segment

    if(multipleSegments) {
        // return all options for segment detection tool
        return segments;
    }

    // check if any segments have same name as current segment
    if(currentSegment) {
        for(const seg of segments) {
            if(seg.name === currentSegment.name) {
                return seg;
            }
        }
    }

    if(props?.routeStringArr?.length) {
        // existing route, check if any of the returned segments are in the route
        for(const seg of segments) {

            if(props.routeStringArr.includes(seg.name)) {
                // this segment has a name which is in the route string array - return it
                return seg;
            }
        }
    }

    // still not able to make decision over which segment to return - return the first
    return segments[0];
}


export const checkSegment = (currentSegment, pxCoords, routeStringArr, emit) => {
    // function to check current segment is the best one of the possible options for the new route
    
    if(!currentSegment || !pxCoords?.x || !routeStringArr?.length || !emit) {
        console.log('can\'t check segment with missing arguments');
        return;
    }

    // get all possible segments for current position
    let segments = getSegment(pxCoords.x, pxCoords.y, currentSegment, {routeStringArr}, [], true);
    let matchingSegments = [];
    let addImplicitTaxiway = false;
    
    if(!Array.isArray(segments)) {
        segments = [ segments ];
    }

    // see how many if any segments have the same name as first element of route string
    for(const segment of segments) {
        if(segment.name === routeStringArr[0])
            matchingSegments.push(segment);
    }

    if(matchingSegments.length === 0) {
        // no segments have name matching first segment, must add it to routeStringArr before testing each segment
        addImplicitTaxiway = true;
    } else if(matchingSegments.length === 1) {
        // only one possible segment has same name as current segment
        return { segment: matchingSegments[0], implicitTaxiway: false, pathFound: true };
    } else {
        // multiple segments have name matching current segment name
        segments = matchingSegments;
    }

    // will be checking pixel distance over along the first part of the route from the current segment
    const route = routeStringArr.slice(0,3);
    const possiblePaths = [];
    const possiblePathSegments = [];
    const lastRouteEl = route[route.length - 1];
    
    if(lastRouteEl.length < 2 || !(lastRouteEl[0] === 'S' || lastRouteEl[0] === '/')) {
        // last route element is a taxiway, make it into a hold short
        route[route.length - 1] = `/${lastRouteEl}`;
    }

    for(const segment of segments) {
        // parse route
        let routeArr = route.map((el) => el);

        if(addImplicitTaxiway) {
            // if implicit taxiway required, then add it
            routeArr.splice(0, 0, segment.name);
        }

        const allSegments = ref();
        const path = parseRoute(segment.points[0], routeArr, segment, allSegments, pxCoords);

        if(path !== false) {
            possiblePaths.push(path);
            possiblePathSegments.push(segment)
        }
    }

    let selectedSegment;

    if(possiblePaths.length === 0) {
        // no paths found, route invalid
        return { pathFound: false };
    } else if(possiblePaths.length === 1) {
        // only one segment has a possible path, return that segment
        selectedSegment = possiblePathSegments[0];
    } else {
        // multiple segments have a possible path, pick the one with the shortest path distance
        const { i } = pickShortestPath(possiblePaths);
        selectedSegment = possiblePathSegments[i];
    }

    return { segment: selectedSegment, implicitTaxiway: addImplicitTaxiway, pathFound: true };
}


export const checkWrongTurn = (newSegment, oldSegment, allSegments, routeArr, pxCoords, props, displayBanner) => {
    // function to check if wrong turn has been made

    if(!routeArr.value?.length || !routeArr.value?.length) {
        // no active route - skip wrong turn detection
        return;
        }

        if(typeof routeArr.value?.length !== 'undefined' && routeArr.value.length <= 2 && !newSegment) {
            // near end of route - if not in segment, could be turning onto stand so don't trigger
            return;
        }

    if(!allSegments.value.includes(newSegment)) {
        // aircraft not within any of the route segments - check if new segment contains terminating stand
        
        let followingRoute = false;

        // check if terminator is a stand
        const terminator = props.routeStringArr[props.routeStringArr.length - 1];

        if(routeArr.value.length <= 3 && terminator && terminator[0] === 'S' && terminator.length > 1) {
            // if not much of route left and terminator is a stand, check if any of potential new segments contains stand
            const standName = terminator.slice(1);

            if(newSegment.stands) {
                const stand = newSegment.stands.findIndex((stand) => stand.name === standName);

                if(stand !== -1) {
                    // terminating stand found in segment
                    followingRoute = true;
                }
            }
        }

        if(followingRoute === false) {
            // not in segment containing route terminator - check within radius of points in current and next segment (next segment taken from routeArr - is not the new segment)
            let segments = [];

            if(oldSegment && allSegments.value.includes(oldSegment))
                segments.push(oldSegment);

            for(const el of routeArr.value) {
                if(el.points && (!oldSegment || el.points !== oldSegment)) {
                    segments.push(el);
                    break;
                }
            }

            // array used to keep track of which points have had proximity checked
            var points = [];
            const proximityThreshold = 28;

            for(const segment of segments) {
                for(const point of segment.points) {
                    if(!points.includes(point)) {
                        // if point (from either old segment or next in )
                        if(pythagDistance(pxCoords.value, point) <= proximityThreshold) {
                            followingRoute = true;
                            break;
                        }
                    }
                }
                if(followingRoute)
                    break;
            }
        }


        if(!followingRoute) {
            // user is not following route correctly
            console.log('user has left marked route!');
            displayBanner.value = true;
            routeArr.value = [];
        }
    }
}