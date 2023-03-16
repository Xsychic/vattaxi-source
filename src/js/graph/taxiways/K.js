import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 1950.4, y: 1245.1}),
        right: new Point({x: 1969.6, y: 1240.7})
    },
    segTwo: {
        left: new Point({x: 2003.3, y: 1233}),
        right: new Point({x: 2281.2, y: 1173})
    },
    segThree: {
        left: new Point({x: 2317.4, y: 1139.3}),
        right: new Point({x: 2334.3, y: 1136.7})
    },
    segFour: {
        right: new Point({x: 2372.3, y: 1128.5})
    },
    segFive: {
        right: new Point({x: 2471.3, y: 1104})
    },
    segSix: {
        right: new Point({x: 2509.2, y: 1095.2})
    },
    segSeven: {
        right: new Point({x: 2688.8, y: 1057.6})
    }
}

// stands for taxiway segments
const segTwoStands = {
    '103': new Stand({x: 2276.7, y: 1173.9}, {x: 2245.8, y: 1123.9}, '103'),
    '104': new Stand({x: 2234.1, y: 1183}, {x: 2222.7, y: 1128.1}, '104'),
    '105': new Stand({x: 2207.4, y: 1188.9}, {x: 2196.7, y: 1134.3}, '105'),
    '106': new Stand({x: 2173.9, y: 1196.4}, {x: 2163.9, y: 1141.4}, '106'),
    '107': new Stand({x: 2148.3, y: 1201.6}, {x: 2136.6, y: 1147}, '107'),
    '130': new Stand({x: 2255.9, y: 1179.1}, {x: 2270.2, y: 1240.9}, '130'),
    '131': new Stand({x: 2219.5, y: 1186.3}, {x: 2232.1, y: 1248.1}, '131'),
    '132': new Stand({x: 2180.1, y: 1195.1}, {x: 2192.5, y: 1257.2}, '132'),
    '133': new Stand({x: 2143.1, y: 1202.5}, {x: 2157.7, y: 1263.7}, '133'),
    '134': new Stand({x: 2105.3, y: 1210.7}, {x: 2121, y: 1271.8}, '134'),
    '135': new Stand({x: 2070.6, y: 1217.8}, {x: 2085.8, y: 1279.9}, '135'),
    '136': new Stand({x: 2041.3, y: 1224.7}, {x: 2052.7, y: 1281.9}, '136'),
}

const segFourStands = {
    '43': new Stand({x: 2351.9, y: 1132.8}, {x: 2333, y: 1047.9}, '43'),
    '43W': new Stand({x: 2337.8, y: 1135.8}, {x: 2328.8, y: 1078.8}, '43W'),
}

const segFiveStands = {
    '23': new Stand({x: 2444.3, y: 1109.6}, {x: 2458.2, y: 1179.3}, '23'),
    '25': new Stand({x: 2374.8, y: 1127.2}, {x: 2433.8, y: 1187.9}, '25'),
    '41': new Stand({x: 2436.1, y: 1110.7}, {x: 2418.5, y: 1029.5}, '41'),
    '41E': new Stand({x: 2451, y: 1107.7}, {x: 2438.4, y: 1055.6}, '41E'),
    '41W': new Stand({x: 2417.8, y: 1115.1}, {x: 2405.6, y: 1062}, '41W'),
    '42': new Stand({x: 2395.5, y: 1121.9}, {x: 2377.9, y: 1048.8}, '42'),
    '43E': new Stand({x: 2375.1, y: 1127.3}, {x: 2362.3, y: 1070.8}, '43E')
}

const segSixStands = {
    '21': new Stand({x: 2486.3, y: 1100.7}, {x: 2501.4, y: 1171.3}, '21'),
    '33R': new Stand({x: 2486.1, y: 1100.5}, {x: 2526.5, y: 1031.3}, '33R'),
}

