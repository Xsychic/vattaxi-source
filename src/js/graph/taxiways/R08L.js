import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        left: new Point({x: 649.1, y: 1757}),
        right: new Point({x: 695, y: 1747.4})
    },
    segTwo: {
        left: new Point({x: 730.8, y: 1740}),
        right: new Point({x: 754.2, y: 1735})
    },
    segThree: {
        left: new Point({x: 849.6, y: 1714.4}),
        right: new Point({x: 870.5, y: 1709.3})
    },
    segFour: {
        left: new Point({x: 885.6, y: 1707.2}),
        right: new Point({x: 936.4, y: 1695.5})
    },
    segFive: {
        left: new Point({x: 944.6, y: 1693.7}),
        right: new Point({x: 1410.7, y: 1593.1})
    },
    segSix: {
        left : new Point({x: 1487, y: 1576.4}),
        right: new Point({x: 1527.5, y: 1567.1})
    },
    segSeven: {
        right: new Point({x: 1954.1, y: 1475.2})
    },
    segEight: {
        left: new Point({x: 1983.8, y: 1469.1}),
        right: new Point({x: 1998.6, y: 1465.2})
    },
    segNine: {
        left: new Point({x: 2015, y: 1462.6}),
        right: new Point({x: 2053.9, y: 1454.1})
    },
    segTen: {
        right: new Point({x: 2142.2, y: 1435.4})
    },
    segEleven: {
        upper: new Point({x: 664.9, y: 1703.5}),
        lower: new Point({x: 664.6, y: 1718.5})
    },
    segTwelve: {
        upper: new Point({x: 671.9, y: 1737.8}),
        lower: new Point({x: 680.4, y: 1744.6})
    }

}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.left, 
        points.segOne.right, 
        '08L/26R', 
        [
            {x: 626.2, y: 1744},

            {x: 729, y: 1717.6},
            {x: 741.7, y: 1760.3},

            {x: 634.4, y: 1779}
        ],
        []
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.left,
        points.segTwo.right,
        '08L/26R',
        [
            {x: 729, y: 1717.6},

            {x: 797.7, y: 1703.4},
            {x: 804.4, y: 1746.4},

            {x: 741.7, y: 1760.3},
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.left,
        points.segThree.right,
        '08L/26R',
        [
            {x: 797.7, y: 1703.4},
            
            {x: 871.1, y: 1687.2},
            {x: 874.7, y: 1730.9},

            {x: 804.4, y: 1746.4},
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.left,
        points.segFour.right,
        '08L/26R',
        [
            {x: 871.1, y: 1687.2},

            {x: 933.4, y: 1673.6},
            {x: 944.2, y: 1717.1},

            {x: 874.7, y: 1730.9},
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.left,
        points.segFive.right,
        '08L/26R',
        [
            {x: 933.4, y: 1673.6},

            {x: 1434.9, y: 1563.2},
            {x: 1443.1, y: 1609.1},

            {x: 944.2, y: 1717.1},
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segSix.left,
        points.segSix.right,
        '08L/26R',
        [
            {x: 1434.9, y: 1563.2},

            {x: 1524, y: 1545.5},
            {x: 1534.1, y: 1589.1},

            {x: 1443.1, y: 1609.1},
        ],
        []
    ),
    segSeven: new TaxiwaySegment(
        points.segSix.right,
        points.segSeven.right,
        '08L/26R',
        [
            {x: 1524, y: 1545.5},

            {x: 1964.6, y: 1452.8},
            {x: 1970.5, y: 1493},

            {x: 1534.1, y: 1589.1},
        ],
        []
    ),
    segEight: new TaxiwaySegment(
        points.segEight.left,
        points.segEight.right,
        '08L/26R',
        [
            {x: 1964.6, y: 1452.8},

            {x: 2001, y: 1444.1},
            {x: 2008.8, y: 1484.9},

            {x: 1970.5, y: 1493},
        ],
        []
    ),
    segNine: new TaxiwaySegment(
        points.segNine.left,
        points.segNine.right,
        '08L/26R',
        [
            {x: 2001, y: 1444.1},

            {x: 2049.8, y: 1434},
            {x: 2057.4, y: 1474.6},            

            {x: 2008.8, y: 1484.9},
        ],
        []
    ),
    segTen: new TaxiwaySegment(
        points.segNine.right,
        points.segTen.right,
        '08L/26R',
        [
            {x: 2049.8, y: 1434},

            {x: 2180.4, y: 1405.9},
            {x: 2185.7, y: 1448.8},

            {x: 2057.4, y: 1474.6}, 
        ],
        []
    ),
    segEleven: new TaxiwaySegment(
        points.segEleven.upper,
        points.segEleven.lower,
        '08L/26R',
        [
            {x: 679.2, y: 1698.5},

            {x: 681.9, y: 1724.8},
            {x: 654.9, y: 1732},

            {x: 654.9, y: 1694.5}
        ],
        []
    ),
    segTwelve: new TaxiwaySegment(
        points.segTwelve.upper,
        points.segTwelve.lower,
        '08L/26R',
        [
            {x: 681.9, y: 1724.8},

            {x: 701.9, y: 1749},
            {x: 671.2, y: 1755.7},

            {x: 654.9, y: 1732},
        ],
        []
    )
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.right, points.segTwo.left);
joinPoints(points.segOne.right, points.segTwelve.lower);
joinPoints(points.segTwo.right, points.segThree.left);
joinPoints(points.segThree.right, points.segFour.left);
joinPoints(points.segFour.right, points.segFive.left);
joinPoints(points.segFive.right, points.segSix.left);
joinPoints(points.segSeven.right, points.segEight.left);
joinPoints(points.segEight.right, points.segNine.left);
joinPoints(points.segEleven.lower, points.segTwelve.upper);


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 