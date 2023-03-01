import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point(),
        right: new Point()
    },
    segTwo: {

    },
}

// stands for taxiway segments
const segOneStands = {
    '': new Stand(, , ''),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'x', 
        [

        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.,
        points.,
        'x',
        [

        ],
        []
    ),
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 