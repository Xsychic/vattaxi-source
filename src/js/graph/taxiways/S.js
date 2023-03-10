import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 1695.8, y: 1161.5}),
        lower: new Point({x: 1750.9, y: 1419.5}, {name: 'S1'})
    },
    segTwo: {
        lower: new Point({x: 1753.2, y: 1432})
    },
}

// stands for taxiway segments
const segOneStands = {
    '170': new Stand({x: 1745.2, y: 1392.9}, {x: 1668.1, y: 1411.1}, '170'),
    '171': new Stand({x: 1745.2, y: 1392.9}, {x: 1823.4, y: 1377.3}, '171'),
    '171L': new Stand({x: 1741, y: 1373.9}, {x: 1802.9, y: 1362.5}, '171L'),
    '171R': new Stand({x: 1747.1, y: 1405}, {x: 1818.1, y: 1387.2}, '171R'),
    '172': new Stand({x: 1735.7, y: 1348.4}, {x: 1657.4, y: 1364.4}, '172'),
    '172L': new Stand({x: 1739.5, y: 1365.5}, {x: 1678.3, y: 1378.4}, '172L'),
    '172R': new Stand({x: 1733, y: 1337}, {x: 1663.5, y: 1353.4}, '172R'),
    '173': new Stand({x: 1734.9, y: 1347.3}, {x: 1813.9, y: 1330.6}, '173'),
    '174': new Stand({x: 1724.7, y: 1300.9}, {x: 1646.8, y: 1318.4}, '174'),
    '175': new Stand({x: 1725.4, y: 1300.2}, {x: 1803.3, y: 1285.4}, '175'),
    '175L': new Stand({x: 1721.3, y: 1280.4}, {x: 1782, y: 1269.8}, '175L'),
    '175R': new Stand({x: 1727.3, y: 1311.6}, {x: 1797.2, y: 1296.8}, '175R'),
    '176': new Stand({x: 1715.2, y: 1254.6}, {x: 1636.9, y: 1272.8}, '176'),
    '176L': new Stand({x: 1719, y: 1273.2}, {x: 1658.2, y: 1286.5}, '176L'),
    '176R': new Stand({x: 1712.9, y: 1244}, {x: 1643, y: 1261.4}, '176R'),
    '177': new Stand({x: 1715.2, y: 1253.5}, {x: 1793.4, y: 1239}, '177'),
    '178': new Stand({x: 1703.4, y: 1201.4}, {x: 1633.5, y: 1218.1}, '178'),
    '180': new Stand({x: 1695.8, y: 1165.3}, {x: 1634.7, y: 1178.6}, '180'),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'S', 
        [
            {x: 1697.4, y: 1156.6},
            {x: 1729.2, y: 1172.2},
            {x: 1781.7, y: 1414.1},
            {x: 1722.8, y: 1426.3},
            {x: 1664.3, y: 1156.6}
        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segOne.lower,
        points.segTwo.lower,
        'S',
        [
            {x: 1781.7, y: 1414.1},
            {x: 1784.3, y: 1430.9},
            {x: 1727.3, y: 1441.5},
            {x: 1722.8, y: 1426.3},
        ],
        []
    ),
}


// add taxiway reference to point instances in QA
Object.values(taxiways).forEach((segment) => {
    segment.points.forEach((point) => {
        point.addTaxiwaySegment(segment);
    });
});
 

export default points; 