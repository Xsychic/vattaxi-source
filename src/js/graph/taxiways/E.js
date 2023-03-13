import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 1397, y: 1609.5}),
        lower: new Point({x: 1398.7, y: 1626.4}, {name: 'E1', gradient: -0.2})
    },
    segTwo: {
        upper: new Point({x: 1412.9, y: 1641.2}),
        lower: new Point({x: 1493.4, y: 1669.8})
    },
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'E', 
        [
            {x: 1413.2, y: 1598.8},

            {x: 1423, y: 1628.1},
            {x: 1383.2, y: 1641.9},

            {x: 1378.8, y: 1606.2}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'E',
        [
            {x: 1423, y: 1628.1},

            {x: 1555.8, y: 1674.3},
            {x: 1479.1, y: 1691.4},

            {x: 1383.2, y: 1641.9},
        ],
        []
    ),
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 