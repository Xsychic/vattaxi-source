import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 2356.3, y: 1152.6}),
        lower: new Point({x: 2366.7, y: 1202.7})
    },
    segTwo: {
        upper: new Point({x: 2374.6, y: 1237}),
        lower: new Point({x: 2377.4, y: 1249.5}, {name: 'N1'})
    },
    segThree: {
        lower: new Point({x: 2382.7, y: 1268.2})
    },
    segFour: {
        upper: new Point({x: 2390.6, y: 1304.3}),
        lower: new Point({x: 2392.3, y: 1311.9})
    },
    segFive: {
        upper: new Point({x: 2399.7, y: 1346.2}),
        lower: new Point({x: 2403.5, y: 1356.5})
    },
    segSix: {
        upper: new Point({x: 2408, y: 1364.3}),
        lower: new Point({x: 2416.6, y: 1376.9})
    },
    segSeven: {
        upper: new Point({x: 2435.8, y: 1402.6}),
        lower: new Point({x: 2446.8, y: 1411.3})
    },
    segEight: {
        upper: new Point({x: 2424.4, y: 1412.8}),
        lower: new Point({x: 2428.8, y: 1434.1}, {name: 'B1'})
    }
}

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'N', 
        [
            {x: 2384.4, y: 1142.6},

            {x: 2398.8, y: 1212.3},
            {x: 2355.6, y: 1221.6},

            {x: 2335.1, y: 1147.3}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.upper,
        points.segTwo.lower,
        'N',
        [
            {x: 2398.8, y: 1212.3},

            {x: 2404.9, y: 1242.5},
            {x: 2360.3, y: 1252},
            
            {x: 2355.6, y: 1221.6}
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segTwo.lower,
        points.segThree.lower,
        'N',
        [
            {x: 2404.9, y: 1242.5},
            {x: 2413.8, y: 1257.4},
            {x: 2405.4, y: 1263.5},

            {x: 2407.5, y: 1290.4},
            {x: 2369.9, y: 1303.6},
            
            {x: 2360.8, y: 1272.8},
            {x: 2360.3, y: 1252},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.upper,
        points.segFour.lower,
        'N',
        [
            {x: 2407.5, y: 1290.4},

            {x: 2415, y: 1338},
            {x: 2378.6, y: 1342},

            {x: 2369.9, y: 1303.6},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.upper,
        points.segFive.lower,
        'N',
        [
            {x: 2415, y: 1338},

            {x: 2424.5, y: 1357.5},
            {x: 2383.2, y: 1367.6},

            {x: 2378.6, y: 1342},
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segSix.upper,
        points.segSix.lower,
        'N',
        [
            {x: 2424.5, y: 1357.5},

            {x: 2452.5, y: 1397.8},
            {x: 2401.8, y: 1409.8},

            {x: 2383.2, y: 1367.6}, 
        ],
        []
    ),
    segSeven: new TaxiwaySegment(
        points.segSeven.upper,
        points.segSeven.lower,
        'N',
        [
            {x: 2452.5, y: 1397.8},

            {x: 2470.5, y: 1413},
            {x: 2441, y: 1418},

            {x: 2430.3, y: 1403.3},
        ],
        []
    ),
    segEight: new TaxiwaySegment(
        points.segEight.upper,
        points.segEight.lower,
        'N',
        [
            {x: 2430.3, y: 1403.3},
        
            {x: 2449, y: 1429.8},
            {x: 2417.3, y: 1436.3},

            {x: 2401.8, y: 1409.8},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segThree.lower, points.segFour.upper);
joinPoints(points.segFour.lower, points.segFive.upper);
joinPoints(points.segFive.lower, points.segSix.upper);
joinPoints(points.segSix.lower, points.segSeven.upper);
joinPoints(points.segSix.lower, points.segEight.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 