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

import { joinPoints } from '@/js/graph/tools';

/* 
NOTE: SEPARATE FILES SHOULD NOT BE LINKED AT A POINT AT WHICH THE TWO
      TAXIWAY TOUCH (i.e. in the adjacentTaxiwaySegment section)

      This is because the linkSegment function does not protect
      against file refresh duplication whereas the joinPoints
      function does.

*/

/*
    SCHEMAS

    Point
        int x
        int y
        { name: String, gradient?: number }? holdingPoint
        Point[] adjoiningPoints

        constructor(Coord c, String holdingPoint = null)
        
        addAdjoiningPoint(Point p)


    Stand
        Coord joinPoint
        Coord stopPoint
        String name


    TaxiwaySegment
        String name
        Point[] points : points passed as first two args to constructor
        Coord[] bounds
        Stand[] stands

        constructor(Point pOne, Point pTwo, String name, Coord[] bounds, Stand[] stands)
*/

// link files

// 08L/26R to AN
joinPoints(R08L.segTen.right, AN.segOne.left);

// 08L/26R to C
joinPoints(R08L.segTen.right, C.segOne.lower);
joinPoints(R08L.segTen.right, C.segTwo.upper);

// 08L/26R to D
joinPoints(R08L.segEight.left, D.segOne.upper);

// 08L/26R to E
joinPoints(R08L.segFive.right, E.segOne.upper);

// 08L/26R to FR
joinPoints(R08L.segFive.left, FR.segTwo.upper);

// 08L/26R to G
joinPoints(R08L.segThree.right, G.segOne.lower);
joinPoints(R08L.segFour.left, G.segOne.lower);
joinPoints(R08L.segThree.left, G.segTwo.lower);
joinPoints(R08L.segFour.left, G.segTwo.upper);

// 08L/26R to H
joinPoints(R08L.segTwo.left, H.segOne.upper);
joinPoints(R08L.segTwo.right, H.segOne.upper);

// 08L/26R to J
joinPoints(R08L.segOne.left, J.segWFour.right);
joinPoints(R08L.segEleven.upper, J.segWSeven.left);

// 08L/26R to Q
joinPoints(R08L.segNine.left, Q.segNine.lower);
joinPoints(R08L.segNine.right, Q.segNine.lower);

// 08L/26R to R
joinPoints(R08L.segSeven.right, R.segSix.lower);
joinPoints(R08L.segEight.right, R.segSix.lower);

// 08L/26R to T
joinPoints(R08L.segSix.left, T.segFour.lower);
joinPoints(R08L.segSix.right, T.segFour.lower);

// 26L/08R to A
joinPoints(R26L.segOne.right, A.segFive.lower);

// 26L/08R to B
joinPoints(R26L.segOne.right, B.segOne.lower);
joinPoints(R26L.segOne.right, B.segThree.lower);

// 26L/08R to C
joinPoints(R26L.segOne.right, C.segThree.lower);
joinPoints(R26L.segOne.right, C.segFour.lower);

// 26L/08R to D
joinPoints(R26L.segOne.right, D.segTwo.lower);

// 26L/08R to E
joinPoints(R26L.segOne.left, E.segTwo.lower);

// R26L/08R to FR
joinPoints(R26L.segOne.left, FR.segThree.lower);

// R26L/08R to G
joinPoints(R26L.segOne.left, G.segFour.lower);
joinPoints(R26L.segOne.left, G.segSix.lower);

// R26L/08R to H
joinPoints(R26L.segOne.left, H.segThree.lower);

// R26L/08R to J
joinPoints(R26L.segOne.left, J.segWOne.left);

// 26L/08R to M
joinPoints(R26L.segOne.right, M.segFive.lower);

// 26L/08R to Y
joinPoints(R26L.segOne.right, Y.segOne.left);

// A to AN
joinPoints(A.segTwo.lower, AN.segSix.left);
joinPoints(A.segThree.upper, AN.segFive.left);
joinPoints(A.segThree.lower, AN.segFive.right);
joinPoints(A.segFour.upper, AN.segFour.right);

// A to AS
joinPoints(A.segFour.lower, AS.segTwo.right);

