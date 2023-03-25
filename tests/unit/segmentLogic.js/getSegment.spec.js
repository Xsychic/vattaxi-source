import { mount } from '@vue/test-utils';
import { taxiways } from '@/js/graph/taxiways/QX';
import { getSegment } from '@/js/map/segmentLogic';

describe('getSegment', () => {


    test('gets correct segment', () => {
        const x = 1978, y = 715;

        const segment = getSegment(x, y);
        const expectedSegment = taxiways.segOne;

        expect(segment).toStrictEqual(expectedSegment);
    });
});