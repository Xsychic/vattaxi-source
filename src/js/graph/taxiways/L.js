import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 1661, y: 1140}),
        right: new Point({x: 1677, y: 1141})
    },
    segTwo: {
        left: new Point({x: 1708, y: 1141.5}),
        right: new Point({x: 1878.4, y: 1104.9})
    },
    segThree: {
        right: new Point({x: 1918, y: 1096})
    },
    segFour: {
        left: new Point({x: 1937.3, y: 1092}),
        right: new Point({x: 1969, y: 1085.6})
    },
    segFive: {
        right: new Point({x: 2010.1, y: 1076.6})
    },
    segSix: {
        left: new Point({x: 2026.3, y: 1072.9}),
        right: new Point({x: 2065.5, y: 1064.6})
    },
    segSeven: {
        left: new Point({x: 2103.6, y: 1056.9}),
        right: new Point({x: 2252.9, y: 1024.4})
    },
    segEight: {
        right: new Point({x: 2292.6, y: 1015.8})
    },
    segNine: {
        right: new Point({x: 2443.8, y: 982.5})
    },
    segTen: {
        left: new Point({x: 2463, y: 977.6}),
        right: new Point({x: 2463.2, y: 961.6})
    },
    segEleven: {
        left: new Point({x: 2467.6, y: 942}),
        right: new Point({x: 2484.3, y: 909.8})
    },
    segTwelve: {
        left: new Point({x: 2496.7, y: 896.5}),
        right: new Point({x: 2516.5, y: 881.9})
    },
    segThirteen: {
        left: new Point({x: 2531.1, y: 874.2}),
        right: new Point({x: 2564.4, y: 868.9})
    },
    segFourteen: {
        left: new Point({x: 2591.6, y: 872.3}),
        right: new Point({x: 2623.9, y: 882.4})
    },
    segFifteen: {
        left: new Point({x: 2640.3, y: 893.7}),
        right: new Point({x: 2652, y: 909.3})
    },
    segSixteen: {
        right: new Point({x: 2675, y: 963.8})
    }

    
}

// stands for taxiway segments
const segOneStands = {
    '159': new Stand({x: 1670, y: 1140}, {x: 1659, y: 1083}, '159'),
}

const segTwoStands = {
    '150': new Stand({x: 1840.4, y: 1113.1}, {x: 1854.9, y: 1183.4}, '150'),
    '150L': new Stand({x: 1851.3, y: 1110.8}, {x: 1862.3, y: 1166.5}, '150L'),
    '150R': new Stand({x: 1822, y: 1117}, {x: 1836, y: 1179.8}, '150R'),
    '151': new Stand({x: 1793, y: 1122.9}, {x: 1809.9, y: 1193.1}, '151'),
    '152': new Stand({x: 1748.1, y: 1132.7}, {x: 1763.9, y: 1203.1}, '152'),
    '152L': new Stand({x: 1765.5, y: 1128.8}, {x: 1780, y: 1192.1}, '152L'),
    '152R': new Stand({x: 1736, y: 1135.2}, {x: 1749.1, y: 1191.6}, '152R'),
    '154': new Stand({x: 1864, y: 1107}, {x: 1851.2, y: 1046.4}, '154'),
    '158': new Stand({x: 1708, y: 1141.5}, {x: 1695, y: 1077}, '158')
}

const segThreeStands = {
    '153': new Stand({x: 1896, y: 1101}, {x: 1883, y: 1040}, '153')
}

const segSixStands = {
    '553': new Stand({x: 2045.1, y: 1069.2}, {x: 2091, y: 1002.4}, '553')
}

const segSevenStands = {
    '53': new Stand({x: 2236, y: 1028.4}, {x: 2218, y: 953}, '53'),
    '54': new Stand({x: 2189.5, y: 1038.7}, {x: 2172.8, y: 960.6}, '54'),
    '54L': new Stand({x: 2181.9, y: 1040.3}, {x: 2168, y: 978.6}, '54L'),
    '54R': new Stand({x: 2209.4, y: 1034.4}, {x: 2193.8, y: 968.5}, '54R'),
    '101': new Stand({x: 2180.4, y: 1040.3}, {x: 2195.3, y: 1100.4}, '101'),
    '102': new Stand({x: 2219.9, y: 1032}, {x: 2235, y: 1106.9}, '102'),
    '112': new Stand({x: 2113.2, y: 1055}, {x: 2127.1, y: 1115.3}, '112'),
    '113': new Stand({x: 2141.4, y: 1049.2}, {x: 2154.1, y: 1105.9}, '113'),
    '551': new Stand({x: 2142.9, y: 1048.2}, {x: 2129.9, y: 993.9}, '551'),
    '552': new Stand({x: 2118, y: 1054}, {x: 2108.1, y: 998.5}, '552'),
}

