// import every 
import { taxiways as A } from '@/js/graph/taxiways/A';
import { taxiways as AN } from '@/js/graph/taxiways/AN';
import { taxiways as AS } from '@/js/graph/taxiways/AS';
import { taxiways as B } from '@/js/graph/taxiways/B';
import { taxiways as C } from '@/js/graph/taxiways/C';
import { taxiways as D } from '@/js/graph/taxiways/D';
import { taxiways as E } from '@/js/graph/taxiways/E';
import { taxiways as FR } from '@/js/graph/taxiways/FR';
import { taxiways as G } from '@/js/graph/taxiways/G';
import { taxiways as H } from '@/js/graph/taxiways/H';
import { taxiways as J } from '@/js/graph/taxiways/J';
import { taxiways as K } from '@/js/graph/taxiways/K';
import { taxiways as KA } from '@/js/graph/taxiways/KA';
import { taxiways as L } from '@/js/graph/taxiways/L';
import { taxiways as M } from '@/js/graph/taxiways/M';
import { taxiways as N } from '@/js/graph/taxiways/N';
import { taxiways as NA } from '@/js/graph/taxiways/NA';
import { taxiways as P } from '@/js/graph/taxiways/P';
import { taxiways as Q } from '@/js/graph/taxiways/Q';
import { taxiways as QX } from '@/js/graph/taxiways/QX';
import { taxiways as R } from '@/js/graph/taxiways/R';
import { taxiways as R08L } from '@/js/graph/taxiways/R08L';
import { taxiways as R26L } from '@/js/graph/taxiways/R26L';
import { taxiways as S } from '@/js/graph/taxiways/S';
import { taxiways as T } from '@/js/graph/taxiways/T';
import { taxiways as U } from '@/js/graph/taxiways/U';
import { taxiways as V } from '@/js/graph/taxiways/V';
import { taxiways as W } from '@/js/graph/taxiways/W';
import { taxiways as Y } from '@/js/graph/taxiways/Y';
import { taxiways as Z } from '@/js/graph/taxiways/Z';

const taxiways = {A, AN, AS, B, C, D, E, FR, G, H, J, K, KA, L, M, N, NA, P, Q, QX, R, R08L, R26L, S, T, U, V, W, Y, Z};

/*

    output string containing valid js
    {
        L: [
            { object: L.segOne, bounds: [] },
            ...
        ],
        Q: [
            ...
        ]
    }

*/

const data = {};


for(const [tWayName, tWaySegments] of Object.entries(taxiways)) {
    const segments = [];

    for(const [segName, segment] of Object.entries(tWaySegments)) {
        segments.push({
            object: `${tWayName}.${segName}`,
            bounds: segment.bounds
        });
    }

    data[tWayName] = segments
}

let dataString = JSON.stringify(data, null, "\t");

const referenceRegex = /"object":\s*"(.{0,40})",/g;
const referenceReplacement = '"object": $1,'

const coordFormatRegex = /\{\s*"x":\s*(\d+(?:\.\d+)?),\s*"y":\s*(\d+(?:\.\d+)?)\s*\}/g;
const coordFormatReplacement = '[$1, $2]'

dataString = dataString.replaceAll(referenceRegex, referenceReplacement);
dataString = dataString.replaceAll(coordFormatRegex, coordFormatReplacement);

let writeString = '';

for(const tWay of Object.keys(taxiways)) {
    writeString += `import { taxiways as ${tWay} } from '@/js/graph/taxiways/${tWay}';\n`;
}

writeString += `\n\nconst data = ${dataString};\n\nexport default data;`;

console.log(writeString);
    
