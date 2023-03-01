import JEast, { taxiways as JETaxiways } from './JEast';
import JWest, { taxiways as JWTaxiways } from './JWest';
import { joinPoints } from '@/js/graph/tools';

export const taxiways = {
    ...JETaxiways,
    ...JWTaxiways
}

// join two halves of J
joinPoints(JWest.segWN.right, JEast.segEOne.left);

export default { ...JEast, ...JWest};