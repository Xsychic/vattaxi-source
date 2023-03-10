import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 2654.5, y: 1356.3}),
        right: new Point({x: 2715.5, y: 1343.6})
    },
    segTwo: {
        left: new Point({x: 2739.6, y: 1340.6}),
        right: new Point({x: 2817.7, y: 1323.5})
    },
}

// stands for taxiway segments
const segTwoStands = {
    '4': new Stand({x: 2789.9, y: 1329.8}, {x: 2786.1, y: 1285.4}, '4'),
    '5': new Stand({x: 2816.5, y: 1323.5}, {x: 2815.7, y: 1280.8}, '5'),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'V', 
        [
            {x: 2648.4, y: 1341.9},

            {x: 2719.6, y: 1327},
            {x: 2721.9, y: 1359.7},

            {x: 2652.7, y: 1372.9}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'V',
        [
            {x: 2719.6, y: 1327},

            {x: 2824.6, y: 1306.6},
            {x: 2835.5, y: 1336.4},

            {x: 2721.9, y: 1359.7},
        ],
        Object.values(segTwoStands)
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