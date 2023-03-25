import { getSegment } from '@/js/map/segmentLogic';
import { taxiways as P } from '@/js/graph/taxiways/P';
import { taxiways as Q } from '@/js/graph/taxiways/QX';

describe('getSegment', () => {

    test('gets correct segment when only one possible', () => {
        const x = 1978, y = 715;

        const segment = getSegment(x, y);
        const expectedSegment = Q.segOne;

        expect(segment).toStrictEqual(expectedSegment);
    });

    test('detects when in no segment', () => {
        const x = 10, y = 10;

        const segment = getSegment(x);

        expect(segment).toBe(false);
    });

    test('detects when argument missing', () => {
        const x = 10, y = 10;

        const segment = getSegment(x, y);

        expect(segment).toBe(false);
    });

    test('detects when segment is unchanged and one of two or more possible segments', () => {
        const x = 1984, y = 840;

        const expectedSegment = Q.segTwo;
        const segment = getSegment(x, y, expectedSegment);

        expect(segment).toStrictEqual(expectedSegment);
    });

    test('returns multiple segments', () => {
        const x = 1984, y = 840;

        const segments = getSegment(x, y, false, {}, true);
        console.log(typeof segments)
        console.log(segments)
        expect(Array.isArray(segments)).toBe(true);
        expect(segments.length).toBe(2);
        expect(segments.includes(Q.segTwo)).toBe(true);
        expect(segments.includes(Q.QC)).toBe(true);
    });

    test('detects when taxiway name is unchanged and one of two or more possible segments', () => {
        const x = 1984, y = 840;

        const currentSegment = Q.segOne;
        const expectedSegment = Q.segTwo;
        const segment = getSegment(x, y, currentSegment);

        expect(segment).toStrictEqual(expectedSegment);
    });

    test('detects when one of multiple segments is in the current route', () => {
        const x = 1984, y = 840;

        const expectedSegment = Q.QC;
        const props = {
            routeStringArr: ['QC', 'Q', '/Q1']
        };
        const segment = getSegment(x, y, false, props);

        expect(segment).toStrictEqual(expectedSegment);
    });

    test('randomly picks possible segment when not able to work out best one', () => {
        const x = 1984, y = 840;

        const possibleSegments = [Q.QC, Q.segTwo];
        const currentSegment = P.segOne;
        const props = {
            routeStringArr: ['L', 'P', '/J']
        };

        const segment = getSegment(x, y, currentSegment, props);

        expect(possibleSegments).toContain(segment);
    });

});