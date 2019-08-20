import GameBlocksGrid from "../models/gameBlocksGrid";
import GridLocation from "../models/gridLocation";
import {VALID_GRID_NEIGHBOUR_DIRECTIONS} from "./gameConstants";
import {doesLocationFitsOrderIndex, switchBetweenCells} from "./gameLogicHelpers";

/**
 * Will perform 'numberOfMoves' random moves in the given board (will mutate the given board).
 */
function shuffleGameBoardByNumberOfSteps(gameBlocksGrid: GameBlocksGrid, startingEmptyBlockLocation: GridLocation, numberOfMoves: number) : { shuffledGmeBlocksGrid: GameBlocksGrid, emptyBlockLocation: GridLocation } {
  let emptyBlockLocation = startingEmptyBlockLocation;
  const matrixSize = gameBlocksGrid.length;

  // Perform the shuffle
  for (let moveCount=0; moveCount< numberOfMoves; moveCount++) {
    const blockToMoveLocation = findRandomNeighbour(emptyBlockLocation, matrixSize);

    // Switch between the blocks
    switchBetweenCells(gameBlocksGrid, emptyBlockLocation, blockToMoveLocation);

    // Update the empty block location
    emptyBlockLocation = blockToMoveLocation;
  }

  // Validate the shuffled blocks positions
  checkAndUpdateAllBlocksPositions(gameBlocksGrid);

  return {
    shuffledGmeBlocksGrid: gameBlocksGrid,
    emptyBlockLocation,
  };
}

function checkAndUpdateAllBlocksPositions(gameBlocksGrid: GameBlocksGrid) {
  const matrixSize = gameBlocksGrid.length;

  // Pass on all of the blocks to determine whether they are in their right position
  // NOTE : This is OK complexity wise because we do it only once on initialization
  for (let row = 0; row < matrixSize; row ++) {
    for (let col = 0; col < matrixSize; col ++) {
      const gameBlock = gameBlocksGrid[row][col];

      gameBlock.isInCorrectPosition = doesLocationFitsOrderIndex({ row, col }, gameBlock.blockOrderIndex, matrixSize);
    }
  }
}

/**
 * Returns a random neighbouring grid location
 */
function findRandomNeighbour(gridLocation: GridLocation, gridSize: number) : GridLocation {
  // Find all valid neighbours
  const validNeighbours = getAllValidNeighbouringGridLocations(gridLocation, gridSize);

  // Chose a random neighbour
  const randomNeighbourIndex = getRandomInt(validNeighbours.length);

  const randomNeighbour = validNeighbours[randomNeighbourIndex];

  return  randomNeighbour;
}

function getAllValidNeighbouringGridLocations(gridLocation: GridLocation, gridSize: number) : GridLocation[] {
  const validGridNeighbours: GridLocation[] = [];

  // Check in all valid directions for the existence of neighbours (ensures no out of boundary)
  VALID_GRID_NEIGHBOUR_DIRECTIONS.forEach(direction => {
    const neighbouringGridLocation : GridLocation = {
      row: gridLocation.row + direction.rowDif,
      col: gridLocation.col + direction.colDif,
    };

    // Ensures valid boundaries
    const rowInBoundaries = (neighbouringGridLocation.row >= 0) && (neighbouringGridLocation.row < gridSize);
    const colInBoundaries = (neighbouringGridLocation.col >= 0) && (neighbouringGridLocation.col < gridSize);
    if (rowInBoundaries && colInBoundaries) {
      validGridNeighbours.push(neighbouringGridLocation);
    }
  });

  return validGridNeighbours;
}

// Util Function, can be in a separate file
function getRandomInt(maxExclusiveInt: number) {
  return Math.floor(Math.random() * Math.floor(maxExclusiveInt));
}

export {
  shuffleGameBoardByNumberOfSteps,
}
