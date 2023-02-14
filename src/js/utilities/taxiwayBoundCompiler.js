// import every 
import { taxiways as L } from '@/js/graph/taxiways/L';
import { taxiways as Q } from '@/js/graph/taxiways/Q';
import { taxiways as QX } from '@/js/graph/taxiways/QX';

const taxiways = {L, Q, QX};

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
            object: `${tWayName}.taxiways.${segName}`,
            bounds: segment.bounds
        });
    }

    data[tWayName] = segments
}

const jsonString = JSON.stringify(data, null, "\t");

const referenceRegex = /"object":\s*"(.{0,40})",/g;
const replaceText = '"object": $1,'

const dataString = jsonString.replaceAll(referenceRegex, replaceText);

let writeString = '';

for(const tWay of Object.keys(taxiways)) {
    writeString += `import { taxiways as ${tWay} } from '@/js/graph/taxiways/${tWay}';\n`;
}

writeString += `\n\nexport const data = ${dataString};`;

console.log(writeString);
