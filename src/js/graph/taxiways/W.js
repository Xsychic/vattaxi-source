import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2703.8, y: 1218.4}),
        lower: new Point({x: 2707.4, y: 1231.4})
    },
    segTwo: {
        lower: new Point({x: 2712.7, y: 1249.6})
    },
    segThree: {
        upper: new Point({x: 2716.7, y: 1269.7}),
        lower: new Point({x: 2719.1, y: 1283})
    },
    segFour: {
        upper: new Point({x: 2723.3, y: 1303.3}),
        lower: new Point({x: 2728.6, y: 1330})
    },
    segFive: {
        upper: new Point({x: 2729.2, y: 1354.6}),
        lower: new Point({x: 2731.5, y: 1368.9}, {name: 'W1'})
    }
}

// stands for taxiway segments
const segOneStands = {
    '1': new Stand({x: 2704.7, y: 1219.3}, {x: 2754.9, y: 1209.2}, '1'),
    '10': new Stand({x: 2711.7, y: 1224.2}, {x: 2699.7, y: 1163.9}, '10'),
}

const segTwoStands = {
    '2': new Stand({x: 2712.4, y: 1248.3}, {x: 2761.2, y: 1239.3}, '2'),
}

const segThreeStands = {
    '3': new Stand({x: 2718.6, y: 1279.4}, {x: 2768, y: 1268.5}, '3'),
}

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'W', 
        [
            {x: 2718.4, y: 1203.4},

            {x: 2723.4, y: 1227.7},
            {x: 2694.3, y: 1233.8},

            {x: 2686.7, y: 1199.8}
        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segOne.lower,
        points.segTwo.lower,
        'W',
        [
            {x: 2723.4, y: 1227.7},

            {x: 2731.4, y: 1259},
            {x: 2700.6, y: 1268},

            {x: 2694.3, y: 1233.8},
        ],
        Object.values(segTwoStands)
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'W',
        [
            {x: 2731.4, y: 1259},

            {x: 2738.9, y: 1293.9},
            {x: 2708.3, y: 1301.9},

            {x: 2700.6, y: 1268},
        ],
        Object.values(segThreeStands)
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'W',
        [
            {x: 2738.9, y: 1293.9},

            {x: 2749.2, y: 1332.9},
            {x: 2712.8, y: 1339.8},

            {x: 2708.3, y: 1301.9},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.upper,
        points.segFive.lower,
        'W',
        [
            {x: 2749.2, y: 1332.9},

            {x: 2759.2, y: 1387.4},
            {x: 2715, y: 1402.3},

            {x: 2712.8, y: 1339.8},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
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