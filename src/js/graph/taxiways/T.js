import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 1481.9, y: 1296.1}),
        lower: new Point({x: 1460.2, y: 1301.4})
    },
    segTwo: {
        upper: new Point({x: 1453.3, y: 1316}),
        lower: new Point({x: 1484.8, y: 1462.2}, {name: 'T1'})
    },
    segThree: {
        lower: new Point({x: 1491.5, y: 1493.4})
    },
    segFour: {
        upper: new Point({x: 1499.5, y: 1528.3}),
        lower: new Point({x: 1503, y: 1548.3})
    }
}

// stands for taxiway segments
const segOneStands = {
    'MA2': new Stand({x: 1481.9, y: 1296.1}, {x: 1516.1, y: 1288.9}, 'MA2'),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'T', 
        [
            {x: 1561.3, y: 1325.2},
            {x: 1492.6, y: 1342.8},

            {x: 1472.9, y: 1316.8},
            {x: 1441.5, y: 1295.5},


            {x: 1437.3, y: 1269.7},
            {x: 1470.8, y: 1239.2},
            {x: 1541.3, y: 1222.8},

        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'T',
        [
            {x: 1472.9, y: 1316.8},

            {x: 1501.2, y: 1458.6},
            {x: 1471.9, y: 1464.6},

            {x: 1441.5, y: 1295.5},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segTwo.lower,
        points.segThree.lower,
        'T',
        [
            {x: 1501.2, y: 1458.6},

            {x: 1517.6, y: 1517.6},
            {x: 1474.6, y: 1530.3},

            {x: 1471.9, y: 1464.6},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'T',
        [
            {x: 1517.6, y: 1517.6},

            {x: 1527.9, y: 1552.4},
            {x: 1482.6, y: 1562.8},

            {x: 1474.6, y: 1530.3},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segThree.lower, points.segFour.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 