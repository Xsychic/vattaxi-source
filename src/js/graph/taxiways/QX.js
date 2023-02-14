import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 1956, y: 641}),
        lower: new Point({x: 1991, y: 807})
    },
    segTwo: {
        lower: new Point({x: 1999, y: 844})
    },
    segThree: {
        lower: new Point({x: 2032, y: 996})
    },
    segFour: {
        lower: new Point({x: 2039, y: 1029})
    },
    segFive: {
        lower: new Point({x: 2043, y: 1050})
    },
    QB: {
        left: new Point({x: 2001, y: 1020.5}),
        right: new Point({x: 2016, y: 1018})
    },
    QC: {
        left: new Point({x: 1951, y: 838}),
        right: new Point({x: 1976, y: 829})
    }
} 

// stands for taxiway segments
const segOneStands = {
    '64': new Stand({x: 1958, y: 655}, {x: 1888, y: 669}, '64'),
    '64l': new Stand({x: 1962, y: 675}, {x: 1905, y: 686}, '64l'),
    '64r': new Stand({x: 1956, y: 644}, {x: 1891, y: 656}, '64r'),
    '65': new Stand({x: 1968, y: 703}, {x: 1897, y: 718}, '65'),
    '66': new Stand({x: 1979, y: 750}, {x: 1908, y: 765}, '66'),
    '66l': new Stand({x: 1981, y: 757}, {x: 1915, y: 771}, '66l'),
    '66r': new Stand({x: 1976, y: 731}, {x: 1911, y: 744}, '66r'),
    '67': new Stand({x: 1988, y: 793}, {x: 1930, y: 794}, '67'),
    '565': new Stand({x: 1987, y: 786}, {x: 2063, y: 771}, '565'),
    '566': new Stand({x: 1986, y: 780}, {x: 2064, y: 765}, '566'),
    '567': new Stand({x: 1981, y: 759}, {x: 2050, y: 744}, '567'),
    '568': new Stand({x: 1977, y: 737}, {x: 2055, y: 721}, '568'),
    '569': new Stand({x: 1975, y: 730}, {x: 2039, y: 717}, '569'),
    '570': new Stand({x: 1967, y: 699}, {x: 2043, y: 684}, '570'),
    '571': new Stand({x: 1966, y: 693}, {x: 2044, y: 678}, '571'),
    '572': new Stand({x: 1962, y: 671}, {x: 2031, y: 658}, '572'),
    '573': new Stand({x: 1957, y: 650}, {x: 2035, y: 634}, '573'),
    '574': new Stand({x: 1956, y: 644}, {x: 2019, y: 631}, '574')
}

const segTwoStands = {
    '563': new Stand({x: 1995, y: 826}, {x: 2073, y: 808}, '563'),
    '564': new Stand({x: 1994, y: 820}, {x: 2057, y: 805}, '564')
}

const segThreeStands = {
    '554': new Stand({x: 2031, y: 990}, {x: 2094, y: 978}, '554'),
    '555': new Stand({x: 2026, y: 961}, {x: 2093, y: 947}, '555'),
    '557': new Stand({x: 2018, y: 934}, {x: 2086, y: 918}, '557'),
    '558': new Stand({x: 2015, y: 919}, {x: 2097, y: 901}, '558'),
    '559': new Stand({x: 2012, y: 906}, {x: 2075, y: 892}, '59'),
    '560': new Stand({x: 2006, y: 876}, {x: 2081, y: 860}, '560'),
    '561': new Stand({x: 2005, y: 869}, {x: 2082, y: 853}, '561'),
    '562': new Stand({x: 2000, y: 847}, {x: 2069, y: 832}, '562')
}

// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'QA', 
        [
            {x: 1925, y: 638},
            {x: 1984, y: 628},
            {x: 2021, y: 801},
            {x: 1966, y: 813},
            {x: 1962, y: 806}
        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segOne.lower,
        points.segTwo.lower,
        'QA',
        [
            {x: 2021, y: 801},
            {x: 2028, y: 837},
            {x: 1992, y: 846},
            {x: 1983, y: 809}
        ],
        Object.values(segTwoStands)
    ),
    segThree: new TaxiwaySegment( 
        points.segTwo.lower,
        points.segThree.lower,
        'QA',
        [
            {x: 2028, y: 837},
            {x: 2061, y: 991},
            {x: 2012, y: 999},
            {x: 1979, y: 849}
        ],
        Object.values(segThreeStands)
    ),
    segFour: new TaxiwaySegment(
        points.segThree.lower,
        points.segFour.lower,
        'QA',
        [
            {x: 2061, y: 991},
            {x: 2069, y: 1023},
            {x: 2027, y: 1033},
            {x: 2023, y: 997}
        ],
        []
    ),
    segFive: new TaxiwaySegment(
        points.segFour.lower,
        points.segFive.lower,
        'QA',
        [
            {x: 2069, y: 1023},
            {x: 2069, y: 1028},
            {x: 2051, y: 1048},
            {x: 2026, y: 1054},
            {x: 2027, y: 1033},
        ],
        []
    ),
    QB: new TaxiwaySegment(
        points.QB.left,
        points.QB.right,
        'QB',
        [
            {x: 2023, y: 997},
            {x: 2027, y: 1033},
            {x: 2026, y: 1037},
            {x: 1999, y: 1042},
            {x: 1992, y: 999},
            {x: 2012, y: 999},
        ],
        []
    ),
    QC: new TaxiwaySegment(
        points.QC.left,
        points.QC.right,
        'QC',
        [
            {x: 1983, y: 809},
            {x: 1992, y: 846},
            {x: 1961, y: 853},
            {x: 1938, y: 817},
            {x: 1962, y: 806},
            {x: 1966, y: 813},
        ],
        []
    )
    
}

// link adjoining (non-adjacent segment) points
joinPoints(points.segOne.lower, points.QC.right);
joinPoints(points.segTwo.lower, points.QC.right);
joinPoints(points.QB.right, points.segThree.lower);
joinPoints(points.QB.right, points.segFour.lower);

// add taxiway reference to point instances
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});


export default points;