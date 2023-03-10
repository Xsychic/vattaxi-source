import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2580.8, y: 1307.3}),
        lower: new Point({x: 2583.3, y: 1319.1})
    },
    segTwo: {
        upper: new Point({x: 2597.2, y: 1331}),
        lower: new Point({x: 2615.1, y: 1332.6})
    },
    segThree: {
        upper: new Point({x: 2580.5, y: 1332.1}),
        lower: new Point({x: 2576.9, y: 1350.1})
    },
    segFour: {
        upper: new Point({x: 2576.1, y: 1367.6}, {name: 'A3'}),
        lower: new Point({x: 2583.7, y: 1406.9}, {name: 'A1'})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'A', 
        [
            {x: 2594.8, y: 1289.7},

            {x: 2600.3, y: 1319.7},
            {x: 2594.2, y: 1326.6},
            {x: 2563.5, y: 1333.3},

            {x: 2559.1, y: 1298.3}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'A',
        [
            {x: 2600.3, y: 1319.7},

            {x: 2619.7, y: 1313.7},
            {x: 2618.3, y: 1350.1},
            {x: 2591.8, y: 1347.7},

            {x: 2586.2, y: 1328.7},
            {x: 2594.2, y: 1326.6},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'A',
        [
            {x: 2586.2, y: 1328.7},
            {x: 2591.8, y: 1347.7},

            {x: 2595, y: 1352.2},
            {x: 2561.4, y: 1358.8},

            {x: 2563.5, y: 1333.3},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'A',
        [
            {x: 2595, y: 1352.2},
            {x: 2603.1, y: 1357.4},
            {x: 2606.5, y: 1408.7},
            {x: 2550.8, y: 1418.7},
            {x: 2544.3, y: 1367.3},
            {x: 2561.4, y: 1358.8},
        ],
        []
    ),
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segOne.lower, points.segThree.upper);
joinPoints(points.segThree.lower, points.segFour.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 