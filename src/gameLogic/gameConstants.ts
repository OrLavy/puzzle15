// NOTE : In real life we will use a better file structure

const MATRIX_SIZE = 4;

type MatrixMovement = {
  readonly rowDif: number,
  readonly colDif: number,
}

const UP: MatrixMovement = {
  rowDif: -1,
  colDif: 0,
};

const DOWN: MatrixMovement = {
  rowDif: 1,
  colDif: 0,
};

const LEFT: MatrixMovement = {
  rowDif: 0,
  colDif: -1,
};

const RIGHT: MatrixMovement = {
  rowDif: 0,
  colDif: 1,
};

const VALID_GRID_NEIGHBOUR_DIRECTIONS = [
  UP, DOWN, LEFT, RIGHT,
];

export {
  MATRIX_SIZE,
  VALID_GRID_NEIGHBOUR_DIRECTIONS,
}
