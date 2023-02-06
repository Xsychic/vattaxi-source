export const joinPoints = (pointOne, pointTwo) => {
    pointOne.addAdjoiningPoint(pointTwo);
    pointTwo.addAdjoiningPoint(pointOne);
}

export const linkSegment = (segment, pointOne, pointTwo) => {
    pointOne.addTaxiwaySegment(segment);
    pointTwo.addTaxiwaySegment(segment);
}