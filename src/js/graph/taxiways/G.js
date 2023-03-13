import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 897.4, y: 1663}),
        lower: new Point({x: 881.2, y: 1698.2})
    },
    segTwo: {
        upper: new Point({x: 874, y: 1713.9}),
        lower: new Point({x: 869.7, y: 1729})
    },
    segThree: {
        upper: new Point({x: 871.7, y: 1740.4}, {name: 'G3', gradient: -0.2}),
        lower: new Point({x: 872.7, y: 1755}, {name: 'G2', gradient: -0.2})
    },
    segFour: {
        upper: new Point({x: 874, y: 1768.3}, {name: 'G1', gradient: -0.2}),
        lower: new Point({x: 883, y: 1820})
    },
    segFive: {
        upper: new Point({x: 880.7, y: 1754.7}, {name: 'G2', gradient: -0.2}),
        lower: new Point({x: 893.8, y: 1763.7}, {name: 'G1', gradient: -0.2})
    },
    segSix: {
        upper: new Point({x: 920, y: 1772.2}),
        lower: new Point({x: 966.7, y: 1784.8})
    }
}

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'G', 
        [
            {x: 911.8, y: 1653.3},

            {x: 890.7, y: 1702.1},
            {x: 864.5, y: 1702.1},

            {x: 879.4, y: 1654.3}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'G',
        [
            {x: 890.7, y: 1702.1},

            {x: 904.7, y: 1723.4},
            {x: 847.7, y: 1734.7},

            {x: 864.5, y: 1702.1},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'G',
        [
            {x: 904.7, y: 1723.4},

            {x: 886.1, y: 1759.3},
            {x: 845.3, y: 1769},

            {x: 847.7, y: 1734.7},  
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'G',
        [
            {x: 886.1, y: 1759.3},

            {x: 901.2, y: 1814.4},
            {x: 860.9, y: 1823.8},

            {x: 845.3, y: 1769},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.upper,
        points.segFive.lower,
        'GR',
        [
            {x: 890.5, y: 1744.7},

            {x: 922.2, y: 1754.4},
            {x: 910.6, y: 1782.8},

            {x: 887.2, y: 1773},
            {x: 876.2, y: 1760.6}
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segSix.upper,
        points.segSix.lower,
        'GR',
        [
            {x: 922.2, y: 1754.4},

            {x: 1029.3, y: 1786.7},
            {x: 959.6, y: 1802.7},

            {x: 910.6, y: 1782.8}
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);
joinPoints(points.segThree.lower, points.segFour.upper);
joinPoints(points.segThree.upper, points.segFive.upper);
joinPoints(points.segFive.lower, points.segSix.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 