import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2618.9, y: 1253.7}),
        lower: new Point({x: 2621.7, y: 1267.2})
    },
    segTwo: {
        upper: new Point({x: 2627.3, y: 1293}),
        lower: new Point({x: 2630.8, y: 1305.1})
    },
    segThree: {
        upper: new Point({x: 2637.5, y: 1321.9}),
        lower: new Point({x: 2643.8, y: 1346.7})
    },
    segFour: {
        upper: new Point({x: 2649.4, y: 1373.9}, {name: 'M3'}),
        lower: new Point({x: 2655, y: 1399.7}, {name: 'M1'})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'M', 
        [
            {x: 2634, y: 1244.2},

            {x: 2640.3, y: 1278.6},
            {x: 2610.6, y: 1292.1},

            {x: 2603.8, y: 1242.1}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'M',
        [
            {x: 2640.3, y: 1278.6},

            {x: 2646.1, y: 1304.2},
            {x: 2619.6, y: 1319.1},

            {x: 2610.6, y: 1292.1},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'M',
        [
            {x: 2646.1, y: 1304.2},

            {x: 2668.2, y: 1362.4},
            {x: 2630.5, y: 1370.4},

            {x: 2619.6, y: 1319.1},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'M',
        [
            {x: 2668.2, y: 1362.4},

            {x: 2677.7, y: 1395.2},
            {x: 2634.5, y: 1404.2},

            {x: 2630.5, y: 1370.4},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);
joinPoints(points.segThree.lower, points.segFour.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 