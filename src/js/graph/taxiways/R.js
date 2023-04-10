import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segZero: {
        upper: new Point({x: 1956.9, y: 1103.2}),
        lower: new Point({x: 1958.3, y: 1111.7})
    },    
    segOne: {
        upper: new Point({x: 1953.5, y: 1123.9}),
        lower: new Point({x: 1920.7, y: 1171})
    },
    segTwo: {
        upper: new Point({x: 1903, y: 1119}),
        lower: new Point({x: 1914.7, y: 1171.2})
    },
    segThree: {
        upper: new Point({x: 1916.4, y: 1182.1}),
        lower: new Point({x: 1927.2, y: 1233.5})
    },
    segFour: {
        upper: new Point({x: 1933.6, y: 1263.8}),
        lower: new Point({x: 1956.9, y: 1373.1}, {name: 'R1'})
    },
    segFive: {
        upper: new Point({x: 1962.2, y: 1398.7}),
        lower: new Point({x: 1969, y: 1432.6})
    },
    segSix: {
        lower: new Point({x: 1972.2, y: 1449})
    }
}

// stands for taxiway segments
const segThreeStands = {
    '160': new Stand({x: 1920.5, y: 1204.1}, {x: 1841, y: 1220.5}, '160'),
    '160L': new Stand({x: 1923.7, y: 1218}, {x: 1855, y: 1232.7}, '160L'),
    '160R': new Stand({x: 1918, y: 1193.7}, {x: 1847.1, y: 1209.1}, '160R'),
}

const segFourStands = {
    '161': new Stand({x: 1935.5, y: 1274.2}, {x: 1875, y: 1288.5}, '161'),
}


// taxiway segments
export const taxiways = {
    segZero: new TaxiwaySegment(
        points.segZero.upper,
        points.segZero.lower,
        'R',
        [
            {x: 1978.5, y: 1091},
            {x: 1965.6, y: 1125.5},
            {x: 1944.3, y: 1100.2},
            {x: 1949.4, y: 1079.3}
        ],
        []
    ),
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'R', 
        [
            {x: 1965.6, y: 1125.5},

            {x: 1933.7, y: 1184.8},
            {x: 1897.6, y: 1179.8},

            {x: 1944.3, y: 1100.2},
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'RA',
        [
            {x: 1919.4, y: 1109.3},

            {x: 1933.4, y: 1175.8},
            {x: 1897.6, y: 1179.8},

            {x: 1885.8, y: 1112.9}
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'R',
        [
            {x: 1933.4, y: 1175.8},

            {x: 1946.6, y: 1244.9},
            {x: 1918, y: 1252},

            {x: 1897.6, y: 1179.8},
        ],
        Object.values(segThreeStands)
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'R',
        [
            {x: 1946.6, y: 1244.9},

            {x: 1976.6, y: 1369},
            {x: 1936.9, y: 1377.6},

            {x: 1918, y: 1252},
        ],
        Object.values(segFourStands)
    ),
    segFive: new TaxiwaySegment(
        points.segFive.upper,
        points.segFive.lower,
        'R',
        [
            {x: 1976.6, y: 1369},

            {x: 1988.6, y: 1428.5},
            {x: 1950.7, y: 1436.5},

            {x: 1936.9, y: 1377.6},
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segFive.lower,
        points.segSix.lower,
        'R',
        [
            {x: 1988.6, y: 1428.5},

            {x: 1995.4, y: 1450.5},
            {x: 1955.2, y: 1459.4},

            {x: 1950.7, y: 1436.5},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segZero.lower, points.segOne.upper);
joinPoints(points.segOne.lower, points.segThree.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);
joinPoints(points.segThree.lower, points.segFour.upper);
joinPoints(points.segFour.lower, points.segFive.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 