import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2155.1, y: 1393.5}),
        lower: new Point({x: 2157.5, y: 1412.3})
    },
    segTwo: {
        upper: new Point({x: 2161.6, y: 1446.6}),
        lower: new Point({x: 2164.9, y: 1466.5}, {name: 'C3'})
    },
    segThree: {
        upper: new Point({x: 2166.8, y: 1484.7}, {name: 'C1'}),
        lower: new Point({x: 2174.4, y: 1541})
    },
    segFour: {
        upper: new Point({x: 2155.4, y: 1506}),
        lower: new Point({x: 2073.4, y: 1561.8})
    },
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'C', 
        [
            {x: 2171.4, y: 1381.1},

            {x: 2181.4, y: 1415.8},
            {x: 2137.9, y: 1424.4},

            {x: 2131.1, y: 1388.2}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'C',
        [
            {x: 2181.4, y: 1415.8},

            {x: 2184.1, y: 1472.3},
            {x: 2147.6, y: 1475.9},

            {x: 2137.9, y: 1424.4},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'C',
        [
            {x: 2184.1, y: 1472.3},

            {x: 2187.3, y: 1538.5},
            {x: 2160.5, y: 1543.8},

            {x: 2147.6, y: 1475.9},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'CR',
        [
            {x: 2161.7, y: 1511.8},
            {x: 2096.4, y: 1557.6},
            {x: 2057.6, y: 1565},
            {x: 2093.7, y: 1527.6},
            {x: 2148.8, y: 1490.3}
        ],
        []
    ),
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);
joinPoints(points.segThree.upper, points.segFour.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 