// A to M
joinPoints(A.segTwo.lower, M.segTwo.lower);
joinPoints(A.segTwo.lower, M.segThree.lower);

// A to V
joinPoints(A.segTwo.lower, V.segOne.left);

// A to Z
joinPoints(A.segOne.upper, Z.segTwo.right);
joinPoints(A.segOne.upper, Z.segThree.left);

// AN to C
joinPoints(AN.segOne.left, C.segOne.lower);
joinPoints(AN.segOne.left, C.segTwo.upper);

// AN to M
joinPoints(AN.segSix.left, M.segTwo.lower);
joinPoints(AN.segSix.left, M.segThree.lower);
joinPoints(AN.segSix.right, M.segTwo.lower);
joinPoints(AN.segSix.right, M.segThree.upper);

// AN to N
joinPoints(AN.segThree.left, N.segFive.lower);
joinPoints(AN.segThree.right, N.segSix.upper);

// AN to P
joinPoints(AN.segOne.right, P.segSix.lower);
joinPoints(AN.segTwo.left, P.segEight.upper);
joinPoints(AN.segThree.left, P.segEight.lower);
joinPoints(AN.segTwo.right, P.segSeven.lower);

// AN to V
joinPoints(AN.segSix.left, V.segOne.left);

// AN to W
joinPoints(AN.segSeven.right, W.segThree.lower);
joinPoints(AN.segSeven.right, W.segFour.upper);

// AS to P
joinPoints(AS.segOne.left, P.segNine.upper);

// AS to N
joinPoints(AS.segOne.right, N.segSeven.lower);

// B to N
joinPoints(B.segOne.upper, N.segEight.lower);

// B to P
joinPoints(B.segTwo.upper, P.segNine.lower);

// BR to P
joinPoints(B.segThree.upper, P.segNine.lower);

// C to J
joinPoints(C.segOne.upper, J.segEFour.right);
joinPoints(C.segOne.upper, J.segEFive.right);

// D to R
joinPoints(D.segOne.upper, R.segSix.lower);

// FR to J
joinPoints(FR.segOne.upper, J.segWEight.right);
joinPoints(FR.segOne.upper, J.segWNine.right);

// J to G
joinPoints(J.segWEight.right, G.segOne.upper);
joinPoints(J.segWNine.right, G.segOne.upper);

// J to M
joinPoints(J.segETwelve.right, M.segOne.upper);
joinPoints(J.segEThirteen.left, M.segOne.upper);

// J to N
joinPoints(J.segENine.left, N.segThree.lower);
joinPoints(J.segENine.left, N.segFour.upper);
joinPoints(J.segENine.right, N.segThree.lower);
joinPoints(J.segENine.right, N.segFour.upper);

// J to P
joinPoints(J.segESix.right, P.segSix.upper);
joinPoints(J.segESix.right, P.segSix.lower);
joinPoints(J.segEEight.left, P.segSix.upper);
joinPoints(J.segEEight.right, P.segFive.lower);

// J to Q
joinPoints(J.segEThree.right, Q.segSeven.lower);
joinPoints(J.segEThree.right, Q.segEight.lower);
joinPoints(J.segEFour.left, Q.segSeven.lower);
joinPoints(J.segEFour.left, Q.segEight.lower);

// J to R
joinPoints(J.segETwo.right, R.segFive.upper);
joinPoints(J.segEThree.left, R.segFive.upper);
joinPoints(J.segETwo.right, R.segFive.lower);
joinPoints(J.segEThree.left, R.segFive.lower);

// J to S
joinPoints(J.segWTwelve.right, S.segTwo.lower);
joinPoints(J.segEOne.left, S.segTwo.lower);

// J to T
joinPoints(J.segWEleven.right, T.segThree.lower);
joinPoints(J.segWTwelve.left, T.segThree.lower);
joinPoints(J.segWEleven.right, T.segFour.upper);
joinPoints(J.segWTwelve.left, T.segFour.upper);

// J to U
joinPoints(J.segWTen.right, U.segTwo.lower);
joinPoints(J.segWEleven.left, U.segTwo.lower);

