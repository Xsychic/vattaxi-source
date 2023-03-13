import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 898.9, y: 1663.4}),
        lower: new Point({x: 904.5, y: 1679.2})
    },
    segTwo: {
        upper: new Point({x: 930.1, y: 1692.1}),
        lower: new Point({x: 994.2, y: 1711.1}, {name: 'FR', gradient: -0.2})
    },
    segThree: {
        upper: new Point({x: 1029.3, y: 1720.1}),
        lower: new Point({x: 1112.1, y: 1737.5})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'FR', 
        [
            {x: 909.2, y: 1654.4},

            {x: 927.9, y: 1677.2},
            {x: 888.2, y: 1687.5},

            {x: 879.5, y: 1659.8}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'FR',
        [
            {x: 927.9, y: 1677.2},

            {x: 1035.1, y: 1707.2},
            {x: 996.2, y: 1727.5},

            {x: 888.2, y: 1687.5},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'F', // named F intentionally to allow the named holding point to work when exiting the runway
        [
            {x: 1035.1, y: 1707.2},

            {x: 1226.7, y: 1744.3},
            {x: 1139.6, y: 1764},

            {x: 996.2, y: 1727.5},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 