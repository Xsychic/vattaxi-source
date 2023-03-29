import '@/js/graph/index';

import { ref } from 'vue';
import { taxiways as K } from '@/js/graph/taxiways/K';
import { checkWrongTurn } from '@/js/map/segmentLogic';
import { parseRoute, trimRoute } from '@/js/map/mapLogic';
import jPts, { taxiways as J } from '@/js/graph/taxiways/J';
import pPts, { taxiways as P } from '@/js/graph/taxiways/P';
import tPts, { taxiways as T } from '@/js/graph/taxiways/T';

describe('checkWrongTurn', () => {
    test('within one of the route segments', () => {
        const coords = {x: 2299.1, y: 1140.6};
        const oldSegment = P.segOne, newSegment = P.segTwo;
        const route = 'P /B1'.split(' ');
        const allSegments = { value: [] };

        const path = parseRoute(pPts.segOne.lower, route, oldSegment, allSegments, coords);

        expect(path).not.toBe(false);

        const routeArr = { value: path };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        
        trimRoute(coords, routeArr, []);
        checkWrongTurn(newSegment, oldSegment, allSegments, routeArr, coords, props, displayBanner);

        expect(allSegments.value.includes(newSegment)).toBe(true);
        expect(displayBanner.value).toBe(false);
    });

    test('outside of allSegments, overshot turn into new segment', () => {
        let coords = {x: 2510.8, y: 1250.3};
        const initialSegment = J.segEEleven;
        const route = 'J M /M1'.split(' ');
        const allSegments = { value: [] };

        const path = parseRoute(
            jPts.segEEleven.right, 
            route, 
            initialSegment, 
            allSegments, 
            coords
        );

        expect(path).not.toBe(false);

        coords = { value: {x: 2622, y: 1245.8} };
        const routeArr = { value: path };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        const oldSegment = J.segETwelve, newSegment = J.segEThirteen;
        
        trimRoute(coords, routeArr, []);
        checkWrongTurn(
            newSegment, 
            oldSegment, 
            allSegments, 
            routeArr, 
            coords, 
            props, 
            displayBanner
        );

        expect(allSegments.value.includes(newSegment)).toBe(false);
        expect(displayBanner.value).toBe(false);
    });

    test('detect wrong turn', () => {
        let coords = {x: 2510.8, y: 1250.3};
        const initialSegment = J.segEEleven;
        const route = 'J M /M1'.split(' ');
        const allSegments = { value: [] };

        const path = parseRoute(
            jPts.segEEleven.right, 
            route, 
            initialSegment, 
            allSegments, 
            coords
        );

        expect(path).not.toBe(false);

        coords = { value: {x: 2684.6, y: 1226} };
        const routeArr = { value: path };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        const oldSegment = J.segETwelve, newSegment = J.segEThirteen;
        
        trimRoute(coords, routeArr, []);
        checkWrongTurn(
            newSegment, 
            oldSegment, 
            allSegments, 
            routeArr, 
            coords, 
            props, 
            displayBanner
        );

        expect(allSegments.value.includes(newSegment)).toBe(false);
        expect(displayBanner.value).toBe(true);
        expect(routeArr.value).toEqual([]);
    });

    test('dont trigger wrong turn if entering segment containing terminating stand', () => {
        let coords = {x: 2299.1, y: 1145.9};
        const initialPoint = pPts.segTwo.upper;
        const initialSegment = P.segTwo;
        const route = 'P K S103'.split(' ');
        const allSegments = { value: [] };

        const path = parseRoute(
            initialPoint, 
            route, 
            initialSegment, 
            allSegments, 
            coords
        );

        expect(path).not.toBe(false);

        coords = { value: {x: 2268.1, y: 1174.7} };
        const routeArr = { value: path };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        const oldSegment = P.segTwo, newSegment = K.segTwo;
        
        trimRoute(coords, routeArr, []);
        checkWrongTurn(
            newSegment, 
            oldSegment, 
            allSegments, 
            routeArr, 
            coords, 
            props, 
            displayBanner
        );

        expect(allSegments.value.includes(newSegment)).toBe(false);
        expect(displayBanner.value).toBe(false);
    });

    test('dont trigger wrong turn if entering segment containing terminating maintenance area', () => {
        let coords = {x: 1482.8, y: 1454.1};
        const initialPoint = tPts.segTwo.upper;
        const initialSegment = T.segTwo;
        const route = 'T MA2'.split(' ');
        const allSegments = { value: [] };

        const path = parseRoute(
            initialPoint, 
            route, 
            initialSegment, 
            allSegments, 
            coords
        );

        expect(path).not.toBe(false);

        coords = { value: {x: 1465.7, y: 1299.1} };
        const routeArr = { value: path };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        const oldSegment = T.segTwo, newSegment = T.segOne;
        
        trimRoute(coords, routeArr, []);
        checkWrongTurn(
            newSegment, 
            oldSegment, 
            allSegments, 
            routeArr, 
            coords, 
            props, 
            displayBanner
        );

        expect(allSegments.value.includes(newSegment)).toBe(false);
        expect(displayBanner.value).toBe(false);
    });

    test('at end of route, exit wrong turn function early', () => {
        const coords = {x: 1459.7, y: 1301.1};
        const oldSegment = P.segOne, newSegment = false;
        const route = 'T /MA2'.split(' ');
        const allSegments = { value: [] };

        const routeArr = { value: [ {x: 1516.1, y: 1288.9} ] };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        
        checkWrongTurn(newSegment, oldSegment, allSegments, routeArr, coords, props, displayBanner);

        expect(displayBanner.value).toBe(false);
    });

    test('no route array provided', () => {
        const coords = {x: 2299.1, y: 1140.6};
        const oldSegment = P.segOne, newSegment = P.segTwo;
        const route = 'P /B1'.split(' ');
        const allSegments = { value: [] };

        const routeArr = { value: [] };
        const props = { routeStringArr: route };
        const displayBanner = ref(false);
        
        checkWrongTurn(newSegment, oldSegment, allSegments, routeArr, coords, props, displayBanner);

        expect(allSegments.value.includes(newSegment)).toBe(false);
        expect(displayBanner.value).toBe(false);
    });
});