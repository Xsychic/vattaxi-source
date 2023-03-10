import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segEOne: {
        left: new Point({x: 1782.5, y: 1449.8}),
        right: new Point({x: 1896.3, y: 1425.8})
    },
    segETwo: {
        right: new Point({x: 1948.1, y: 1419})
    },
    segEThree: {
        left: new Point({x: 1984.3, y: 1410.7}),
        right: new Point({x: 2002, y: 1407.2})
    },
    segEFour: {
        left: new Point({x: 2043.3, y: 1398.1}),
        right: new Point({x: 2129.3, y: 1379.4})
    },
    segEFive: {
        right: new Point({x: 2172.7, y: 1370.1})
    },
    segESix: {
        right: new Point({x: 2316.1, y: 1340.3})
    },
    segESeven: {
        left: new Point({x: 2331.6, y: 1330.6}),
        right: new Point({x: 2337.8, y: 1314.1})
    },
    segEEight: {
        left: new Point({x: 2342.9, y: 1303.5}),
        right: new Point({x: 2355.1, y: 1298.5})
    },
    segENine: {
        left: new Point({x: 2369.2, y: 1294.1}),
        right: new Point({x: 2405, y: 1283.4})
    },
    segETen: {
        left: new Point({x: 2419.2, y: 1279.7}, {name: 'J8', gradient: 5}),
        right: new Point({x: 2440.4, y: 1267.4})
    },
    segEEleven: {
        right: new Point({x: 2595.8, y: 1233.1})
    },
    segETwelve: {
        right: new Point({x: 2609, y: 1236.9})
    },
    segEThirteen: {
        left: new Point({x: 2628.1, y: 1242}),
        right: new Point({x: 2694.5, y: 1228.1})
    },
    segEFourteen: {
        right: new Point({x: 2711.7, y: 1224.2})
    }
}

// stands for taxiway segments
const segEFourStands = {
    '144': new Stand({x: 2114.2, y: 1382.2}, {x: 2099.1, y: 1313.2}, '144'),
    '144L': new Stand({x: 2099.5, y: 1386}, {x: 2085.9, y: 1324}, '144L'),
    '144R': new Stand({x: 2125.4, y: 1380.6}, {x: 2112.2, y: 1317.8}, '144R'),
    '145': new Stand({x: 2071.9, y: 1391.5}, {x: 2058.4, y: 1322.9}, '145'),
}

const segEFiveStands = {
    '143': new Stand({x: 2159.6, y: 1372.5}, {x: 2145.7, y: 1303.7}, '143'),
    '143L': new Stand({x: 2153.6, y: 1374}, {x: 2140.3, y: 1309}, '143L'),
}

const segESixStands = {
    '140': new Stand({x: 2292.2, y: 1344.8}, {x: 2277.9, y: 1275.7}, '140'),
    '141': new Stand({x: 2251.5, y: 1353.2}, {x: 2236.3, y: 1284.1}, '141'),
    '141L': new Stand({x: 2237.1, y: 1356.4}, {x: 2226.7, y: 1294.1}, '141L'),
    '141R': new Stand({x: 2265.1, y: 1350}, {x: 2252.3, y: 1285.7}, '141R'),
    '142': new Stand({x: 2204.4, y: 1363.6}, {x: 2189.2, y: 1294.1}, '142'),
    '142R': new Stand({x: 2208.4, y: 1361.6}, {x: 2196, y: 1298.9}, '142R'),
    '143R': new Stand({x: 2180.8, y: 1368}, {x: 2166.8, y: 1304.9}, '143R'),
}

const segENineStands = {
    '27': new Stand({x: 2382.9, y: 1289.4}, {x: 2438.3, y: 1213.1}, '27')
}

const segEElevenStands = {
    '18': new Stand({x: 2575.9, y: 1236.4}, {x: 2565.3, y: 1188.8}, '18'),
    '20': new Stand({x: 2550.1, y: 1242.5}, {x: 2538.8, y: 1194.6}, '20'),
    '22': new Stand({x: 2522.1, y: 1248.7}, {x: 2511.9, y: 1202.6}, '22'),
    '24': new Stand({x: 2494.2, y: 1254.9}, {x: 2484, y: 1208.4}, '24'),
    '28': new Stand({x: 2468.4, y: 1260.3}, {x: 2457.8, y: 1214.6}, '28'),
}

const segETwelveStands = {
    '16': new Stand({x: 2603.5, y: 1234.2}, {x: 2593.6, y: 1187.7}, '16')
}

const segEThirteenStands = {
    '11': new Stand({x: 2685.8, y: 1229.3}, {x: 2673.7, y: 1172.4}, '11'),
    '12': new Stand({x: 2657.3, y: 1235.5}, {x: 2646.9, y: 1175.3}, '12'),
    '14': new Stand({x: 2630.7, y: 1241.4}, {x: 2619.4, y: 1181}, '14'),
}

const segEFourteenStands = {
    '1': new Stand({x: 2704.7, y: 1219.3}, {x: 2754.9, y: 1209.2}, '1'),
    '10': new Stand({x: 2711.7, y: 1224.2}, {x: 2699.7, y: 1163.9}, '10'),
}


