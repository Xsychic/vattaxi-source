import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 2185.6, y: 1425}),
        right: new Point({x: 2335.1, y: 1391.7})
    },
    segTwo: {
        left: new Point({x: 2347, y: 1389.4}),
        right: new Point({x: 2390.5, y: 1379.8})
    },
    segThree: {
        left: new Point({x: 2426.2, y: 1372.7}),
        right: new Point({x: 2553.6, y: 1344})
    },
    segFour: {
        left: new Point({x: 2568.8, y: 1341.7}),
        right: new Point({x: 2597, y: 1335.6})
    },
    segFive: {
        left: new Point({x: 2615.8, y: 1332.2}),
        right: new Point({x: 2650, y: 1309})
    },
    segSix: {
        right: new Point({x: 2709.9, y: 1295.1})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'AN', 
        [
            {x: 2180.4, y: 1405.9},

            {x: 2335.9, y: 1367.6},
            {x: 2346, y: 1410.8},

            {x: 2185.7, y: 1448.8}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'AN',
        [
            {x: 2335.9, y: 1367.6},

            {x: 2396.8, y: 1356.9},
            {x: 2402.8, y: 1395.4},

            {x: 2346, y: 1410.8},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.left,
        points.segThree.right,
        'AN',
        [
            {x: 2396.8, y: 1356.9},

            {x: 2560, y: 1326.2},
            {x: 2563.9, y: 1361.4},

            {x: 2402.8, y: 1395.4},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.left,
        points.segFour.right,
        'AN',
        [
            {x: 2560, y: 1326.2},

            {x: 2595.1, y: 1320.3},
            {x: 2598.5, y: 1353},

            {x: 2563.9, y: 1361.4},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.left,
        points.segFive.right,
        'AN',
        [
            {x: 2595.1, y: 1320.3},

            {x: 2646.5, y: 1295.1},
            {x: 2654.7, y: 1322.5},

            {x: 2621.4, y: 1348.3},
            {x: 2598.5, y: 1353},
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segFive.right,
        points.segSix.right,
        'AN',
        [
            {x: 2646.5, y: 1295.1},

            {x: 2709.3, y: 1281.5},
            {x: 2713.6, y: 1308.3},

            {x: 2654.7, y: 1322.5},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);
joinPoints(points.segTwo.right, points.segThree.left);
joinPoints(points.segThree.right, points.segFour.left);
joinPoints(points.segFour.right, points.segFive.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 