const segEightStands = {
    '52': new Stand({x: 2284.3, y: 1017.3}, {x: 2267, y: 939.5}, '52'),
    '52L': new Stand({x: 2264.2, y: 1020.8}, {x: 2252, y: 959.4}, '52L'),
    '52R': new Stand({x: 2291.7, y: 1015.4}, {x: 2277, y: 945.9}, '52R'),
}

const segNineStands = {
    '49': new Stand({x: 2413.2, y: 989}, {x: 2396, y: 910}, '49'),
    '49L': new Stand({x: 2399.8, y: 991.8}, {x: 2386.8, y: 925.5}, '49L'),
    '49R': new Stand({x: 2439.4, y: 983.1}, {x: 2410.8, y: 922.3}, '49R'),
    '50': new Stand({x: 2374.9, y: 997.7}, {x: 2357.9, y: 920.2}, '50'),
    '51': new Stand({x: 2329.6, y: 1008}, {x: 2312.1, y: 928.7}, '51'),
    '51L': new Stand({x: 2321.1, y: 1009.5}, {x: 2307.2, y: 944.5}, '51L'),
    '51R': new Stand({x: 2347.3, y: 1003.4}, {x: 2332.5, y: 934.3}, '51R'),
}

const segTenStands = {
    '34': new Stand({x: 2462.8, y: 976.7}, {x: 2541.3, y: 976.2}, '34'),
    '34L': new Stand({x: 2464.6, y: 953.5}, {x: 2524.8, y: 971.5}, '34L')
}

const segElevenStands = {
    '35R': new Stand({x: 2472.6, y: 931.6}, {x: 2522.7, y: 946}, '35R'),
    '48': new Stand({x: 2475.9, y: 923.5}, {x: 2425.6, y: 861.6}, '48'),
    '48L': new Stand({x: 2468.4, y: 938.2}, {x: 2421, y: 892.5}, '48L'),
    '48R': new Stand({x: 2482, y: 912.1}, {x: 2431.7, y: 862.6}, '48R')
};

const segTwelveStands = {
    '35': new Stand({x: 2489.9, y: 902.7}, {x: 2547.9, y: 953.6}, '35'),
    '35L': new Stand({x: 2506.6, y: 888.7}, {x: 2537.8, y: 940.9}, '35L'),
    '47': new Stand({x: 2504.7, y: 890.8}, {x: 2470.8, y: 824.1}, '47'),
    '47L': new Stand({x: 2499.3, y: 894.5}, {x: 2462.8, y: 845.4}, '47L'),
    '47R': new Stand({x: 2515.3, y: 882.4}, {x: 2488.7, y: 829.9}, '47R'),
};

const segThirteenStands = {
    '36': new Stand({x: 2555, y: 871.1}, {x: 2569.5, y: 940.7}, '36'),
    '36L': new Stand({x: 2576.5, y: 870.9}, {x: 2569.1, y: 926.6}, '36L'),
    '36R': new Stand({x: 2527.9, y: 875.9}, {x: 2554.3, y: 921}, '36R'),
    '46': new Stand({x: 2540.8, y: 871.8}, {x: 2511.5, y: 816.3}, '46'),
};

const segFourteenStands = {
    '37': new Stand({x: 2626.3, y: 883.4}, {x: 2592.5, y: 944.8}, '37')
};

