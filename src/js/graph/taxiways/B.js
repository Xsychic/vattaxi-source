import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2430.2, y: 1442.7}),
        lower: new Point({x: 2435.2, y: 1472.4})
    },
    segTwo: {
        upper: new Point({x: 2411.7, y: 1448.9}),
        lower: new Point({x: 2423.6, y: 1454.2})
    },
    segThree: {
        upper: new Point({x: 2406.1, y: 1458.1}),
        lower: new Point({x: 2402.4, y: 1466.8})
    }
}

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'B', 
        [
            {x: 2449, y: 1429.8},

            {x: 2453.7, y: 1481},
            {x: 2422.9, y: 1487.6},

            {x: 2417.3, y: 1436.3},
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'B',
        [
            {x: 2417.9, y: 1436.5},

            {x: 2429.9, y: 1443.8},
            {x: 2423.6, y: 1465.8},

            {x: 2375.8, y: 1445.7},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'BR',
        [
            {x: 2417.9, y: 1436.5},

            {x: 2413.5, y: 1474},
            {x: 2383, y: 1497.3},
            {x: 2335.4, y: 1506.9},

            {x: 2375.8, y: 1445.7},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.lower);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 