// import every 
import { taxiways as K } from '@/js/graph/taxiways/K';
import { taxiways as KA } from '@/js/graph/taxiways/KA';
import { taxiways as L } from '@/js/graph/taxiways/L';
import { taxiways as P } from '@/js/graph/taxiways/P';
import { taxiways as Q } from '@/js/graph/taxiways/Q';
import { taxiways as QX } from '@/js/graph/taxiways/QX';

const taxiways = {K, KA, L, P, Q, QX};

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
    
