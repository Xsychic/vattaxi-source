import '@/js/graph/index';
import { parseRoute } from '@/js/map/mapLogic';
import { taxiways as K } from '@/js/graph/taxiways/K';
import { taxiways as L } from '@/js/graph/taxiways/L';
import { taxiways as P } from '@/js/graph/taxiways/P';
import qPts, { taxiways as Q } from '@/js/graph/taxiways/Q';
import { generateDirections } from '@/js/map/directionLogic';
import kaPts, { taxiways as KA } from '@/js/graph/taxiways/KA';
import Stand from '@/js/graph/Stand';

/*
{ dir: 0, text: `Continue straight ahead onto `, el:  },
{ dir: -1, text: `Turn left onto `, el:  },
{ dir: 1, text: `Turn right onto `, el:  },
*/

describe('generateDirections', () => {
    test('route terminating in a hold', () => {
        const route = 'Q K KA /L'.split(' ');
        const coords = {x: 2006, y: 1340};
        const initialSegment = Q.segSix;
        const initialPoint = qPts.segFive.lower;
        const path = parseRoute(initialPoint, route, initialSegment, [], coords);
        const routeArr = { value: path };

        expect(path).not.toBe(false);

        const directions = generateDirections(routeArr, route, initialSegment, coords);

        const expectedDirections = [
            { dir: 1, text: `Turn right onto K`, el: K.segTwo },
            { dir: -1, text: `Turn left onto KA`, el: KA.segOne },
            { dir: 2, text: `Hold short of L`, el: kaPts.segOne.upper }
        ];

        expect(directions).toEqual(expectedDirections);
    });

    test('route terminating in stand', () => {
        const route = 'Q K KA L S38'.split(' ');
        const coords = {x: 2006, y: 1340};
        const initialSegment = Q.segSix;
        const initialPoint = qPts.segFive.lower;
        const path = parseRoute(initialPoint, route, initialSegment, [], coords);
        const routeArr = { value: path };

        expect(path).not.toBe(false);

        const directions = generateDirections(routeArr, route, initialSegment, coords);

        const S38 = L.segSixteen.stands.find(st => st.name === '38');
        const expectedDirections = [
            { dir: 1, text: `Turn right onto K`, el: K.segTwo },
            { dir: -1, text: `Turn left onto KA`, el: KA.segOne },
            { dir: 0, text: `Continue straight ahead onto L`, el: L.segTen },
            { dir: 1, text: `Turn right onto Stand 38`, el: S38 },
        ];

        expect(directions.length).toBe(expectedDirections.length);
        expect(directions).toEqual(expectedDirections);
    });


    /*
        debugging code:
                
        for(let i = 0; i < directions.length; i++) {
            console.log(directions[i]);
            console.log(expectedDirections[i])
            expect(directions[i]).toEqual(expectedDirections[i])
            console.log(`checked ${i}`)
        }
    */

    test('terminating stand on second segment after turn', () => {
        const route = 'Q K P L S54'.split(' ');
        const coords = {x: 2006, y: 1340};
        const initialSegment = Q.segSix;
        const initialPoint = qPts.segFive.lower;
        const path = parseRoute(initialPoint, route, initialSegment, [], coords);
        const routeArr = { value: path };

        expect(path).not.toBe(false);

        const directions = generateDirections(routeArr, route, initialSegment, coords);

        const S54 = L.segSeven.stands.find(st => st.name === '54');
        const expectedDirections = [
            { dir: 1, text: `Turn right onto K`, el: K.segTwo },
            { dir: -1, text: `Turn left onto P`, el: P.segOne },
            { dir: -1, text: `Turn left onto L`, el: S54 },
            { dir: 1, text: `Turn right onto Stand 54`, el: S54 },
        ];        

        expect(directions.length).toBe(expectedDirections.length);        
        expect(directions).toEqual(expectedDirections);
    });

    test('terminating stand on first segment after turn', () => {
        const route = 'Q K P L S52'.split(' ');
        const coords = {x: 2006, y: 1340};
        const initialSegment = Q.segSix;
        const initialPoint = qPts.segFive.lower;
        const path = parseRoute(initialPoint, route, initialSegment, [], coords);
        const routeArr = { value: path };

        expect(path).not.toBe(false);

        const directions = generateDirections(routeArr, route, initialSegment, coords);

        const S52 = L.segEight.stands.find(st => st.name === '52');
        const expectedDirections = [
            { dir: 1, text: `Turn right onto K`, el: K.segTwo },
            { dir: -1, text: `Turn left onto P`, el: P.segOne },
            { dir: 1, text: `Turn right onto L`, el: S52 },
            { dir: 0, text: `Continue straight ahead onto Stand 52`, el: S52 },
        ];        

        expect(directions.length).toBe(expectedDirections.length);  
        expect(directions).toEqual(expectedDirections);
    });
});