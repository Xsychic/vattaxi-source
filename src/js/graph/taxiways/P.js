import Point from '@/js/graph/Point';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2276.9, y: 1038.4}),
        lower: new Point({x: 2296, y: 1125.5})
    },
    segTwo: {
        upper: new Point({x: 2300.4, y: 1146.9}),
        lower: new Point({x: 2304, y: 1163.3})
    },
    segThree: {
        upper: new Point({x: 2308.8, y: 1184.5}),
        lower: new Point({x: 2314.7, y: 1214.3})
    },
    segFour: {
        upper: new Point({x: 2323.4, y: 1249.4}),
        lower: new Point({x: 2324.4, y: 1257.4}, {name: 'P1'})
    },
    segFive: {
        lower: new Point({x: 2330.9, y: 1286.2})
    },
    segSix: {
        upper: new Point({x: 2337.3, y: 1315.8}),
        lower: new Point({x: 2345.8, y: 1357.5})
    },
    segSeven: {
        upper: new Point({x: 2369.4, y: 1395}),
        lower: new Point({x: 2380.1, y: 1409.9})
    },
    segEight: {
        upper: new Point({x: 2387.4, y: 1419.8}),
        lower: new Point({x: 2400.3, y: 1439.6}, {name: 'B1', gradient: -0.23})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'P', 
        [
            {x: 2294.7, y: 1028.6},
            {x: 2314.8, y: 1132.6},
            {x: 2273.5, y: 1138.9},
            {x: 2254.1, y: 1036.6}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'P',
        [
            {x: 2314.8, y: 1132.6},
            {x: 2322.8, y: 1170.5},
            {x: 2283.3, y: 1179.4},
            {x: 2273.5, y: 1138.9},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'P',
        [
            {x: 2322.8, y: 1170.5},
            {x: 2334.5, y: 1225.1},
            {x: 2298.9, y: 1235.5},
            {x: 2283.3, y: 1179.4},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'P',
        [
            {x: 2334.5, y: 1225.1},
            {x: 2343.1, y: 1254},
            {x: 2303.4, y: 1261.1},
            {x: 2298.9, y: 1235.5},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFour.lower,
        points.segFive.lower,
        'P',
        [
            {x: 2343.1, y: 1254},
            {x: 2348.5, y: 1281.4},
            {x: 2342.6, y: 1299.2},
            {x: 2309.8, y: 1306},
            {x: 2303.4, y: 1261.1},
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segSix.upper,
        points.segSix.lower,
        'P',
        [
            {x: 2342.6, y: 1299.2},
            {x: 2354.2, y: 1311.2},
            {x: 2361, y: 1363.2},
            {x: 2330.3, y: 1375.1},
            {x: 2309.8, y: 1306},
        ],
        []
    ),
    segSeven: new TaxiwaySegment(
        points.segSeven.upper,
        points.segSeven.lower,
        'P',
        [
            {x: 2361, y: 1363.2},
            {x: 2399.2, y: 1404.5},
            {x: 2363.8, y: 1422.7},
            {x: 2330.3, y: 1375.1},
        ],
        []
    ),
    segEight: new TaxiwaySegment(
        points.segEight.upper,
        points.segEight.lower,
        'P',
        [
            {x: 2399.2, y: 1404.5},
            {x: 2417.9, y: 1436.5},
            {x: 2375.8, y: 1445.7},
            {x: 2363.8, y: 1422.7},
        ],
        []
    ),
} 

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);
joinPoints(points.segThree.lower, points.segFour.upper);
joinPoints(points.segFive.lower, points.segSix.upper);
joinPoints(points.segSix.lower, points.segSeven.upper);
joinPoints(points.segSeven.lower, points.segEight.upper);


// add taxiway reference to point instances
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 