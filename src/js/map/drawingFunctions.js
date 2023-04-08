import paper from 'paper';
import Graph from '@/js/graph';



// function to setup canvas and add map images
export const setupCanvas = (canvas, rasters, layers) => {
    paper.setup(canvas);

    // remove styles preventing canvas dragging
    canvas.style.removeProperty('user-select');
    canvas.style.removeProperty('-webkit-user-drag');
    
    // add map images to canvas
    rasters.base = new paper.Raster('chart-base-layer');
    rasters.rwyMarkings = new paper.Raster('chart-rwy-markings-layer');
    rasters.taxiMarkings = new paper.Raster('chart-taxi-markings-layer');
    rasters.hpMarkings = new paper.Raster('chart-hp-markings-layer');
    rasters.standMarkings = new paper.Raster('chart-stand-markings-layer');
    rasters.taxiLabels = new paper.Raster('chart-taxi-labels-layer');
    rasters.hpLabels = new paper.Raster('chart-hp-labels-layer');
    rasters.standLabels = new paper.Raster('chart-stand-labels-layer');
    rasters.buildingLabels = new paper.Raster('chart-building-labels-layer'); 


    // centre images and add each to a new layer
    Object.entries(rasters).forEach(([rasterName, raster]) => {
        raster.position = paper.view.center;
        layers[rasterName] = new paper.Layer(raster); 
    });
    layers['graphLayer'] = new paper.Layer();
    layers['pathLayer'] = new paper.Layer();
    layers['aircraftLayer'] = new paper.Layer();
}


export const plotPosition = ({ x, y }, plot, layers, route, drawnRoute) => {

    if(!layers?.pathLayer || !layers?.aircraftLayer) {
        console.error('missing paper.js map layers');
        return;
    }

    layers.aircraftLayer.activate();

    let point = new paper.Point(x, y);

    plot.value = new paper.Path.Circle(point, 6);
    plot.value.fillColor = 'red';
    plot.value.strokeColor = 'black';
    plot.value.strokeWidth = '1';
    
    layers.pathLayer.activate();
    
    redrawFirstSegment({x, y}, route, drawnRoute);
}


export const clearPaths = (paths) => {
    while(paths.length > 0) {
        paths.pop().remove();
    }
}


export const redrawFirstSegment = (coords, route, drawnRoute) => {
    if(route.length && drawnRoute.value.length) {
        // redraw first section of route
        let newPath = new paper.Path();
        newPath.strokeColor = '#3498eb';
        newPath.strokeWidth = '2';

        let x, y;
        if(route[0].x) {
            x = route[0].x;
            y = route[0].y;
        } else if(route[0].joinPoint) {
            x = route[0].joinPoint.x;
            y = route[0].joinPoint.y;
        }

        newPath.add(new paper.Point(coords.x, coords.y));
        newPath.add(new paper.Point(x, y));

        if(typeof newPath === 'undefined')
            return;


        drawnRoute.value[0].remove();
        drawnRoute.value[0] = newPath; 
    }
}


const drawStopBar = (point, colour) => {
    // set hp path
    const hpPath = new paper.Path();
    hpPath.strokeColor = colour;//'#0015ff';
    hpPath.strokeWidth = '7';
    const hpSpan = 14;

    let hpGradient; 

    // create hp equation and use to calc point coords
    if(typeof point?.holdingPoint?.gradient === 'undefined') {
        // no gradient defined, use the gradient of the segment this point is joined to and calculate normal for hp gradient
        const pairPoint = point.adjacentTaxiwaySegments[0].points.find((p) => p != point);
        const segmentGradient = (point.y - pairPoint.y) / (point.x - pairPoint.x);      
        hpGradient = -1 / segmentGradient;
    } else {
        hpGradient = point.holdingPoint.gradient;
    }
    
    const intercept = point.y - hpGradient * point.x;
    const y = (x) => hpGradient * x + intercept;
    const requiredDeltaX = (len, gradient) => Math.sqrt(len ** 2 / (1 + gradient ** 2));
    const deltaX = requiredDeltaX(hpSpan, hpGradient);
    const firstPoint = new paper.Point(point.x - deltaX, y(point.x - deltaX));
    const secondPoint = new paper.Point(point.x + deltaX, y(point.x + deltaX));
    hpPath.add(firstPoint);
    hpPath.add(secondPoint);
    
    return hpPath
}


