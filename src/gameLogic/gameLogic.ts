// NOTE : In real life we will use a better file structure

import GameBlock from "../models/gameBlock";
import GridLocation from "../models/gridLocation";
import GameBlocksGrid from "../models/gameBlocksGrid";
import {
  areBlocksNeighbours,
  switchBetweenBlocksInGrid,
  validateGameBlockPositionAndCloneIfNeeded
} from "./gameLogicHelpers";

/**
 * A simple helper function to build the initial 'GameBlocksGrid' and 'empty block location' (defaults to be the last block)
 * for a given matrix size.
 */
function buildInitialSquareGameBoardState(gridSize: number) : { initialGameBlocksGrid: GameBlocksGrid, initialEmptyBlockLocation: GridLocation } {
  const initialGameBlocksGrid: GameBlocksGrid = [];
  const initialEmptyBlockLocation : GridLocation = { col: gridSize - 1, row: gridSize - 1 };

  for (let row = 0; row < gridSize; row++) {
    // Initialize the row's array
    initialGameBlocksGrid[row] = [];

    const currentRow = initialGameBlocksGrid[row];

    // Add the game blocks for the row
    for (let col = 0; col < gridSize; col++) {
      // Calculate the block's correct (zero-based) order index
      const blockOrderIndex = row * gridSize + col;

      // Build the game block
      const gameBlock : GameBlock = {
        blockOrderIndex,
        isInCorrectPosition: true,
        isEmptyBLock: false,
        blockValue: blockOrderIndex + 1,
      };

      // Add the game block to the row
      currentRow[col] = gameBlock;
    }
  }

  // Override the last game block to be an empty game block
  initialGameBlocksGrid[initialEmptyBlockLocation.row][initialEmptyBlockLocation.col] = {
    // NOTE Can move the 'order index' calculation into a separate function
    blockOrderIndex: initialEmptyBlockLocation.row * gridSize + initialEmptyBlockLocation.col,
    blockValue: '',
    isEmptyBLock: true,
    isInCorrectPosition: true,
  };

  return {
    initialGameBlocksGrid,
    initialEmptyBlockLocation
  };
}

/**
 * Performs the move on the given grid if it is valid.
 */
function performGameMoveIfValid(gameBlockGrid: GameBlock[][], emptyBlockGridLocation: GridLocation, blockToMoveGridLocation: GridLocation) : GameBlocksGrid | null {
  // Ensure that the block can be moved
  if (areBlocksNeighbours(emptyBlockGridLocation, blockToMoveGridLocation)) {

    // Calculates the game block grid after the blocks switch
    const updatedGameBlockGrid = switchBetweenBlocksInGrid(gameBlockGrid, emptyBlockGridLocation, blockToMoveGridLocation);

    // Update the moved cell if needed (the moved game block is now in the original 'emptyBlockLocation')
    validateGameBlockPositionAndCloneIfNeeded(updatedGameBlockGrid, emptyBlockGridLocation);

    return updatedGameBlockGrid;
  } else {
    return null;
  }
}

export {
  buildInitialSquareGameBoardState,
  performGameMoveIfValid,
}
