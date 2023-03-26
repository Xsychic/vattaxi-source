import { pickShortestPath } from '@/js/map/mapLogic';



describe('pickShortestPath', () => {

    test('selects the path with the shortest pixel distance', () => {
        // up most of P, across L to around S49
        const pathOne = [
            {x: 2386, y: 1419.8},
            {x: 2344.6, y: 1357.9},
            {x: 2276, y: 1037.2},
            {x: 2288.4, y: 1016.5},
            {x: 2411.6, y: 990.1}
        ]

        // P J to around S24
        const pathTwo = [
            {x: 2391.9, y: 1426.4},
            {x: 2336.1, y: 1316},
            {x: 2353.3, y: 1297.9},
            {x: 2419.2, y: 1276.9},
            {x: 2439.3, y: 1267.3},
            {x: 2493.8, y: 1253.9}
        ]

        const result = pickShortestPath([pathOne, pathTwo]);
        const expectedResult = {
            path: pathTwo,
            i: 1
        };

        expect(result).toStrictEqual(expectedResult);
    });
});