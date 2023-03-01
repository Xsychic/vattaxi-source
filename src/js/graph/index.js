import J from '@/js/graph/taxiways/J';
import K from '@/js/graph/taxiways/K';
import KA from '@/js/graph/taxiways/KA';
import L from '@/js/graph/taxiways/L';
import P from '@/js/graph/taxiways/P';
import Q from '@/js/graph/taxiways/Q';
import QX from '@/js/graph/taxiways/QX';

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

// J to P
joinPoints(J.segESix.right, P.segSix.upper);
joinPoints(J.segESix.right, P.segSix.lower);

// J to Q
joinPoints(J.segEThree.right, Q.segSeven.lower);
joinPoints(J.segEThree.right, Q.segEight.lower);
joinPoints(J.segEFour.left, Q.segSeven.lower);
joinPoints(J.segEFour.left, Q.segEight.lower);

// K to Q
joinPoints(K.segOne.right, Q.segFour.lower);
joinPoints(K.segOne.right, Q.segFive.lower);
joinPoints(K.segTwo.left, Q.segFour.lower);
joinPoints(K.segTwo.left, Q.segFive.lower);

// K to KA
joinPoints(K.segFive.right, KA.segOne.lower);
joinPoints(K.segSix.right, KA.segOne.lower);

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

// Q to QC & QB
joinPoints(Q.segOne.upper, QX.QC.left);
joinPoints(Q.segOne.lower, QX.QB.left);
joinPoints(Q.segTwo.lower, QX.QB.left);


export default L.segOne.left;