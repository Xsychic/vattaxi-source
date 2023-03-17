import { pythagDistance } from '@/js/map/mapLogic';

export const checkWrongTurn = (newSegment, oldSegment, allSegments, routeArr, pxCoords, displayBanner) => {
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
        // aircraft not within any of the route segments - check within radius of points in current and next segment
        
        let segments = [];
        let followingRoute = false;

        if(oldSegment && allSegments.value.includes(oldSegment))
            segments.push(oldSegment);

        for(const el of routeArr.value) {
            if(el.points && (!oldSegment || el.points !== oldSegment)) {
                segments.push(el);
                break;
            }
        }

        // array used to keep track of which points have had proximity checked
        let points = [];
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

        if(!followingRoute) {
            // user is not following route correctly
            console.log('user has left marked route!');
            displayBanner.value = true;
            routeArr.value = [];
        }
    }
}