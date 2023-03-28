import '@/js/graph/index'; // must be imported to link pTwys

import paper from 'paper';
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

import { traversePoint, trimRoute } from '@/js/map/mapLogic';

describe('trimRoute', () => {
    beforeAll(() => {
        paper.setup();
    })

    test('route doesn\'t require trimming', () => {
        const route = 'P K S15'.split(' ');
        const pathArr = traversePoint(P.segOne.lower, route, []);
        const drawnPathsArr = [new paper.Path(), new paper.Path()];

        const path = { value: pathArr.map(el => el) };
        const coords = {x: 2278.9, y: 1052.4};
        const drawnPaths = { value: drawnPathsArr.map(el => el) };

        trimRoute(coords, path, drawnPaths);

        expect(path.value).toEqual(pathArr);        
        expect(drawnPaths.value).toEqual(drawnPathsArr);        
    });

    test('trim first point if within 8px of first point', () => {
        const route = 'P K S15'.split(' ');
        const pathArr = traversePoint(P.segOne.lower, route, []);
        const drawnPathsArr = [new paper.Path(), new paper.Path()];

        const path = { value: pathArr.map(el => el) };
        const coords = {x: 2294.9, y: 1122};
        const drawnPaths = { value: drawnPathsArr.map(el => el) };

        trimRoute(coords, path, drawnPaths);

        expect(path.value).toEqual(pathArr.slice(1));        
        expect(drawnPaths.value).toEqual(drawnPathsArr.slice(1));    
    });

    test('transform stand into stop point', () => {
        const route = 'K S15'.split(' ');
        const stand = new Stand({x: 2628, y: 1069.4}, {x: 2643.1, y: 1140.9}, '15');
        const pathArr = [ stand ]; // stop point of stand 15
        const drawnPathsArr = [new paper.Path(), new paper.Path()];

        const path = { value: pathArr.map(el => el) };
        const coords = {x: 2625, y: 1074.5};
        const drawnPaths = { value: drawnPathsArr.map(el => el) };

        trimRoute(coords, path, drawnPaths);


        expect(path.value).toEqual([ stand.stopPoint ]);        
        expect(drawnPaths.value).toEqual(drawnPathsArr.slice(1));    
    });

    test('at termination point of route', () => {
        const route = 'K S15'.split(' ');
        const pathArr = [{x: 2643.4, y: 1140.8}]; // stop point of stand 15
        const drawnPathsArr = [new paper.Path()];

        const path = { value: pathArr.map(el => el) };
        const coords = {x: 2642.5, y: 1137.7};
        const drawnPaths = { value: drawnPathsArr.map(el => el) };

        trimRoute(coords, path, drawnPaths);


        expect(path.value).toEqual([]);        
        expect(drawnPaths.value).toEqual([]);    
    });
});