// J to W
joinPoints(J.segEThirteen.right, W.segOne.lower)

// J to Z
joinPoints(J.segESix.right, Z.segOne.left);

// K to Q
joinPoints(K.segOne.right, Q.segFour.lower);
joinPoints(K.segOne.right, Q.segFive.lower);
joinPoints(K.segTwo.left, Q.segFour.lower);
joinPoints(K.segTwo.left, Q.segFive.lower);

// K to KA
joinPoints(K.segFive.right, KA.segOne.lower);
joinPoints(K.segSix.right, KA.segOne.lower);

// K to N
joinPoints(K.segThree.right, N.segOne.upper);
joinPoints(K.segFour.right, N.segOne.upper);

// K to P
joinPoints(K.segTwo.right, P.segTwo.upper);
joinPoints(K.segTwo.right, P.segThree.upper);
joinPoints(K.segThree.left, P.segOne.lower);
joinPoints(K.segThree.left, P.segTwo.lower);

// K to R
joinPoints(K.segOne.left, R.segThree.lower);
joinPoints(K.segOne.left, R.segFour.upper);

// KA to L
joinPoints(KA.segOne.upper, L.segNine.right);
joinPoints(KA.segOne.upper, L.segTen.left);

// L to P
joinPoints(P.segOne.upper, L.segSeven.right);
joinPoints(P.segOne.upper, L.segEight.right);

// L to Q
joinPoints(L.segFour.left, Q.segFour.upper);
joinPoints(L.segFour.right, Q.segThree.lower);
joinPoints(L.segFour.right, Q.segFour.upper);
joinPoints(L.segFive.right, Q.segThree.lower);

// L to QA
joinPoints(L.segSix.left, QX.segFive.lower);
joinPoints(L.segSix.right, QX.segFive.lower);

// L to R
joinPoints(L.segTwo.right, R.segTwo.upper);
joinPoints(L.segThree.right, R.segTwo.upper);
joinPoints(L.segFour.left, R.segZero.upper);
joinPoints(L.segFour.right, R.segZero.upper);

// L to S
joinPoints(L.segOne.right, S.segOne.upper);
joinPoints(L.segTwo.left, S.segOne.upper);

// M to V
joinPoints(M.segThree.lower, V.segOne.left);
joinPoints(M.segFour.upper, V.segOne.left);

// M to Z
joinPoints(M.segOne.lower, Z.segThree.right);
joinPoints(M.segOne.lower, Z.segFour.left);
joinPoints(M.segTwo.upper, Z.segThree.right);
joinPoints(M.segTwo.upper, Z.segFour.left);

// N to NA
joinPoints(N.segOne.lower, NA.segOne.right);
joinPoints(N.segTwo.upper, NA.segOne.right);

// N to P
joinPoints(N.segFive.lower, P.segEight.lower);

// N to Z
joinPoints(N.segFour.lower, Z.segOne.right);
joinPoints(N.segFour.lower, Z.segTwo.left);
joinPoints(N.segFive.upper, Z.segOne.right);
joinPoints(N.segFive.upper, Z.segTwo.left);

// NA to P
joinPoints(NA.segOne.left, P.segThree.lower);
joinPoints(NA.segOne.left, P.segFour.upper);

// P to Z
joinPoints(P.segSix.upper, Z.segOne.left);
joinPoints(P.segSix.lower, Z.segOne.left);

// Q to QC & QB
joinPoints(Q.segOne.upper, QX.QC.left);
joinPoints(Q.segOne.lower, QX.QB.left);
joinPoints(Q.segTwo.lower, QX.QB.left);

// Q to R
joinPoints(Q.segThree.lower, R.segZero.upper);

// V to W
joinPoints(V.segOne.right, W.segFour.lower);
joinPoints(V.segOne.right, W.segFive.upper);
joinPoints(V.segTwo.left, W.segFour.lower);
joinPoints(V.segTwo.left, W.segFive.upper);

// W to Y
joinPoints(W.segFive.lower, Y.segNine.right);

// W to Z
joinPoints(W.segTwo.lower, Z.segFour.right);
joinPoints(W.segThree.upper, Z.segFour.right);

export default L.segOne.left;