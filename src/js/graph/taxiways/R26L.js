import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 641.9, y: 1886}),
        right: new Point({x: 2671, y: 1447.2})
    }
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        '08R/26L', 
        [
            {x: 619, y: 1854.3},
            {x: 2691.3, y: 1408.4},
            {x: 2707.2, y: 1479},
            {x: 636.6, y: 1920.5}
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