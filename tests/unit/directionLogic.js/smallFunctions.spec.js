import { createDirectionObj, turnDirection } from '@/js/map/directionLogic';

describe('turnDirection', () => {
    test('straight ahead', () => {
        // J onto Z
        const pointOne = {x: 2171.5, y: 1370.7};
        const pointTwo = {x: 2315.4, y: 1340.6};
        const pointThree = {x: 2353.7, y: 1336.9};

        const direction = turnDirection(pointOne, pointTwo, pointThree);

        expect(typeof direction).toBe('number');
        expect(direction).toBe(0);
    });

    test('dead straight ahead', () => {
        // J onto Z
        const pointOne = {x: 2171.5, y: 1370.7};
        const pointTwo = {x: 2315.4, y: 1340.6};
        const pointThree = {x: 2353.7, y: 1336.9};

        const direction = turnDirection(pointOne, pointTwo, pointThree);

        expect(typeof direction).toBe('number');
        expect(direction).toBe(0);
    });

    test('marginally straight ahead (15 deg off straight)', () => {
        // abstract example
        const pointOne = {x: 1000, y: 2000};
        const pointTwo = {x: 1000, y: 1500};
        const pointThree = {x: 1100, y: 1126};

        const direction = turnDirection(pointOne, pointTwo, pointThree);

        expect(typeof direction).toBe('number');
        expect(direction).toBe(0);
    });

    test('~45 deg left turn', () => {
        // J onto P
        const pointOne = {x: 2330.8, y: 1330};
        const pointTwo = {x: 2337.3, y: 1317.7};
        const pointThree = {x: 2330.4, y: 1285.6};

        const direction = turnDirection(pointOne, pointTwo, pointThree);

        expect(typeof direction).toBe('number');
        expect(direction).toBe(-1);
    });

    test('~90 deg right turn', () => {
        // R onto K
        const pointOne = {x: 1956.8, y: 1373.3};
        const pointTwo = {x: 1933.4, y: 1264.2};
        const pointThree = {x: 1950, y: 1244.8};

        const direction = turnDirection(pointOne, pointTwo, pointThree);

        expect(typeof direction).toBe('number');
        expect(direction).toBe(1);
    });

    const pointOne = {x: 2171.5, y: 1370.7};
    const pointTwo = {x: 2315.4, y: 1340.6};
    const pointThree = {x: 2353.7, y: 1336.9};

    test('point one missing', () => {
        const result = turnDirection({}, pointTwo, pointThree);
        expect(result).toBe(undefined);
    });

    test('point two missing', () => {
        const result = turnDirection(pointOne, false, pointThree);
        expect(result).toBe(undefined);
    });

    test('point three missing', () => {
        const result = turnDirection(pointOne, pointTwo, {});
        expect(result).toBe(undefined);
    });
});


describe('createDirectionObj', () => {
    test('straight ahead', () => {
        // J onto Z
        const pointOne = {x: 2171.5, y: 1370.7};
        const pointTwo = {x: 2315.4, y: 1340.6};
        const pointThree = {x: 2353.7, y: 1336.9};
        const taxiway = 'Z';
        const obj = {};

        const returnVal = createDirectionObj(pointOne, pointTwo, pointThree, taxiway, obj);

        expect(typeof returnVal).toBe('object');
        expect(returnVal.dir).toBe(0);
        expect(returnVal.text).toBe('Continue straight ahead onto Z');
        expect(returnVal.el).toBe(obj);
    });
    
    test('left turn', () => {
        // J onto P
        const pointOne = {x: 2330.8, y: 1330};
        const pointTwo = {x: 2337.3, y: 1317.7};
        const pointThree = {x: 2330.4, y: 1285.6};
        const taxiway = 'P';
        const obj = {};

        const returnVal = createDirectionObj(pointOne, pointTwo, pointThree, taxiway, obj);

        expect(typeof returnVal).toBe('object');
        expect(returnVal.dir).toBe(-1);
        expect(returnVal.text).toBe('Turn left onto P');
        expect(returnVal.el).toBe(obj);
    });

    test('right turn', () => {
        // R onto K
        const pointOne = {x: 1956.8, y: 1373.3};
        const pointTwo = {x: 1933.4, y: 1264.2};
        const pointThree = {x: 1950, y: 1244.8};
        const taxiway = 'K';
        const obj = {};

        const returnVal = createDirectionObj(pointOne, pointTwo, pointThree, taxiway, obj);

        expect(typeof returnVal).toBe('object');
        expect(returnVal.dir).toBe(1);
        expect(returnVal.text).toBe('Turn right onto K');
        expect(returnVal.el).toBe(obj);
    });

    test('missing point', () => {
        // R onto K
        const pointTwo = {x: 1933.4, y: 1264.2};
        const pointThree = {x: 1950, y: 1244.8};
        const taxiway = 'K';
        const obj = {};

        const returnVal = createDirectionObj({}, pointTwo, pointThree, taxiway, obj);

        expect(returnVal).toBe(undefined);
    });
});