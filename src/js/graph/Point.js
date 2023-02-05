class Point {

    x;
    y;
    holdingPoint;
    taxiwaySegment;
    adjoiningPoints = [];

    constructor(coord, holdingPoint = null) {
        this.x = coord.x;
        this.y = coord.y;
        this.holdingPoint = holdingPoint;
    }

    addAdjoiningPoint = (point) => {
        this.adjoiningPoints.push(point);
    }

}

export default Point;