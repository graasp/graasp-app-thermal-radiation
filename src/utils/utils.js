/* eslint-disable import/prefer-default-export */

// function expects a canvas with variable width, a fixed positive ion radius, and a fixed distance between two positive ions
// it calculates the number of positive ions that can be placed in one row on the canvas
// it returns an array of numbers, corresponding to the x position of each positive ion (a konva circle with an x={} prop)
export const findXPositionsOfPositiveIons = (
  stageWidth,
  positiveIonRadius,
  distanceBetweenPositiveIons,
) => {
  const widthOfPositiveIonWithPadding =
    2 * positiveIonRadius + distanceBetweenPositiveIons;

  const numberOfPositiveIons = Math.floor(
    stageWidth / widthOfPositiveIonWithPadding,
  );

  // since last ion will not have padding to its right
  const totalWidthOfPositiveIons =
    numberOfPositiveIons * widthOfPositiveIonWithPadding -
    distanceBetweenPositiveIons;

  const excessWidth = stageWidth - totalWidthOfPositiveIons;
  const leftIndent = excessWidth / 2;

  return [...Array(numberOfPositiveIons)].map(
    (emptyElement, index) =>
      leftIndent + positiveIonRadius + widthOfPositiveIonWithPadding * index,
  );
};