class Point {

    x;
    y;
    holdingPoint;
    taxiwaySegment;
    adjoiningPoints = [];

    constructor(x, y, holdingPoint = null) {
        this.x = x;
        this.y = y;
        this.holdingPoint = holdingPoint;
    }

    addAdjoiningPoint = (point) => {
        this.adjoiningPoints.push(point);
    }

}

export default Point;