const segSixteenStands = {
    '38': new Stand({x: 2664.8, y: 941.6}, {x: 2606.2, y: 963.6}, '38')
};

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        'L', 
        [
            {x: 1650, y: 1138},
            {x: 1674, y: 1123},
            {x: 1692, y: 1118},
            {x: 1697.4, y: 1156.6},
            {x: 1660, y: 1156}
        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        'L',
        [
            {x: 1692, y: 1118},
            {x: 1873.3, y: 1080.1},
            {x: 1883.6, y: 1132},
            {x: 1698, y: 1170.6},
        ],
        Object.values(segTwoStands)
    ),
    segThree: new TaxiwaySegment(
        points.segTwo.right,
        points.segThree.right,
        'L',
        [
            {x: 1873.3, y: 1080.1},
            {x: 1912.3, y: 1070.4},
            {x: 1922.5, y: 1110.7},
            {x: 1880, y: 1116.7}
        ],
        Object.values(segThreeStands)
    ),
    segFour: new TaxiwaySegment(
        points.segFour.left,
        points.segFour.right,
        'L',
        [
            {x: 1912.3, y: 1070.4},
            {x: 1944.8, y: 1064.2},
            {x: 1965.4, y: 1065.8},
            {x: 1966.5, y: 1066.2},
            {x: 1972.3, y: 1105.2},
            {x: 1922.5, y: 1110.7}
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFour.right,
        points.segFive.right,
        'L',
        [
            {x: 1966.5, y: 1066.2},
            {x: 2005.3, y: 1059.5},
            {x: 2014, y: 1101.8},
            {x: 1972.3, y: 1105.2},
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segSix.left,
        points.segSix.right,
        'L',
        [
            {x: 2005.3, y: 1059.5},
            {x: 2050.9, y: 1047.3},
            {x: 2069.2, y: 1027.7},
            {x: 2079.6, y: 1092.4},
            {x: 2014.8, y: 1106.5},
            {x: 2014, y: 1101.8},
        ],
        Object.values(segSixStands)
    ),
    segSeven: new TaxiwaySegment(
        points.segSeven.left,
        points.segSeven.right,
        'L',
        [
            {x: 2069.5, y: 1033.8},
            {x: 2246.6, y: 996},
            {x: 2258, y: 1054.5},
            {x: 2079.6, y: 1092.4}
        ],
        Object.values(segSevenStands)
    ),
    segEight: new TaxiwaySegment(
        points.segSeven.right,
        points.segEight.right,
        'L',
        [
            {x: 2246.6, y: 996},
            {x: 2287.1, y: 987},
            {x: 2294.7, y: 1028.6},
            {x: 2254.1, y: 1036.6}
        ],
        Object.values(segEightStands)
    ),
    segNine: new TaxiwaySegment(
        points.segEight.right,
        points.segNine.right,
        'L',
        [
            {x: 2287.1, y: 987},
            {x: 2438.2, y: 954.9},
            {x: 2447.1, y: 997.6},
            {x: 2294.7, y: 1028.6},
        ],
        Object.values(segNineStands)
    ),
    segTen: new TaxiwaySegment(
        points.segTen.left,
        points.segTen.right,
        'L',
        [
            {x: 2438.2, y: 954.9},
            {x: 2440.6, y: 942.1},
            {x: 2492.7, y: 954.9},
            {x: 2490.7, y: 978.4},
            {x: 2443.5, y: 982.9}
        ],
        Object.values(segTenStands)
    ),
    segEleven: new TaxiwaySegment(
        points.segEleven.left,
        points.segEleven.right,
        'L',
        [
            {x: 2440.6, y: 942.1},
            {x: 2451.7, y: 908.5},
            {x: 2470.6, y: 883.2},
            {x: 2508.1, y: 923.2},
            {x: 2492.7, y: 954.9},
        ],
        Object.values(segElevenStands)
    ),
    segTwelve: new TaxiwaySegment(
        points.segTwelve.left,
        points.segTwelve.right,
        'L',
        [
            {x: 2470.6, y: 883.2},
            {x: 2513.4, y: 853.1},
            {x: 2535.5, y: 901.8},
            {x: 2508.1, y: 923.2}
        ],
        Object.values(segTwelveStands)
    ),
    segThirteen: new TaxiwaySegment(
        points.segThirteen.left,
        points.segThirteen.right,
        'L',
        [
            {x: 2513.4, y: 853.1},
            {x: 2547.7, y: 843.9},
            {x: 2577.8, y: 855.4},
            {x: 2577.2, y: 897.4},
            {x: 2559, y: 896.3},
            {x: 2535.5, y: 901.8}
        ],
        Object.values(segThirteenStands)
    ),
    segFourteen: new TaxiwaySegment(
        points.segFourteen.left,
        points.segFourteen.right,
        'L',
        [
            {x: 2577.8, y: 855.4},
            {x: 2637.9, y: 875.9},
            {x: 2617.9, y: 911},
            {x: 2605.4, y: 903},
            {x: 2577.2, y: 897.4}
        ],
        Object.values(segFourteenStands)
    ),
    segFifteen: new TaxiwaySegment(
        points.segFifteen.left,
        points.segFifteen.right,
        'L',
        [
            {x: 2637.9, y: 875.9},
            {x: 2662.8, y: 903.3},
            {x: 2627.7, y: 924},
            {x: 2617.9, y: 911}
        ],
        []
    ),
    segSixteen: new TaxiwaySegment(
        points.segFifteen.right,
        points.segSixteen.right,
        'L',
        [
            {x: 2662.8, y: 903.3},
            {x: 2691.5, y: 973.4},
            {x: 2657.1, y: 989.2},
            {x: 2627.7, y: 924}
        ],
        Object.values(segSixteenStands)
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);
joinPoints(points.segThree.right, points.segFour.left);
joinPoints(points.segFive.right, points.segSix.left);
joinPoints(points.segSix.right, points.segSeven.left);
joinPoints(points.segNine.right, points.segTen.left);
joinPoints(points.segTen.right, points.segEleven.left);
joinPoints(points.segEleven.right, points.segTwelve.left);
joinPoints(points.segTwelve.right, points.segThirteen.left);
joinPoints(points.segThirteen.right, points.segFourteen.left);
joinPoints(points.segFourteen.right, points.segFifteen.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 