import '@/js/graph/index'; // must be imported to link pTwys

import Stand from '@/js/graph/Stand';


import B, { taxiways as bTwys } from '@/js/graph/taxiways/B';
import K, { taxiways as kTwys } from '@/js/graph/taxiways/K';
import L, { taxiways as lTwys } from '@/js/graph/taxiways/L';
import N, { taxiways as nTwys } from '@/js/graph/taxiways/N';
import P, { taxiways as pTwys } from '@/js/graph/taxiways/P';
import T, { taxiways as tTwys } from '@/js/graph/taxiways/T';
import W, { taxiways as wTwys } from '@/js/graph/taxiways/W';
import Y, { taxiways as yTwys } from '@/js/graph/taxiways/Y';
import rwy, { taxiways as rwySeg } from '@/js/graph/taxiways/R26L';

import { parseRoute } from '@/js/map/mapLogic';
import { traversePointHelper } from '@/js/map/graphTraversalAlgorithms/dfs';


test('placeholder', () => {
    expect(true).toStrictEqual(true)
})

describe('traversePointHelper', () => {
    test('route terminating with named holding point', () => {
        // start at top of P
        const initialPoint = P.segOne.upper;
        const route = 'P /B1'.split(' ');

        const path = traversePointHelper(initialPoint, route, []);

        const expectedPath = [
            initialPoint,
            pTwys.segOne,
            P.segOne.lower,
            P.segTwo.upper,
            pTwys.segTwo,
            P.segTwo.lower,
            P.segThree.upper,
            pTwys.segThree,
            P.segThree.lower,
            P.segFour.upper,
            pTwys.segFour,
            P.segFour.lower,
            pTwys.segFive,
            P.segFive.lower,
            P.segSix.upper,
            pTwys.segSix,
            P.segSix.lower,
            pTwys.segSeven,
            P.segSeven.lower,
            P.segEight.upper,
            pTwys.segEight,
            P.segEight.lower,
            P.segNine.upper,
            pTwys.segNine,
            P.segNine.lower
        ];


        expect(path).toStrictEqual(expectedPath);     
    });

    test('route terminating with hold short', () => {
        // start at top of P
        const initialPoint = P.segOne.upper;
        const route = 'P /K'.split(' ');
        const path = traversePointHelper(initialPoint, route, []);

        const expectedPath = [
            initialPoint,
            pTwys.segOne,
            P.segOne.lower,
        ];

        expect(path).toStrictEqual(expectedPath);     
    });

    test('route terminating with stand', () => {
        // start at point on L abeam s112
        const initialPoint = L.segSeven.left;
        const route = 'L P K S103'.split(' ');
        const path = traversePointHelper(initialPoint, route, []);

        const expectedPath = [
            initialPoint,
            lTwys.segSeven,
            L.segSeven.right,
            P.segOne.upper,
            pTwys.segOne,
            P.segOne.lower,
            P.segTwo.upper,
            K.segTwo.right,
            new Stand({x: 2276.7, y: 1173.9}, {x: 2245.8, y: 1123.9}, '103')
        ];

        expect(path).toStrictEqual(expectedPath);     
    });

    test('route terminating with maintenance area', () => {
        // start at point at bottom of T
        const initialPoint = T.segThree.lower;
        const route = 'T MA2'.split(' ');
        const path = traversePointHelper(initialPoint, route, []);

        const expectedPath = [
            initialPoint,
            tTwys.segThree,
            T.segTwo.lower,
            tTwys.segTwo,
            T.segTwo.upper,
            T.segOne.lower,
            new Stand({x: 1481.9, y: 1296.1}, {x: 1516.1, y: 1288.9}, 'MA2')
        ];

        expect(path).toStrictEqual(expectedPath);     
    });

    test('route terminating at named hp at first point on new twy', () => {
        // Start at point on Y at bottom of right most segment
        const initialPoint = Y.segNine.left;
        const route = 'Y /W1'.split(' ');
        const path = traversePointHelper(initialPoint, route, []);

        const expectedPath = [
            initialPoint,
            yTwys.segNine,
            Y.segNine.right,
            W.segFive.lower
        ];

        expect(path).toStrictEqual(expectedPath);     
    });

    test('invalid route', () => {
        // start at point on L abeam s112
        const initialPoint = L.segSeven.left;
        const route = 'L K S103'.split(' ');
        const path = traversePointHelper(initialPoint, route, []);

        expect(path).toBe(false);     
    });

    test('no route passed', () => {
        // Starting point is irrelevant
        const initialPoint = Y.segNine.left;
        const path = traversePointHelper(initialPoint, [], []);

        expect(path).toStrictEqual([ initialPoint ]);     
    });
});


describe('parseRoute', () => {
    test('wrong point within first segment tested', () => {
                // start at point on L abeam s112
                const initialPoint = L.segSeven.left;
                const route = 'L P K S103'.split(' ');
                const allSegments = {
                    value: []
                };
                const pxCoords = {x: 2171.1, y: 1039.6};
                const path = parseRoute(initialPoint, route, lTwys.segSeven, allSegments, pxCoords);
        
                const expectedPath = [
                    L.segSeven.right,
                    P.segOne.upper,
                    pTwys.segOne,
                    P.segOne.lower,
                    P.segTwo.upper,
                    K.segTwo.right,
                    new Stand({x: 2276.7, y: 1173.9}, {x: 2245.8, y: 1123.9}, '103')
                ];

                const expectedSegments = [
                    lTwys.segSeven,
                    pTwys.segOne,
                ]

                expect(path).toStrictEqual(expectedPath);    
                expect(allSegments.value).toEqual(expectedSegments);
    });

    test('no route found', () => {
        // start at point on L abeam s112
        const initialPoint = L.segSeven.left;
        const route = 'L P J S103'.split(' ');
        const allSegments = {
            value: []
        };
        const pxCoords = {x: 2171.1, y: 1039.6};
        const path = parseRoute(initialPoint, route, lTwys.segSeven, allSegments, pxCoords);

        const expectedPath = false;
        const expectedSegments = [];

        expect(path).toStrictEqual(expectedPath);    
        expect(allSegments.value).toEqual(expectedSegments);
    });

    test('first two segments of route double back on each other', () => {
        // start at point on L abeam s112
        const initialPoint = rwy.segOne.right;
        const route = '08R/26L B /B1'.split(' ');
        const allSegments = {
            value: []
        };
        const pxCoords = {x: 2401.6, y: 1504.8};
        const path = parseRoute(initialPoint, route, lTwys.segSeven, allSegments, pxCoords);

        const expectedPath = [
            B.segOne.lower,
            bTwys.segOne,
            B.segOne.upper,
            N.segEight.lower
        ];

        const expectedSegments = [
            bTwys.segOne
        ]

        expect(path).toStrictEqual(expectedPath);    
        expect(allSegments.value).toEqual(expectedSegments);
    });
});