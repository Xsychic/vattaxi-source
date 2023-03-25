import Stand from '@/js/graph/Stand';
import TaxiwaySegment from '@/js/graph/TaxiwaySegment';

// import { setupJestCanvasMock } from 'jest-canvas-mock';
import { calculatePixelCoords, getBounds, pythagDistance } from '@/js/map/mapLogic';

describe('calculatePixelCoords', () => {

    test('validCoords', () => {
        const coords = {
            latitude: 51.150542,
            longitude: -0.173069
        };

        const { x, y, oob = false } = calculatePixelCoords(coords);

        expect(oob).toBe(false);

        const roundedValues = {
            x: Math.round(x * 10) / 10,
            y: Math.round(y * 10) / 10
        }

        expect(roundedValues).toStrictEqual({
            x: 2362,
            y: 1513.2
        });
    });

    test('inside lat, outside px bounds', () => {
        const coords = {
            latitude: 51.10700,
            longitude: -0.173069
        };

        const { x, y, oob = false } = calculatePixelCoords(coords);

        expect(oob).toBe(true);
    });

    test('missing coords', () => {
        const { x, y, oob = false } = calculatePixelCoords({});

        expect(oob).toBe(true);
    });
});


describe('getBounds()', () => {
    test('bounds across perfectly vertical taxiway', () => {
        const point = {x: 30, y: 0};
        const nextPoint = {x: 30, y: 30}
    
        const bounds = getBounds(point, nextPoint);
    
        const expectedBounds = [
            [7.5, 0],
            [52.5, 0],
            [52.5,  14],
            [7.5,  14],
        ]
    
        expect(bounds).toStrictEqual(expectedBounds)
    });

    test('bounds across non-vertical taxiway', () => {
        const point = {x: 0, y: 0};
        const nextPoint = {x: 30, y: 30}
    
        const bounds = getBounds(point, nextPoint);

        const num = (45 * Math.sqrt(2)) / 4;
        const num2 = 7 * Math.sqrt(2);

        const expectedBounds = [
            [-num,  num],
            [num, -num],
            [num - num2,  -num - num2],
            [-num - num2, num - num2],
        ]

        for(let i = 0; i < expectedBounds.length; i++)
            for(let j = 0; j < expectedBounds[i].length; j++)
                expectedBounds[i][j] = Math.round(expectedBounds[i][j] * 10) / 10;

        expect(bounds).toStrictEqual(expectedBounds)
    });

    test('next point is a taxiway segment', () => {
        const point = {x: 0, y: 0};
        const nextPoint = {x: 30, y: 30}

        const segment = new TaxiwaySegment(
            point, 
            nextPoint,
            'test',
            [],
            []
        )
    
        const bounds = getBounds(point, segment);

        const num = (45 * Math.sqrt(2)) / 4;
        const num2 = 7 * Math.sqrt(2);

        const expectedBounds = [
            [-num,  num],
            [num, -num],
            [num - num2,  -num - num2],
            [-num - num2, num - num2],
        ]

        for(let i = 0; i < expectedBounds.length; i++)
            for(let j = 0; j < expectedBounds[i].length; j++)
                expectedBounds[i][j] = Math.round(expectedBounds[i][j] * 10) / 10;

        expect(bounds).toStrictEqual(expectedBounds)
    });

    test('next point is a stand', () => {
        const point = {x: 0, y: 0};
        const nextPoint = {x: 30, y: 30}

        const stand = new Stand(nextPoint, {x: 32, y: 37}, 'S123');
    
        const bounds = getBounds(point, stand);

        const num = (45 * Math.sqrt(2)) / 4;
        const num2 = 7 * Math.sqrt(2);

        const expectedBounds = [
            [-num,  num],
            [num, -num],
            [num - num2,  -num - num2],
            [-num - num2, num - num2],
        ]

        for(let i = 0; i < expectedBounds.length; i++)
            for(let j = 0; j < expectedBounds[i].length; j++)
                expectedBounds[i][j] = Math.round(expectedBounds[i][j] * 10) / 10;

        expect(bounds).toStrictEqual(expectedBounds)
    });


    test('segment doesn\'t contain current point', () => {
        const point = {x: 0, y: 0};
        const nextPoint = {x: 30, y: 30}

        const segment = new TaxiwaySegment(
            {x: 1, y: 1}, 
            nextPoint,
            'test',
            [],
            []
        )
    
        const bounds = getBounds(point, segment);

        expect(bounds).toBe(undefined);
    });

});



describe('pythagDistance', () => {
    test('it calculates pythagorean distance correctly', () => {
        const point = {x: 0, y: 0};
        const nextPoint = {x: 3, y: 4};

        const distance = pythagDistance(point, nextPoint);

        expect(distance).toBe(5);
    });
});