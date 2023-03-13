import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 746.3, y: 1747.5}),
        lower: new Point({x: 753.7, y: 1772.4}, {name: 'H3', gradient: -0.2})
    },
    segTwo: {
        upper: new Point({x: 757.9, y: 1785.8}, {name: 'H2', gradient: -0.2}),
        lower: new Point({x: 761.9, y: 1798.7}, {name: 'H1', gradient: -0.2})
    },
    segThree: {
        upper: new Point({x: 771.4, y: 1817.4}),
        lower: new Point({x: 791.3, y: 1839.1})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'H', 
        [
            {x: 767.7, y: 1737.7},

            {x: 772, y: 1775.1},
            {x: 738, y: 1783.1},

            {x: 725.2, y: 1746}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'H',
        [
            {x: 772, y: 1775.1},

            {x: 780.3, y: 1801.5},
            {x: 746.6, y: 1811.9},

            {x: 738, y: 1783.1},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.upper,
        points.segThree.lower,
        'H',
        [
            {x: 780.3, y: 1801.5},

            {x: 807.3, y: 1834.8},
            {x: 770.2, y: 1842.8},

            {x: 746.6, y: 1811.9},
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