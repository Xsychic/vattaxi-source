import pip from 'point-in-polygon';
import taxiways from '@/js/graph/taxiways';

//  doesn't work if any bounds (high or low level) are concave

const highLevelBounds = [
    [
        [547.8, 1798.1],
        [643.1, 1790],
        [639.4, 1843.5],
        [607.1, 1881.6]
    ]
]

const els = [];

for(const highLevelBound of highLevelBounds) {
    for(const [twy, bounds] of Object.entries(taxiways)) {
        for(const el of bounds) {
            for(const bound of el.bounds) {
                if(pip(bound, highLevelBound)) {
                    els.push(el);
                    break;
                }
            }
        }
    }
}

console.log(els)
