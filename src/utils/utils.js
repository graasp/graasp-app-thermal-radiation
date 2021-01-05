/* eslint-disable import/prefer-default-export */

// function expects a canvas with variable width, a fixed positive ion radius, and a fixed distance between two positive ions
// it calculates the number of positive ions that can be placed in one row on the canvas 
export const calculateNumberOfPositiveIons = (
  stageWidth,
  positiveIonRadius,
  distanceBetweenPositiveIons,
) => {
  const positiveIonDiameter = positiveIonRadius * 2;

  // if width of canvas ('stageWidth') is smaller than one positive ion's diameter, then no positive ions can fit
  if (stageWidth < positiveIonDiameter) {
    return { numberOfPositiveIons: 0, excessWidth: stageWidth };
  }

  let numberOfPositiveIons = 1;
  let horizontalLengthOfPositiveIons =
    numberOfPositiveIons * positiveIonDiameter +
    (numberOfPositiveIons - 1) * distanceBetweenPositiveIons;

  while (horizontalLengthOfPositiveIons < stageWidth) {
    const currentLoopHorizontalLength =
      numberOfPositiveIons * positiveIonDiameter +
      (numberOfPositiveIons - 1) * distanceBetweenPositiveIons;
    if (currentLoopHorizontalLength === stageWidth) {
      break;
    } else if (currentLoopHorizontalLength > stageWidth) {
      numberOfPositiveIons -= 1;
      break;
    } else {
      numberOfPositiveIons += 1;
      horizontalLengthOfPositiveIons = currentLoopHorizontalLength;
    }
  }

  return {
    numberOfPositiveIons,
    excessWidth: stageWidth - horizontalLengthOfPositiveIons,
  };
};
