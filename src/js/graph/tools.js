export const joinPoints = (pointOne, pointTwo) => {
    // remove references to old points (following refresh)
    clearAdjoiningPoints(pointOne, pointTwo);
    clearAdjoiningPoints(pointTwo, pointOne);

    pointOne.addAdjoiningPoint(pointTwo);
    pointTwo.addAdjoiningPoint(pointOne);
}

export const linkSegment = (segment, pointOne, pointTwo) => {
    // link segments don't need old object checking since linkSegment shouldn't 
    // link points and segments from separate files
    pointOne.addTaxiwaySegment(segment);
    pointTwo.addTaxiwaySegment(segment);
}

// method to remove references to old points after refresh
// js garbage collector will then delete them from memory
const clearAdjoiningPoints = (pointOne, pointTwo) => {
    const i = pointOne.adjoiningPoints.findIndex((pt) => pt.x == pointTwo.x && pt.y == pointTwo.y);
    if(i >= 0)
        pointOne.adjoiningPoints.splice(i, 1);
}