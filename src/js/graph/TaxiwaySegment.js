class TaxiwaySegment {

    name;
    points = [];
    bounds = [];
    stands = [];
    taxiwaySegment;


    constructor(pointOne, pointTwo, name, bounds, stands) {
        this.points = [pointOne, pointTwo];
        this.name = name;
        this.bounds = bounds;
        this.stands = stands;
    }

}

export default TaxiwaySegment;