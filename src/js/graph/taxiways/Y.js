import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 2180.7, y: 1568}),
        right: new Point({x: 2192.9, y: 1620.2}, {name: 'Y1'})
    },
    segTwo: {
        left: new Point({x: 2197.2, y: 1639.1}, {name: 'Y2', gradient: -0.2}),
        right: new Point({x: 2206.8, y: 1668.1})
    },
    segThree: {
        left: new Point({x: 2226.3, y: 1685.5}),
        right: new Point({x: 2250.8, y: 1691.8})
    },
    segFour: {
        left: new Point({x: 2286.8, y: 1686.1}),
        right: new Point({x: 2348.9, y: 1672.4})
    },
    segFive: {
        left: new Point({x: 2299, y: 1689}),
        right: new Point({x: 2310.3, y: 1707})
    },
    segSix: {
        left: new Point({x: 2360.1, y: 1681.3}),
        right: new Point({x: 2363.4, y: 1695.9})
    },
    segSeven: {
        left: new Point({x: 2368.1, y: 1668.4}),
        right: new Point({x: 2740.9, y: 1587.9})
    },
    segEight: {
        left: new Point({x: 2762.2, y: 1580.4}, {name: 'Y3', gradient: 1}),
        right: new Point({x: 2771.7, y: 1568.9})
    },
    segNine: {
        left: new Point({x: 2771.7, y: 1552.4}),
        right: new Point({x: 2741.3, y: 1414.3})
    }
}

// stands for taxiway segments
const segFiveStands = {
    'MA1': new Stand({x: 2309.8, y: 1705.8}, {x: 2313.3, y: 1732}, 'MA1'),
} // left

const segSixStands = {
    'MA1': new Stand({x: 2363, y: 1695.2}, {x: 2366.6, y: 1720.5}, 'MA1'),
} // right


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'Y', 
        [
            {x: 2197.4, y: 1564.5},

            {x: 2214, y: 1625.8},
            {x: 2178.1, y: 1632.8},

            {x: 2161.1, y: 1572.6}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'Y',
        [
            {x: 2214, y: 1625.8},

            {x: 2229.4, y: 1660.3},
            {x: 2200.1, y: 1691.9},

            {x: 2178.1, y: 1632.8},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.left,
        points.segThree.right,
        'Y',
        [
            {x: 2229.4, y: 1660.3},
            
            {x: 2258.6, y: 1672.4},
            {x: 2254.9, y: 1710.3},

            {x: 2200.1, y: 1691.9},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.left,
        points.segFour.right,
        'Y',
        [
            {x: 2258.6, y: 1672.4},

            {x: 2351.8, y: 1655},
            {x: 2356.6, y: 1686.9},

            {x: 2254.9, y: 1710.3},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.left,
        points.segFive.right,
        'Y',
        [
            {x: 2311.9, y: 1686.6},
            {x: 2326.6, y: 1702.7},
            {x: 2403.6, y: 1686.8},
            {x: 2410.9, y: 1764.4},
            {x: 2276.6, y: 1779.4},
            {x: 2271.2, y: 1714.8},
            {x: 2296.9, y: 1710.2},
            {x: 2287.3, y: 1695.6}
        ],
        Object.values(segFiveStands)
    ),
    segSix: new TaxiwaySegment(
        points.segSix.left,
        points.segSix.right,
        'Y',
        [
            {x: 2377.3, y: 1673.1},
            {x: 2380.4, y: 1691.7},
            {x: 2403.6, y: 1686.8},
            {x: 2410.9, y: 1764.4},
            {x: 2276.6, y: 1779.4},
            {x: 2271.2, y: 1714.8},
            {x: 2344.1, y: 1699.3},
            {x: 2342, y: 1686.6}
        ],
        Object.values(segSixStands)
    ),
    segSeven: new TaxiwaySegment(
        points.segSeven.left,
        points.segSeven.right,
        'Y',
        [
            {x: 2351.8, y: 1655},

            {x: 2741.5, y: 1567.9},
            {x: 2755.4, y: 1597.1},

            {x: 2356.6, y: 1686.9},
        ],
        []
    ),
    segEight: new TaxiwaySegment(
        points.segEight.left,
        points.segEight.right,
        'Y',
        [
            {x: 2741.5, y: 1567.9},

            {x: 2750.7, y: 1549.4},
            {x: 2788.5, y: 1556},

            {x: 2783.4, y: 1584.8},
            {x: 2755.4, y: 1597.1},
        ],
        []
    ),
    segNine: new TaxiwaySegment(
        points.segNine.left,
        points.segNine.right,
        'Y',
        [
            {x: 2750.7, y: 1549.4},

            {x: 2715, y: 1402.3},
            {x: 2759.2, y: 1387.4},

            {x: 2788.5, y: 1556},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);
joinPoints(points.segTwo.right, points.segThree.left);
joinPoints(points.segThree.right, points.segFour.left);
joinPoints(points.segFour.left, points.segFive.left);
joinPoints(points.segFour.right, points.segSix.left);
joinPoints(points.segFour.right, points.segSeven.left);
joinPoints(points.segSix.left, points.segSeven.left);
joinPoints(points.segSeven.right, points.segEight.left);
joinPoints(points.segEight.right, points.segNine.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 