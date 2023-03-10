import Point from '@/js/graph/Point';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 2333.4, y: 1225.7}),
        right: new Point({x: 2357.4, y: 1222.3})
    }
}

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'NA', 
        [
            {x: 2356.3, y: 1196.4},
            {x: 2366.3, y: 1242.5},
            {x: 2332.3, y: 1245.7},
            {x: 2323.6, y: 1208}
        ],
        []
    )
}


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 