// taxiway segments
export const taxiways = {
    segEOne: new TaxiwaySegment(
        points.segEOne.left, 
        points.segEOne.right, 
        'J', 
        [
            {x: 1744.7, y: 1436.1},
            {x: 1890.9, y: 1406.3},
            {x: 1898.8, y: 1446.9},
            {x: 1754.4, y: 1474.3},
        ],
        []
    ),
    segETwo: new TaxiwaySegment(
        points.segEOne.right,
        points.segETwo.right,
        'J',
        [
            {x: 1890.9, y: 1406.3},
            {x: 1953.7, y: 1393.8},
            {x: 1962.5, y: 1435.4},
            {x: 1898.8, y: 1446.9},
        ],
        []
    ),
    segEThree: new TaxiwaySegment(
        points.segEThree.left,
        points.segEThree.right,
        'J',
        [
            {x: 1953.7, y: 1393.8},
            {x: 2012.7, y: 1386.1},
            {x: 2020.7, y: 1420.6},
            {x: 1962.5, y: 1435.4},
        ],
        []
    ),
    segEFour: new TaxiwaySegment(
        points.segEFour.left,
        points.segEFour.right,
        'J',
        [
            {x: 2012.7, y: 1386.1},
            {x: 2032, y: 1369.4},
            {x: 2122.3, y: 1351.2},
            {x: 2132.8, y: 1399.6},
            {x: 2020.7, y: 1420.6},
        ],
        Object.values(segEFourStands)
    ),
    segEFive: new TaxiwaySegment(
        points.segEFour.right,
        points.segEFive.right,
        'J',
        [
            {x: 2122.3, y: 1351.2},

            {x: 2168.2, y: 1341.3},
            {x: 2175.2, y: 1393.4},

            {x: 2132.8, y: 1399.6},
        ],
        Object.values(segEFiveStands)
    ),
    segESix: new TaxiwaySegment(
        points.segEFive.right,
        points.segESix.right,
        'J',
        [
            {x: 2168.2, y: 1341.3},
            {x: 2312.2, y: 1310.1},
            {x: 2319, y: 1308.1},
            {x: 2329, y: 1352.8},
            {x: 2307.8, y: 1359.6},
            {x: 2175.2, y: 1393.4}, 
        ],
        Object.values(segESixStands)
    ),
    segESeven: new TaxiwaySegment(
        points.segESeven.left,
        points.segESeven.right,
        'J',
        [
            {x: 2319, y: 1308.1},
            {x: 2328.5, y: 1299.3},
            {x: 2352.7, y: 1317.3},
            {x: 2348.2, y: 1340.6},
            {x: 2329, y: 1352.8},
        ],
        []
    ),
    segEEight: new TaxiwaySegment(
        points.segEEight.left,
        points.segEEight.right,
        'J',
        [
            {x: 2328.5, y: 1299.3},
            {x: 2335.2, y: 1281.3},

            {x: 2359.2, y: 1276.6},
            {x: 2367.9, y: 1311.1},

            {x: 2352.7, y: 1317.3},
        ],
        []
    ),
    segENine: new TaxiwaySegment(
        points.segENine.left,
        points.segENine.right,
        'J',
        [
            {x: 2359.2, y: 1276.6},
            {x: 2402.4, y: 1264.9},
            {x: 2406.9, y: 1299.7},
            {x: 2367.9, y: 1311.1},
        ],
        Object.values(segENineStands)
    ),
    segETen: new TaxiwaySegment(
        points.segETen.left,
        points.segETen.right,
        'J',
        [
            {x: 2402.4, y: 1264.9},
            {x: 2413.8, y: 1257.4},
            {x: 2436.4, y: 1254},
            {x: 2443.9, y: 1289.9},
            {x: 2406.9, y: 1299.7},
        ],
        []
    ),
    segEEleven: new TaxiwaySegment(
        points.segETen.right,
        points.segEEleven.right,
        'J',
        [
            {x: 2436.4, y: 1254},

            {x: 2592.9, y: 1219.3},
            {x: 2597.3, y: 1252.3},

            {x: 2443.9, y: 1289.9},
        ],
        Object.values(segEElevenStands)
    ),
    segETwelve: new TaxiwaySegment(
        points.segEEleven.right,
        points.segETwelve.right,
        'J',
        [
            {x: 2592.9, y: 1219.3},

            {x: 2613.8, y: 1217.1},
            {x: 2604.2, y: 1254.1},

            {x: 2597.3, y: 1252.3},
        ],
        Object.values(segETwelveStands)
    ),
    segEThirteen: new TaxiwaySegment(
        points.segEThirteen.left,
        points.segEThirteen.right,
        'J',
        [
            {x: 2613.8, y: 1217.1},

            {x: 2689.2, y: 1199.4},
            {x: 2695.5, y: 1238.3},

            {x: 2610.6, y: 1255.1},
            {x: 2604.2, y: 1254.1},
        ],
        Object.values(segEThirteenStands)
    ),
    segEFourteen: new TaxiwaySegment(
        points.segEThirteen.right,
        points.segEFourteen.right,
        'J',
        [
            {x: 2689.2, y: 1199.4},

            {x: 2716.2, y: 1194.1},
            {x: 2725.1, y: 1232.6},
        
            {x: 2695.5, y: 1238.3},
        ],
        Object.values(segEFourteenStands)
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segETwo.right, points.segEThree.left);
joinPoints(points.segEThree.right, points.segEFour.left);
joinPoints(points.segESix.right, points.segESeven.left);
joinPoints(points.segESeven.right, points.segEEight.left);
joinPoints(points.segEEight.right, points.segENine.left);
joinPoints(points.segENine.right, points.segETen.left);
joinPoints(points.segETwelve.right, points.segEThirteen.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 