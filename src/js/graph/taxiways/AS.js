import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 2403.4, y: 1425.9}),
        right: new Point({x: 2464.5, y: 1414})
    },
    segTwo: {
        left: new Point({x: 2545.7, y: 1397.3}, {name: 'A2', gradient: 6.5}),
        right: new Point({x: 2562, y: 1398.6})
    },
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'AS', 
        [
            {x: 2390.2, y: 1410.8},
            
            {x: 2470.8, y: 1391.7},
            {x: 2477.7, y: 1425.4},

            {x: 2405.1, y: 1435.3}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'AS',
        [
            {x: 2470.8, y: 1391.7},

            {x: 2546.7, y: 1376.8},
            {x: 2567.8, y: 1380.8},
            {x: 2561.8, y: 1417.5},
            {x: 2534.3, y: 1414.2},

            {x: 2477.7, y: 1425.4},
        ],
        []
    ),
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 