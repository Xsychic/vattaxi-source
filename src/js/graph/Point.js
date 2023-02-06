class Point {

    x;
    y;
    holdingPoint;
    adjacentTaxiwaySegments = [];
    adjoiningPoints = [];

    constructor(coord, holdingPoint = null) {
        this.x = coord.x;
        this.y = coord.y;
        this.holdingPoint = holdingPoint;
    }

    addAdjoiningPoint = (point) => {
        this.adjoiningPoints.push(point);
    }

    addTaxiwaySegment = (segment) => {
        this.adjacentTaxiwaySegments.push(segment);
    }

}

export default Point;