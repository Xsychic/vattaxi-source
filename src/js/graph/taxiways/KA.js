import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2464.9, y: 996.6}),
        lower: new Point({x: 2482.2, y: 1078.6})
    }
}

// stands for taxiway segments
const segOneStands = {
    '33': new Stand({x: 2477.8, y: 1055}, {x: 2548.8, y: 999}, '33'),
    '33L': new Stand({x: 2471.6, y: 1027.2}, {x: 2536.6, y: 1006.8}, '33L'),
    '34R': new Stand({x: 2466.1, y: 1001}, {x: 2515.5, y: 985.3}, '34R'),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'KA', 
        [
            {x: 2443.5, y: 982.9},
            // {x: 2438.2, y: 954.9},
            {x: 2490.7, y: 978.4},
            {x: 2515.2, y: 1065.7},
            {x: 2506.4, y: 1081.4},
            {x: 2467.7, y: 1089.1},
            {x: 2457, y: 1077.6},
            {x: 2447.1, y: 997.6}
        ],
        Object.values(segOneStands)
    )
}


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 