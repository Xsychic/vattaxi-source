import { checkSegment, getSegment } from '@/js/map/segmentLogic';
import { taxiways as J } from '@/js/graph/taxiways/J';
import { taxiways as P } from '@/js/graph/taxiways/P';
import { taxiways as Z } from '@/js/graph/taxiways/Z';

describe('checkSegment', () => {

    test('pick best segment dependent on start of first route element', () => {
        const currentSegment = Z.segOne;
        const routeStringArr = 'P /L'.split(' ');
        const coords = {x: 1899.5, y: 1319.6};
        console.log(getSegment(coords.x, coords.y, currentSegment, {routeStringArr}, true))
        console.log(currentSegment.points[0])
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
});