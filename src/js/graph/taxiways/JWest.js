import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segWOne: {

    },
    segWN: {
        left: new Point({x: 1518.1, y: 1506.3}),
        right: new Point({x: 1731.1, y: 1461.1})
    }
}


// taxiway segments
export const taxiways = {
    segWN: new TaxiwaySegment(
        points.segWN.left, 
        points.segWN.right, 
        'J', 
        [
            {x: 1744.7, y: 1436.1},
            {x: 1754.4, y: 1474.3},

            {x: 1505.8, y: 1531.2},
            {x: 1498.7, y: 1491}
        ],
        []
    ),
    // segTwo: new TaxiwaySegment(
    //     points.,
    //     points.,
    //     'x',
    //     [

    //     ],
    //     []
    // ),
}

// link adjoining (non-adjacent segment) points
// joinPoints()


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 