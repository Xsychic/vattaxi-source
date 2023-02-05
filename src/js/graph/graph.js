import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

/*
    Point
        int x
        int y
        String? holdingPoint
        Point[] adjoiningPoints

        constructor(int x, int y, String holdingPoint = null)
        
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

let graph;

// points for QA sections
const QAPoints = {
    segmentOne: {
        upper: new Point(1956, 641),
        lower: new Point(1991, 808, 'a2')
    }
}

// stands for QA sections
const QAStands = {
    574: new Stand({x: 1956, y: 644}, {x: 2019, y: 631})
}

// taxiway segments for QA
const QA = {
    segmentOne: new TaxiwaySegment(
        QAPoints.segmentOne.lower, 
        QAPoints.segmentOne.upper, 
        'QA', 
        [
            {x: 1925, y: 638},
            {x: 1984, y: 628},
            {x: 2024, y: 818},
            {x: 1971, y: 830},
            {x: 1962, y: 806}
        ],
        [
            QAStands[574]
        ]
    ),
    
} 

Object.values(QAPoints.segmentOne).forEach((point) => {
    point.taxiwaySegment = QA.segmentOne
});

graph = QAPoints.segmentOne.upper;

export default graph;