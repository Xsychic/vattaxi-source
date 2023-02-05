const joinPoints = (pointOne, pointTwo) => {
    pointOne.addAdjoiningPoint(pointTwo);
    pointTwo.addAdjoiningPoint(pointOne);
}

export default joinPoints;