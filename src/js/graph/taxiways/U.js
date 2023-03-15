import Point from '@/js/graph/Point';
import Stand from '@/js/graph/Stand';
import { joinPoints } from '@/js/graph/tools';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// points for taxiway segments
const points = {
    segOne: {
        upper: new Point({x: 1302.5, y: 1180.7}),
        lower: new Point({x: 1369.5, y: 1500.8}, {name: 'U1'})
    },
    segTwo: {
        lower: new Point({x: 1373.1, y: 1519})
    },
}

// stands for taxiway segments
const segOneStands = {
    '230': new Stand({x: 1363.2, y: 1472.2}, {x: 1435.8, y: 1455.7}, '230'),
    '230L': new Stand({x: 1359.9, y: 1455.7}, {x: 1419.1, y: 1444.6}, '230L'),
    '230R': new Stand({x: 1366.1, y: 1484}, {x: 1435.3, y: 1467.9}, '230R'),
    '231': new Stand({x: 1351.5, y: 1414.2}, {x: 1424.7, y: 1400.8}, '231'),
    '231L': new Stand({x: 1349.1, y: 1401.5}, {x: 1408.9, y: 1389.2}, '231L'),
    '231R': new Stand({x: 1353.8, y: 1425.5}, {x: 1423.1, y: 1414.1}, '231R'),
    '232': new Stand({x: 1340.2, y: 1360.5}, {x: 1412.5, y: 1346.5}, '232'),
    '232L': new Stand({x: 1337.3, y: 1344.5}, {x: 1396.7, y: 1334.3}, '232L'),
    '232R': new Stand({x: 1342.5, y: 1373.7}, {x: 1411.4, y: 1358.7}, '232R'),
    '233': new Stand({x: 1328.4, y: 1305.8}, {x: 1400.3, y: 1291.6}, '233'),
    '233L': new Stand({x: 1326.5, y: 1291.7}, {x: 1385.5, y: 1279.9}, '233L'),
    '233R': new Stand({x: 1330.7, y: 1317.1}, {x: 1399.1, y: 1305.5}, '233R'),
    '234': new Stand({x: 1317.1, y: 1251.6}, {x: 1395.3, y: 1234.8}, '234'),
    '234L': new Stand({x: 1313.8, y: 1234.6}, {x: 1372.8, y: 1226}, '234L'),
    '234R': new Stand({x: 1319.9, y: 1265.3}, {x: 1394.9, y: 1248.2}, '234R'),
    '235': new Stand({x: 1305.7, y: 1196}, {x: 1384.4, y: 1181.9}, '235'),
    '235L': new Stand({x: 1302.9, y: 1182.3}, {x: 1361.4, y: 1171.5}, '235L'),
    '235R': new Stand({x: 1308.1, y: 1208.2}, {x: 1383, y: 1194.6}, '235R'),
}


// taxiway segments
export const taxiways = {
    segOne: new TaxiwaySegment(
        points.segOne.upper, 
        points.segOne.lower, 
        'U', 
        [
            {x: 1328.4, y: 1162},
            {x: 1399.5, y: 1492.9},
            {x: 1349.1, y: 1504.7},
            {x: 1282.2, y: 1173.4}
        ],
        Object.values(segOneStands)
    ),
    segTwo: new TaxiwaySegment(
        points.segOne.lower,
        points.segTwo.lower,
        'U',
        [
            {x: 1399.5, y: 1492.9},
            {x: 1396.2, y: 1525},
            {x: 1351.9, y: 1529.7},
            {x: 1349.1, y: 1504.7},
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