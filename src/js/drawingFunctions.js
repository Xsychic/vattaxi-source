import paper from 'paper';
import Graph from '@/js/graph';


const functions = {};



// function to setup canvas and add map images
functions.setupCanvas = (canvas, rasters, layers) => {
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
}


// function to draw graph data structure on map
functions.drawGraph = (graphPaths) => {
    // plot graph
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
        const point = toVisit.pop();
        visited.push(point);
        const segment = point?.taxiwaySegment;

        if(!segment) {
            console.log(`graph traversal error: point instance has no linked TaxiwaySegment`);
            return;
        }

        const pairPoint = segment.points.find((p) => p != point);
        const segmentGradient = (point.y - pairPoint.y) / (point.x - pairPoint.x);

        if(point.holdingPoint) {
            // get hp gradient
            const hpGradient = -1 / segmentGradient;
            
            // set hp path
            const hpPath = new paper.Path();
            hpPath.strokeColor = '#0edde8';
            hpPath.strokeWidth = '3';
            const hpSpan = 12;

            // create hp equation and use to calc point coords
            const intercept = point.y - hpGradient * point.x;
            const y = (x) => hpGradient * x + intercept;
            const firstPoint = new paper.Point(point.x - hpSpan, y(point.x - hpSpan))
            const secondPoint = new paper.Point(point.x + hpSpan, y(point.x + hpSpan))
            hpPath.add(firstPoint);
            hpPath.add(secondPoint);
            graphPaths.push(hpPath)
        }

        const isSeniorPt = isSeniorPoint(point, pairPoint);

        if(isSeniorPt == -1) {
            console.error(`graph traversal error: points have same coords`);
            return;
        }

        if(isSeniorPt) {
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
            taxiPath.strokeWidth = '2';
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

        point.adjoiningPoints.forEach((newPoint) => {

            // draw adjoining links
            let joinPath;
            

            const isSeniorPt = isSeniorPoint(point, newPoint);

            if(isSeniorPt) {
                joinPath = new paper.Path();
                joinPath.strokeColor = 'red';
                joinPath.strokeWidth = '2px';
            } else if(isSeniorPt != -1) {
                joinPath = new paper.Path();
                joinPath.strokeColor = 'blue';
            } else {
                joinPath = new paper.Path.Circle(point, 3);
                joinPath.fillColor = 'red';
            }
            graphPaths.push(joinPath);

            joinPath.add(new paper.Point(point.x, point.y));
            joinPath.add(new paper.Point(newPoint.x, newPoint.y));

            if(!toVisit.includes(newPoint) && !visited.includes(newPoint)) {
                toVisit.push(newPoint);
            }
        });
    }
}




export default functions;