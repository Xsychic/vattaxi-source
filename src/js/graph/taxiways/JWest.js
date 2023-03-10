import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segWOne: {
        left: new Point({x: 605.1, y: 1831.3}, {name: 'J1'}),
        right: new Point({x: 601.4, y: 1817}, {name: 'J2'})
    },
    segWTwo: {
        right: new Point({x: 599.7, y: 1802.2}, {name: 'J3', gradient: -0.2}),
        // right: new Point({x: 593.9, y: 1788.5})
    },
    segWThree: {
        left: new Point({x: 573.1, y: 1769.2}),
        right: new Point({x: 570.6, y: 1756.1})
    },
    segWFour: {
        left: new Point({x: 613.8, y: 1765.8}),
        right: new Point({x: 638.3, y: 1760.1}, {name: 'J7'})
    },
    segWFive: {
        left: new Point({x: 568.3, y: 1743.5}, {name: 'J4'}),
        right: new Point({x: 566.6, y: 1729.3})
    },
    segWSix: {
        left: new Point({x: 572.7, y: 1719.4}),
        right: new Point({x: 662.2, y: 1697.4})
    },
    segWSeven: {
        left: new Point({x: 679, y: 1687.3}),
        right: new Point({x: 706.1, y: 1681.8}, {name: 'J5'})
    },
    segWEight: {
        right: new Point({x: 871.4, y: 1645.7})
    },
    segWNine: {
        right: new Point({x: 917, y: 1637.2})
    },
    segWTen: {
        left: new Point({x: 958, y: 1627.5}, {name: 'J6'}),
        right: new Point({x: 1354.3, y: 1541.5}),
    },
    segWEleven: {
        left: new Point({x: 1402, y: 1532}),
        right: new Point({x: 1473.2, y: 1516.7})
    },
    segWTwelve: {
        left: new Point({x: 1518.1, y: 1506.3}),
        right: new Point({x: 1735.7, y: 1461.2})
    }
}


// taxiway segments
export const taxiways = {
    segWOne: new TaxiwaySegment(
        points.segWOne.left,
        points.segWOne.right,
        'J',
        [
            {x: 628.6, y: 1892},
            {x: 639.7, y: 1856.5},

            {x: 628.2, y: 1809},
            {x: 574.5, y: 1820.5},

            {x: 597.8, y: 1862.7}
        ],
        []
    ),
    segWTwo: new TaxiwaySegment(
        points.segWOne.right,
        points.segWTwo.right,
        'J',
        [
            {x: 574.5, y: 1820.5},

            {x: 557, y: 1780.1},
            {x: 621.4, y: 1770},

            {x: 628.2, y: 1809},
        ],
        []
    ),
    segWThree: new TaxiwaySegment(
        points.segWThree.left,
        points.segWThree.right,
        'J',
        [
            {x: 557, y: 1780.1},

            {x: 549.2, y: 1757.7},
            {x: 590, y: 1750.7},

            {x: 594, y: 1773.6},
        ],
        []
    ),

    segWFour: new TaxiwaySegment(
        points.segWFour.left,
        points.segWFour.right,
        'J',
        [
            {x: 621.4, y: 1770},
            {x: 594, y: 1773.6},
            {x: 590, y: 1750.7},

            {x: 638.1, y: 1741.2},
            {x: 645.9, y: 1778.7},

            {x: 628.7, y: 1781.8}
        ],
        []
    ),

    segWFive: new TaxiwaySegment(
        points.segWFive.left,
        points.segWFive.right,
        'J',
        [
            {x: 549.2, y: 1757.7},

            {x: 536.4, y: 1702.9},
            {x: 586.1, y: 1729.5},

            {x: 590, y: 1750.7},
        ],
        []
    ),
    segWSix: new TaxiwaySegment(
        points.segWSix.left,
        points.segWSix.right,
        'J',
        [
            {x: 536.4, y: 1702.9},

            {x: 665.4, y: 1669.2},
            {x: 669.1, y: 1703.3},
            {x: 651.7, y: 1714.7},

            {x: 586.1, y: 1729.5},
        ],
        []
    ),
    segWSeven: new TaxiwaySegment(
        points.segWSeven.left,
        points.segWSeven.right,
        'J',
        [
            {x: 665.4, y: 1669.2},

            {x: 700.8, y: 1656.7},
            {x: 709.7, y: 1698.9},

            {x: 680.6, y: 1703.3},
            {x: 669.1, y: 1703.3},
        ],
        []
    ),
    segWEight: new TaxiwaySegment(
        points.segWSeven.right,
        points.segWEight.right,
        'J',
        [
            {x: 700.8, y: 1656.7},
            {x: 709.7, y: 1698.9},
            {x: 874.3, y: 1663.6},
            {x: 866.6, y: 1615.7},
        ],
        []
    ),
    segWNine: new TaxiwaySegment(
        points.segWEight.right,
        points.segWNine.right,
        'J',
        [
            {x: 929.3, y: 1600.1},

            {x: 866.6, y: 1615.7},
            {x: 874.3, y: 1663.6},

            {x: 939.1, y: 1650.5},
        ],
        []
    ),
    segWTen: new TaxiwaySegment(
        points.segWTen.left,
        points.segWTen.right,
        'J',
        [
            {x: 1376.8, y: 1512},
            {x: 929.3, y: 1600.1},
            {x: 939.1, y: 1650.5},
            {x: 1381.3, y: 1553},
        ],
        []
    ),
    segWEleven: new TaxiwaySegment(
        points.segWEleven.left,
        points.segWEleven.right,
        'J',
        [
            {x: 1498.7, y: 1491},
            {x: 1376.8, y: 1512},
            {x: 1381.3, y: 1553},
            {x: 1505.8, y: 1531.2},
        ],
        []
    ),
    segWTwelve: new TaxiwaySegment(
        points.segWTwelve.left, 
        points.segWTwelve.right, 
        'J', 
        [
            {x: 1744.7, y: 1436.1},
            {x: 1754.4, y: 1474.3},
            {x: 1505.8, y: 1531.2},
            {x: 1498.7, y: 1491}
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segWTwo.right, points.segWThree.left);
joinPoints(points.segWTwo.right, points.segWFour.left);
joinPoints(points.segWThree.right, points.segWFour.left);
joinPoints(points.segWThree.right, points.segWFive.left);
joinPoints(points.segWFive.right, points.segWSix.left);
joinPoints(points.segWSix.right, points.segWSeven.left);

joinPoints(points.segWNine.right, points.segWTen.left);
joinPoints(points.segWTen.right, points.segWEleven.left);
joinPoints(points.segWEleven.right, points.segWTwelve.left);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 