// import every 
import A from '@/js/graph/taxiways/A';
import AN from '@/js/graph/taxiways/AN';
import AS from '@/js/graph/taxiways/AS';
import B from '@/js/graph/taxiways/B';
import C from '@/js/graph/taxiways/C';
import D from '@/js/graph/taxiways/D';
import E from '@/js/graph/taxiways/E';
import FR from '@/js/graph/taxiways/FR';
import G from '@/js/graph/taxiways/G';
import H from '@/js/graph/taxiways/H';
import J from '@/js/graph/taxiways/J';
import K from '@/js/graph/taxiways/K';
import KA from '@/js/graph/taxiways/KA';
import L from '@/js/graph/taxiways/L';
import M from '@/js/graph/taxiways/M';
import N from '@/js/graph/taxiways/N';
import NA from '@/js/graph/taxiways/NA';
import P from '@/js/graph/taxiways/P';
import Q from '@/js/graph/taxiways/Q';
import QX from '@/js/graph/taxiways/QX';
import R from '@/js/graph/taxiways/R';
import R08L from '@/js/graph/taxiways/R08L';
import R26L from '@/js/graph/taxiways/R26L';
import S from '@/js/graph/taxiways/S';
import T from '@/js/graph/taxiways/T';
import U from '@/js/graph/taxiways/U';
import V from '@/js/graph/taxiways/V';
import W from '@/js/graph/taxiways/W';
import Y from '@/js/graph/taxiways/Y';
import Z from '@/js/graph/taxiways/Z';

const taxiways = [A, AN, AS, B, C, D, E, FR, G, H, J, K, KA, L, M, N, NA, P, Q, QX, R, R08L, R26L, S, T, U, V, W, Y, Z];
const points = [];

for(const taxiway of taxiways)
    for(const segment of Object.values(taxiway))
        for(const point of Object.values(segment)) {
            points.push(point);
}


export default points;