const segSevenStands = {
    '13': new Stand({x: 2670.4, y: 1060.9}, {x: 2684.8, y: 1130.3}, '13'),
    '13L': new Stand({x: 2686.1, y: 1057.5}, {x: 2698.8, y: 1116.9}, '13L'),
    '13R': new Stand({x: 2660.5, y: 1062.6}, {x: 2673.8, y: 1122.8}, '13R'),
    '15': new Stand({x: 2628, y: 1069.4}, {x: 2643.1, y: 1140.9}, '15'),
    '17': new Stand({x: 2583.9, y: 1079}, {x: 2599.3, y: 1149.8}, '17'),
    '19': new Stand({x: 2527.5, y: 1091.3}, {x: 2543.9, y: 1160.7}, '19'),
    '31': new Stand({x: 2619.8, y: 1070.8}, {x: 2604.1, y: 998.3}, '31'),
    '31L': new Stand({x: 2610.6, y: 1073.2}, {x: 2597.3, y: 1011.7}, '31L'),
    '31R': new Stand({x: 2639.3, y: 1066.3}, {x: 2623.9, y: 1011.3}, '31R'),
    '32': new Stand({x: 2563.4, y: 1083.4}, {x: 2569.9, y: 1010.3}, '32'),
    '32L': new Stand({x: 2527.5, y: 1091}, {x: 2564.4, y: 1023.6}, '32L'),
    '32R': new Stand({x: 2586.3, y: 1078.7}, {x: 2575.4, y: 1029.4}, '32R'),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'K', 
        [
            {x: 1983.4, y: 1222.9},
            {x: 1940.8, y: 1226.4},
            {x: 1937.6, y: 1245.4},
            {x: 1948.9, y: 1264.8},
            {x: 1991.9, y: 1252.1}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'K',
        [
            {x: 1983.4, y: 1222.9},
            {x: 2002, y: 1206.4},
            {x: 2282.3, y: 1145.1},
            {x: 2298.8, y: 1181.3},
            {x: 2293.2, y: 1184},
            {x: 2280.6, y: 1201.6},
            {x: 2009.3, y: 1258},
            {x: 1991.9, y: 1252.1}
        ],
        Object.values(segTwoStands)
    ),
    segThree: new TaxiwaySegment(
        points.segThree.left,
        points.segThree.right,
        'K',
        [
            {x: 2282.3, y: 1145.1},
            {x: 2314.6, y: 1130},

            {x: 2322.6, y: 1107},
            {x: 2330.9, y: 1105},
            {x: 2336.5, y: 1154.5},


            {x: 2318.7, y: 1157.7},
            {x: 2298.8, y: 1181.3},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segThree.right,
        points.segFour.right,
        'K',
        [
            {x: 2330.9, y: 1105},
            {x: 2366.4, y: 1097.2},
            {x: 2376, y: 1149.7},
            {x: 2336.5, y: 1154.5},
        ],
        Object.values(segFourStands)
    ),
    segFive: new TaxiwaySegment(
        points.segFour.right,
        points.segFive.right,
        'K',
        [
            {x: 2366.4, y: 1097.2},
            {x: 2457, y: 1077.6},
            {x: 2467.7, y: 1089.1},
            {x: 2476.5, y: 1131.3},
            {x: 2387.3, y: 1154.7},
            {x: 2376, y: 1149.7},
        ],
        Object.values(segFiveStands)
    ),
    segSix: new TaxiwaySegment(
        points.segFive.right,
        points.segSix.right,
        'K',
        [
            {x: 2467.7, y: 1089.1},
            {x: 2506.4, y: 1081.4},
            {x: 2515.6, y: 1121.9},
            {x: 2476.5, y: 1131.3},
        ],
        Object.values(segSixStands)
    ),
    segSeven: new TaxiwaySegment(
        points.segSix.right,
        points.segSeven.right,
        'K',
        [
            {x: 2506.4, y: 1081.4},
            {x: 2515.2, y: 1065.7},
            {x: 2691.3, y: 1028.1},
            {x: 2706.3, y: 1036.3},
            {x: 2712.1, y: 1079},
            {x: 2515.6, y: 1121.9},
        ],
        Object.values(segSevenStands)
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);
joinPoints(points.segTwo.right, points.segThree.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 