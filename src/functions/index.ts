import * as R from "ramda";

export const isNotNil = R.complement(R.isNil);

export const isPropAliveTrue = (cell: { alive: boolean }) => cell?.alive ?? false;

export const getAliveMatrixNeighbours = (
  matrix: Array<{ alive: boolean }>,
  matrixWidth: number,
  index: number
) =>
  R.compose(R.filter(isPropAliveTrue), getMatrixNeighbours)(
    matrix,
    matrixWidth,
    index
  );

export const getMatrixNeighbours = (
  matrix: Array<any>,
  matrixWidth: number,
  index: number
) => {
  let result: Array<any> = [];

  if (index > matrixWidth) {
    let lowerRowIndex = index - matrixWidth;
    result = [
      matrix[lowerRowIndex],
      matrix[lowerRowIndex - 1],
      matrix[lowerRowIndex + 1],
    ];
  }

  result = [
    ...result, 
    matrix[index - 1], 
    matrix[index + 1]
  ];

  if (index < matrix.length - matrixWidth) {
    let higherRowIndex = index + matrixWidth;
    result = [
      ...result,
      matrix[higherRowIndex],
      matrix[higherRowIndex - 1],
      matrix[higherRowIndex + 1],
    ];
  }

  return R.filter(isNotNil, result);
};
