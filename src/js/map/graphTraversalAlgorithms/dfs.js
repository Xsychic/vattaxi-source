import { pythagDistance } from "../mapLogic";

export const pickShortestPath = (paths) => {
    // function that takes a list of possible graph paths and returns the one with the shortest pixel distance covered

    // remove non-points from paths
    const pointArr = paths.map((path) => {
        if(!path.filter)
            console.log(path)
        return path.filter((el) => el.x);
    });

    // calculate pixel distance of path between points
    const distances = [];

    // calculate pixel distance of each path that has the fewest number of points
    for(const path of pointArr) {
        let distance = 0;
        
        for(let j = 0; j < path.length - 1; j++) {
            const p1 = path[j];
            const p2 = path[j+1];

            distance += pythagDistance(p1, p2);
        }

        distances.push(distance);
    }
    
    // pick path with shortest pixel distance
    const i = distances.reduce((iMin, el, i, arr) => (el < arr[iMin] ? i : iMin), 0);
    return {path: paths[i], i};
}


export const traversePoint = (point, route, p) => {
    // break up route into sub routes that each traverse one taxiway and stop short of the next
    const subRoutes = [];

    for(let i = 0; i < route.length - 1; i++) {
        let terminator = route[i+1];

        // if terminating element in subroute is not a terminator, make it a hold short
        if(terminator[0] !== '/' && !(terminator.length > 1 && (terminator[0] === 'S' || terminator.slice(0,2) === 'MA')))
            terminator = `/${ terminator }`;

        const subRoute = [route[i], terminator];

        if(i > 0) {
            // if not the first route, add the previous taxiway letter as this subroute 
            // will start at the final point on that taxiway
            subRoute.unshift(route[i-1]);
        }

        subRoutes.push(subRoute)
    }

    let startingPoint = point;
    let path = [];

    // turn each subroute into a graph element array
    for(let i = 0; i < subRoutes.length; i++) {
        const subRoute = subRoutes[i];        
        
        let subPath = traversePointHelper(startingPoint, subRoute, []);

        if(!subPath) {
            // subpath cannot be found so route is invalid
            return false;
        }

        if(i !== 0) {
            // if not the first subroute, remove first point as it's already the final point in the previous subroute
            subPath.shift();
        }
        
        // add subpath to path and shift starting point to final point in this subpath
        path = path.concat(subPath);

        startingPoint = subPath[subPath.length - 1];
    }

    return path;
}


export const traversePointHelper = (point, route, path) => {
    path.push(point)

    if(route.length === 0)
        return path;

    if(route[1] && route[1][0] === '/') {
        // next point in route is an explicit holding point
        if(point?.holdingPoint?.name === route[1].slice(1))
            return path;
    }

    const foundPaths = [];
        
    for(let segment of point.adjacentTaxiwaySegments) {
        if(route[0] === segment.name) {
            if(route[1] && route[1].length > 1 && (route[1][0] === 'S' || (route[1][0] === 'M' && route[1][1] === 'A')) ) {
                // next point is a stand or maintenance area
                let standName = route[1];

                if(route[1][0] === 'S')
                    // terminator is stand
                    standName = route[1].slice(1);

                let stand = segment.stands.find((stand) => standName === stand.name);

                if(typeof stand != 'undefined') {
                    path.push(stand);
                    return path;
                }
            }
        }

        if(route[0] === segment.name) {
            // name of segment selected is first element of route
            // different taxiways cannot be joined at a point, 
            // their points must be linked instead so cannot progress
            // route array here
            let newRoute = route;
            let pairPoint = segment.points.find(p => p != point);

            if(!path.includes(pairPoint)) {
                let pathCopy = path.map((el) => el);
                pathCopy.push(segment);
                let returnedPath = traversePointHelper(pairPoint, newRoute, pathCopy);

                if(returnedPath != false)
                    foundPaths.push(returnedPath); 
            }
        }
    }

    for(const pairPoint of point.adjoiningPoints) {
        if(route[1] && route[1][0] === '/') {
            // some kind of hold short/holding point instruction next
            if(pairPoint?.holdingPoint?.name === route[1].slice(1)) {
                // next point in route is a named holding point at pairPoint
                // TODO: test this works
                path.push(pairPoint);   
                return path;
            }

            for(let tw of pairPoint.adjacentTaxiwaySegments) {
                // next point in route is a hold short instruction that matches next segment
                if(route[1].slice(1) === tw.name)
                    return path;
            }
        }
        
        for(let segment of pairPoint.adjacentTaxiwaySegments) {

            if(route.slice(0,2).includes(segment.name)) {
                // route includes name of taxiway linked to adjoining point in first two elements of route array

                if(!path.includes(pairPoint)) {
                    let newRoute;

                    if(route[0] === segment.name) {
                        // adjoining segment part of same taxiway as previous segment
                        newRoute = route;
                    } else {
                        // adjoining taxiway on next taxiway compared to previous segment
                        newRoute = route.slice(1);
                    }

                    let pathCopy = path.map((el) => el);
                    let returnedPath = traversePointHelper(pairPoint, newRoute, pathCopy);
                    if(returnedPath != false)
                        foundPaths.push(returnedPath);
                }
            }
        }

    }


    if(foundPaths.length === 0) {
        return false;
    } else if(foundPaths.length === 1) {
        return foundPaths[0];
    } else {
        // more than one path found, pick the one with the shortest pixel distance between points
        
        const shortestPath = pickShortestPath(foundPaths)
        return shortestPath.path;
    }
}