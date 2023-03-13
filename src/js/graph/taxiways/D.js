import Point from '@/js/graph/Point';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 1963.5, y: 1484}),
        lower: new Point({x: 1925.5, y: 1516.5}, {name: 'D1'})
    },
    segTwo: {
        lower: new Point({x: 1790.3, y: 1623.8})
    },
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'D', 
        [
            {x: 1979.6, y: 1487.2},

            {x: 1936.3, y: 1530.1},
            {x: 1913.5, y: 1503.4},

            {x: 1948.9, y: 1479.8}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segOne.lower,
        points.segTwo.lower,
        'D',
        [
            {x: 1936.3, y: 1530.1},

            {x: 1837.1, y: 1614},
            {x: 1767.1, y: 1628.5},

            {x: 1913.5, y: 1503.4},
        ],
        []
    ),
}


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 