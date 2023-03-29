import '@/js/graph/index';
import { checkSegment } from '@/js/map/segmentLogic';
import { taxiways as P } from '@/js/graph/taxiways/P';
import { taxiways as Y } from '@/js/graph/taxiways/Y';
import { taxiways as Z } from '@/js/graph/taxiways/Z';

describe('checkSegment', () => {

    test('only one possible segment', () => {
        const coords = {x: 2278.5, y: 1080.6};
        const currentSegment = P.segOne;
        const routeStringArr = 'P L /Q'.split(' ');

        const { 
            segment, 
            implicitTaxiway, 
            pathFound
        } = checkSegment(currentSegment, coords, routeStringArr);

        expect(implicitTaxiway).toBe(false);
        expect(pathFound).toBe(true);
        expect(segment).toBe(P.segOne);
    });

    test('one of two possible segments with implicit first taxiway', () => {
        const coords = {x: 2301.7, y: 1155.7};
        const currentSegment = P.segTwo;
        const routeStringArr = 'L /Q'.split(' ');

        const { 
            segment, 
            implicitTaxiway, 
            pathFound
        } = checkSegment(currentSegment, coords, routeStringArr);
        
        expect(implicitTaxiway).toBe(true);
        expect(pathFound).toBe(true);
        expect(segment).toBe(P.segTwo);
    });

    test('pick best segment dependent on start of first route element', () => {
        const coords = {x: 2335.8, y: 1327.8};
        const currentSegment = Z.segOne;
        const routeStringArr = 'P /L'.split(' ');

        const { 
            segment, 
            implicitTaxiway, 
            pathFound
        } = checkSegment(currentSegment, coords, routeStringArr);

        expect(segment).not.toBe(undefined);
        expect(implicitTaxiway).not.toBe(undefined);

        expect(implicitTaxiway).toBe(false);
        expect(pathFound).toBe(true);

        expect(segment).toBe(P.segSix);
    });

    test('multiple possible segments with the same name', () => {
        const coords = {x: 2297, y: 1695.9};
        const currentSegment = Z.segOne;
        const routeStringArr = 'Y /08R/26L'.split(' ');

        const { 
            segment, 
            implicitTaxiway, 
            pathFound
        } = checkSegment(currentSegment, coords, routeStringArr);

        expect(segment).not.toBe(undefined);
        expect(implicitTaxiway).not.toBe(undefined);

        expect(implicitTaxiway).toBe(false);
        expect(pathFound).toBe(true);

        expect(segment).toBe(Y.segFour);
    });

    test('missing route string array argument', () => {
        const coords = {x: 2335.8, y: 1327.8};
        const currentSegment = Z.segOne;

        const result = checkSegment(currentSegment, coords);

        expect(result).toBe(undefined);
    });

    test('long route with implicit first taxiway', () => {
        // this is to test that route truncation for distance checking works
        const coords = {x: 2311.5, y: 1201.8};
        const currentSegment = P.segTwo;
        const routeStringArr = 'L Q J Z W S1'.split(' ');

        const { 
            segment, 
            implicitTaxiway, 
            pathFound
        } = checkSegment(currentSegment, coords, routeStringArr);
        
        expect(implicitTaxiway).toBe(true);
        expect(pathFound).toBe(true);
        expect(segment).toBe(P.segThree);
    });

    test('invalid route from current coordinates', () => {
        // starting point on K segTwo
        const coords = {x: 2134.5, y: 1201.6};
        const currentSegment = P.segTwo;
        const routeStringArr = 'L Q /Q1'.split(' ');

        const { 
            pathFound
        } = checkSegment(currentSegment, coords, routeStringArr);
        
        expect(pathFound).toBe(false);
    });

    test('no segments found', () => {
        const coords = {x: 30, y: 15};
        const currentSegment = Z.segOne;
        const routeStringArr = 'P /L'.split(' ');

        const { pathFound } = checkSegment(currentSegment, coords, routeStringArr);

        expect(pathFound).toBe(false);
    });
});