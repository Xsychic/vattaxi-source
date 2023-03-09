import A from '@/js/graph/taxiways/A';
import AN from '@/js/graph/taxiways/AN';
import AS from '@/js/graph/taxiways/AS';
import J from '@/js/graph/taxiways/J';
import K from '@/js/graph/taxiways/K';
import KA from '@/js/graph/taxiways/KA';
import L from '@/js/graph/taxiways/L';
import N from '@/js/graph/taxiways/N';
import P from '@/js/graph/taxiways/P';
import Q from '@/js/graph/taxiways/Q';
import QX from '@/js/graph/taxiways/QX';
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

// A to AN
joinPoints(A.segTwo.lower, AN.segFive.left);
joinPoints(A.segThree.upper, AN.segFour.left);
joinPoints(A.segThree.lower, AN.segFour.right);
joinPoints(A.segFour.upper, AN.segThree.right);

// A to AS
joinPoints(A.segFour.lower, AS.segTwo.right);

// A to Z
joinPoints(A.segOne.upper, Z.segTwo.right);
joinPoints(A.segOne.upper, Z.segThree.left);

// AN to N
joinPoints(AN.segTwo.right, N.segFive.lower);
joinPoints(AN.segThree.left, N.segSix.upper);

// AN to P
joinPoints(AN.segOne.right, P.segSix.lower);
joinPoints(AN.segTwo.left, P.segSeven.upper);
joinPoints(AN.segTwo.right, P.segSeven.lower);

// AS to P
joinPoints(AS.segOne.left, P.segEight.upper);

// AS to N
joinPoints(AS.segOne.right, N.segSeven.lower);

// J to N
joinPoints(J.segENine.left, N.segThree.lower);
joinPoints(J.segENine.left, N.segFour.upper);
joinPoints(J.segENine.right, N.segThree.lower);
joinPoints(J.segENine.right, N.segFour.upper);

// J to P
joinPoints(J.segESix.right, P.segSix.upper);
joinPoints(J.segESix.right, P.segSix.lower);
joinPoints(J.segEEight.right, P.segFive.lower);

// J to Q
joinPoints(J.segEThree.right, Q.segSeven.lower);
joinPoints(J.segEThree.right, Q.segEight.lower);
joinPoints(J.segEFour.left, Q.segSeven.lower);
joinPoints(J.segEFour.left, Q.segEight.lower);

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
joinPoints(K.segThree.left, P.segTwo.upper);
joinPoints(K.segThree.left, P.segTwo.lower);

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

// N to P
joinPoints(N.segFive.lower, P.segSeven.lower);

// N to Z
joinPoints(N.segFour.lower, Z.segOne.right);
joinPoints(N.segFour.lower, Z.segTwo.left);
joinPoints(N.segFive.upper, Z.segOne.right);
joinPoints(N.segFive.upper, Z.segTwo.left);

// P to Z
joinPoints(P.segSix.upper, Z.segOne.left);
joinPoints(P.segSix.lower, Z.segOne.left);

// Q to QC & QB
joinPoints(Q.segOne.upper, QX.QC.left);
joinPoints(Q.segOne.lower, QX.QB.left);
joinPoints(Q.segTwo.lower, QX.QB.left);


export default L.segOne.left;