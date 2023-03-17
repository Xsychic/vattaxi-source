import pointInPolygon from 'point-in-polygon';
import taxiwaySegments from '@/js/graph/taxiways';

import { pythagDistance } from '@/js/map/mapLogic';


export const getSegment = (x = false, y = false, currentSegment = false, props, routeArr = [], multipleSegments = false) => {
    // function to check which segment the aircraft is in
    const segments = [];

    if(x == false || y == false) {
        console.log("no coords for get segment :(");
        return [];
    }

    for(const [taxiway, boundObjs] of Object.entries(taxiwaySegments)) {
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

    if(routeArr?.value?.length) {
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