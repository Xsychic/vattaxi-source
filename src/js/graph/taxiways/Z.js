import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 2353.6, y: 1337.1}),
        right: new Point({x: 2379.4, y: 1332.4})
    },
    segTwo: {
        left: new Point({x: 2414.2, y: 1324.5}),
        right: new Point({x: 2552.7, y: 1294.6}, {name: 'Z1'})
    },
    segThree: {
        left: new Point({x: 2592.6, y: 1285.8}),
        right: new Point({x: 2609.6, y: 1281.9})
    },
    segFour: {
        left: new Point({x: 2635.9, y: 1276}),
        right: new Point({x: 2704.2, y: 1261.3})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'Z', 
        [
            {x: 2315.3, y: 1314.2},

            {x: 2387.4, y: 1306.8},
            {x: 2395.3, y: 1349.3},

            {x: 2325.5, y: 1356.4}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'Z',
        [
            {x: 2387.4, y: 1306.8},

            {x: 2547.4, y: 1272.5},
            {x: 2556.6, y: 1316.9},

            {x: 2395.3, y: 1349.3},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.left,
        points.segThree.right,
        'Z',
        [
            {x: 2547.4, y: 1272.5},

            {x: 2612.4, y: 1258.7},
            {x: 2623.4, y: 1302.1},

            {x: 2556.6, y: 1316.9},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.left,
        points.segFour.right,
        'Z',
        [
            {x: 2612.4, y: 1258.7},

            {x: 2707.7, y: 1244.8},
            {x: 2712.8, y: 1275.5},

            {x: 2623.4, y: 1302.1},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);
joinPoints(points.segTwo.right, points.segThree.left);
joinPoints(points.segThree.right, points.segFour.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 