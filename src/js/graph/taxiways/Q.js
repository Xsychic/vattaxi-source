import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import QX from '@/js/graph/taxiways/QX';
import joinPoints from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

/*
    Point
        int x
        int y
        String? holdingPoint
        Point[] adjoiningPoints

        constructor(Coord c, String holdingPoint = null)
        
        addAdjoiningPoint(Point p)


    Stand
        Coord joinPoint
        Coord stopPoint
        String name


    TaxiwaySegment
        String name
        Point[] points : points passed as first two args to constructor
        Coord[] bounds
        Stand[] stands

        constructor(Point pOne, Point pTwo, String name, Coord[] bounds, Stand[] stands)
*/

// points for QA sections
const points = {
    segOne: {
        upper: new Point({x: 1945, y: 852}),
        lower: new Point({x: 1977, y: 1007})
    },
    segTwo: {
        upper: new Point({x: 1977, y: 1007}),
        lower: new Point({x: 1984.5, y: 1043})
    },
    segThree: {
        upper: new Point({x: 1984.5, y: 1043}),
        lower: new Point({x: 1988, y: 1062})
    },
    segFour: {
        upper: new Point({x: 1957, y: 1103}),
        lower: new Point({x: 1982, y: 1221})
    },
    segFive: {
        upper: new Point({x: 1982, y: 1221}),
        lower: new Point({x: 1990, y: 1255})
    },
    segSix: {
        upper: new Point({x: 1990, y: 1255}),
        lower: new Point({x: 2014, y: 1368}, 'Q1')
    },
    segSeven: {
        upper: new Point({x: 2014, y: 1368}),
        lower: new Point({x: 2017, y: 1384})
    },
    segEight: {
        upper: new Point({x: 2017, y: 1384}),
        lower: new Point({x: 2027, y: 1428})
    }
}

// stands for QA sections
const segOneStands = {
    '68': new Stand({x: 1945, y: 852}, {x: 1912, y: 800.5}, '68'),
}

// taxiway segments for QA
const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.lower, 
        points.segOne.upper, 
        'Q', 
        [
            {x: 1925, y: 833},
            {x: 1938, y: 817},
            {x: 1961, y: 853},
            {x: 1992, y: 999},
            {x: 1992, y: 1004},
            {x: 1965, y: 1010},
            {x: 1934, y: 850}
        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segTwo.lower,
        points.segTwo.upper,
        'Q',
        [
            {x: 1965, y: 1010},
            {x: 1992, y: 1004},
            {x: 1999, y: 1042},
            {x: 1971, y: 1044}
        ],
        []
    ),
    segThree: new TaxiwaySegment(
        points.segThree.lower,
        points.segThree.upper,
        'Q',
        [
            {x: 1971, y: 1044},
            {x: 1999, y: 1042},
            {x: 2012, y: 1092},
            {x: 1974, y: 1106},
            {x: 1940, y: 1108},
            {x: 1946, y: 1078},
            {x: 1970, y: 1066}
        ],
        []
    ),
    segFour: new TaxiwaySegment(
        points.segFour.lower,
        points.segFour.upper,
        'Q',
        [
            {x: 1939, y: 1109},
            {x: 1951, y: 1115},
            {x: 1957, y: 1127},
            {x: 1950, y: 1153},
            {x: 1966, y: 1223},
            {x: 1994, y: 1214},
            {x: 1974, y: 1105}
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFive.lower,
        points.segFive.upper,
        'Q',
        [
            {x: 1966, y: 1223},
            {x: 1994, y: 1214},
            {x: 2006, y: 1252},
            {x: 1974, y: 1260}
        ],
        []
    ),
    segSix: new TaxiwaySegment(
        points.segSix.lower,
        points.segSix.upper,
        'Q',
        [
            {x: 2006, y: 1252},
            {x: 1974, y: 1260},
            {x: 1995, y: 1373},
            {x: 2027, y: 1365}
        ],
        []
    ),
    segSeven: new TaxiwaySegment(
        points.segSeven.lower,
        points.segSeven.upper,
        'Q',
        [
            {x: 1995, y: 1373},
            {x: 2027, y: 1365},
            {x: 2030, y: 1381.5},
            {x: 1997, y: 1389.5}
        ],
        []
    ),    
    segEight: new TaxiwaySegment(
        points.segEight.lower,
        points.segEight.upper,
        'Q',
        [
            {x: 2030, y: 1382},
            {x: 2038, y: 1429},
            {x: 2008, y: 1432},
            {x: 1997, y: 1389.5}
        ],
        []
    )
} 

// link points
joinPoints(points.segOne.upper, QX.QC.left);
joinPoints(points.segOne.lower, QX.QB.left);
joinPoints(points.segOne.lower, points.segTwo.upper);
joinPoints(points.segTwo.lower, points.segThree.upper);
joinPoints(points.segThree.upper, QX.QB.left);
joinPoints(points.segThree.lower, points.segFour.upper);
joinPoints(points.segFour.lower, points.segFive.upper);
joinPoints(points.segFive.lower, points.segSix.upper);
joinPoints(points.segSix.lower, points.segSeven.upper);
joinPoints(points.segSeven.lower, points.segEight.upper);

// add taxiway reference to point instances in QA
Object.keys(taxiways).forEach((segment) => {
    Object.values(points[segment]).forEach((point) => {
        point.taxiwaySegment = taxiways[segment]
    });
});
 

export default points;