export const drawRoute = (route, pxCoords) => {
    const points = [pxCoords];

    route.filter((obj) => !obj?.points).map((obj) => {
        if(obj.x) {
            points.push({ x: obj.x, y: obj.y});
        } else if(obj.joinPoint) {
            points.push(obj.joinPoint);
            points.push({...obj.stopPoint, stand: true});
        }
    });

    const drawnPaths = [];

    for(let i = 0; i < points.length - 1; i++) {
        let path = new paper.Path();
        path.strokeColor = '#3498eb';
        path.strokeWidth = '2';
        drawnPaths.push(path);
        
        const pt1 = points[i];
        const pt2 = points[i+1];

        path.add(new paper.Point(pt1.x, pt1.y));
        path.add(new paper.Point(pt2.x, pt2.y));
    }

    if(!points[points.length - 1]?.stand && typeof route[route.length - 1].x !== 'undefined') {
        drawnPaths.push(drawStopBar(route[route.length - 1], 'red'));
    }

    return drawnPaths;
};



// function to draw graph data structure on map
export const drawGraph = (graphPaths, layers) => {
    // plot graph

    if(!layers?.graphLayer || !layers?.pathLayer) {
        console.error('incomplete layers object passed to graph drawing function');
        return;
    }

    layers.graphLayer.activate();

    const visited = [];
    const toVisit = [Graph];

    const isSeniorPoint = (currentPoint, pairPoint) => {
        if(currentPoint.x !== pairPoint.x) {
            if(currentPoint.x > pairPoint.x)
                return true;
            return false;
        }

        if(currentPoint.y !== pairPoint.y){
            if(currentPoint.y > pairPoint.y)
                return true;
            return false;
        }

        return -1;
    }

    while(toVisit.length > 0) {
        const point = toVisit.shift();
        visited.push(point);

        if(point.holdingPoint) {
            graphPaths.push(drawStopBar(point, '#0015ff'));
        }
        
        // draw features for adjacent segments if senior point
        point.adjacentTaxiwaySegments.forEach((segment) => {
            const pairPoint = segment.points.find((p) => p != point);
            const isSeniorPt = isSeniorPoint(point, pairPoint);


            if(isSeniorPt == -1) {
                console.error(`graph traversal error: points have same coords`);
                return;
            } else if(isSeniorPt) {
                // draw taxiwaySegment bounding box
                const boundingPath = new paper.Path();
                graphPaths.push(boundingPath);
                boundingPath.strokeColor = 'orange';
    
                segment.bounds.forEach((bound) => {
                    let p = new paper.Point(bound.x, bound.y);
                    boundingPath.add(p);
                });
    
                boundingPath.closed = true;
                
    
                // draw taxiwaySegment taxi line
                const taxiPath = new paper.Path();
                graphPaths.push(taxiPath);
                taxiPath.strokeWidth = '1';
                taxiPath.strokeColor = '#0ee87b';
    
                taxiPath.add(new paper.Point(point.x, point.y));
                taxiPath.add(new paper.Point(pairPoint.x, pairPoint.y));
                
                
                // draw stands
                segment.stands.forEach((stand) => {
                    const standPath = new paper.Path();
                    graphPaths.push(standPath);
                    standPath.strokeColor = '#a600ff';
                    standPath.strokeWidth = '1';
                    
                    const { joinPoint: jp, stopPoint: sp } = stand;
    
                    standPath.add(new paper.Point(jp.x, jp.y));
                    standPath.add(new paper.Point(sp.x, sp.y));
                });
            }
    
            if(!toVisit.includes(pairPoint) && !visited.includes(pairPoint))
                toVisit.push(pairPoint);
        });

        // draw adjoining links and add them to toVisit list
        point.adjoiningPoints.forEach((newPoint) => {

            // draw adjoining links
            let joinPath; 

            joinPath = new paper.Path();
            joinPath.strokeColor = 'blue';
            graphPaths.push(joinPath);

            joinPath.add(new paper.Point(point.x, point.y));
            joinPath.add(new paper.Point(newPoint.x, newPoint.y));

            if(!toVisit.includes(newPoint) && !visited.includes(newPoint)) {
                toVisit.push(newPoint);
            }
        });
    }

    layers.pathLayer.activate();
}