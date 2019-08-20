// NOTE : In real life we will use a better file structure

import GameBlock, { cloneGameBlock } from "../models/gameBlock";
import GridLocation from "../models/gridLocation";
import GameBlocksGrid from "../models/gameBlocksGrid";

/**
 * Checks whether the given grid locations are neighbours.
 */
function areBlocksNeighbours(locationA: GridLocation, locationB: GridLocation) : boolean {
  // Assumes valid (non negative) location indexes

  const absRowDif = Math.abs(locationA.row - locationB.row);
  const absColDif = Math.abs(locationA.col - locationB.col);

  // Check for both types of allowed neighbours
  const sameColNeighbours = (absColDif === 0) && (absRowDif === 1);
  const sameRowNeighbours = (absRowDif === 0) && (absColDif === 1);

  return sameColNeighbours || sameRowNeighbours;
}

/**
 * Switches between the given blocks while keeping immutability for the effected and un-effected rows
 */
function switchBetweenBlocksInGrid(gameBlockGrid: GameBlock[][], blockA: GridLocation, blockB: GridLocation) : GameBlocksGrid {
  let gameBlocksGridAfterSwitch = gameBlockGrid;

  // Extra security
  if (!areBlocksNeighbours(blockA, blockB)) {
    // NOTE : In real life will have a proper error handling (logs + ui display)
    alert(`Illegal block-switch request between ${JSON.stringify(blockA)} and ${JSON.stringify(blockB)}`)
  } else {
    // Are we switching blocks in the same row ?
    if (blockA.row === blockB.row) {
      const rowIndex = blockA.row;
      gameBlocksGridAfterSwitch = switchBetweenBlocksInTheSameRow(gameBlockGrid, rowIndex, blockA.col, blockB.col);
    } else { // We are switching between blocks in the same col
      const colIndex = blockA.col;
      gameBlocksGridAfterSwitch = switchBetweenBlocksInTheSameCol(gameBlockGrid, colIndex, blockA.row, blockB.row);
    }
  }

  return gameBlocksGridAfterSwitch;
}

/**
 * Switches between the blocks by the given row and cols while keeping immutability for the effected and un-effected rows
 */
function switchBetweenBlocksInTheSameRow(gameBlocksGrid: GameBlock[][], row: number, colA: number, colB: number) : GameBlocksGrid{
  // NOTE : Can add another validity check here, skipping it for simplicity

  // Shallow copy all rows
  const updatedGameBlocksGRid = cloneGameBlocksGrid(gameBlocksGrid, [row]);

  // switch between the blocks
  switchBetweenCells(updatedGameBlocksGRid, { row, col: colA }, { row, col: colB });

  return updatedGameBlocksGRid;
}

/**
 * Switches between the blocks in the given col and rows while keeping immutability for the effected and un-effected rows
 */
function switchBetweenBlocksInTheSameCol(gameBlocksGrid: GameBlocksGrid, col: number, rowA: number, rowB: number) : GameBlocksGrid {
  // NOTE : Can add another validity check here, skipping it for simplicity

  // Creates a clone for the given game board
  const updatedGameBlocksGRid = cloneGameBlocksGrid(gameBlocksGrid, [rowA, rowB]);

  // Switch between the cells
  switchBetweenCells(updatedGameBlocksGRid, { row: rowA, col: col }, { row: rowB, col: col });

  return updatedGameBlocksGRid;
}

/**
 * Creates a shallow copy for the given game block grid rows, while also creating a shallow copy for the
 * affected rows (while keeping the same reference for the unaffected rows)
 */
function cloneGameBlocksGrid(gameBlocksGrid: GameBlocksGrid, mutatedRowsIndexes : number[] = []) : GameBlocksGrid {
  // Shallow copy all rows
  const updatedGameBlockGRid = [...gameBlocksGrid];

  // Shallow copy affected rows content
  mutatedRowsIndexes.forEach(mutatedRowIndex => {
    updatedGameBlockGRid[mutatedRowIndex] = [...gameBlocksGrid[mutatedRowIndex]];
  });

  return updatedGameBlockGRid;
}

/**
 * Switches the cells with the given locations in the given GameBlocksGrid.
 */
function switchBetweenCells(gameBlocksGrid: GameBlocksGrid, locationA: GridLocation, locationB: GridLocation) : void {
  // Get a reference for the cells
  const celA = gameBlocksGrid[locationA.row][locationA.col];
  const celB = gameBlocksGrid[locationB.row][locationB.col];

  // Switch between the locations
  gameBlocksGrid[locationA.row][locationA.col] = celB;
  gameBlocksGrid[locationB.row][locationB.col] = celA;
}

/**
 * Checks if there was a change in the 'isInCorrectPosition' value for the cell, and if so, clones it and
 * sets the proper value.
 */
function validateGameBlockPositionAndCloneIfNeeded(gameBlocksGrid: GameBlocksGrid, gridLocation: GridLocation) {
  const matrixSize = gameBlocksGrid.length;

  // Get a reference to the game block
  const gameBlock = gameBlocksGrid[gridLocation.row][gridLocation.col];

  // is the new location the proper location for the game block ?
  const isInCorrectPosition = doesLocationFitsOrderIndex(gridLocation, gameBlock.blockOrderIndex, matrixSize);

  // If the game block 'correct position' value has changed, then we should clone it and set the proper value
  if (gameBlock.isInCorrectPosition !== isInCorrectPosition) {
    // Replace the game block in the given location with its clone
    gameBlocksGrid[gridLocation.row][gridLocation.col] = cloneGameBlock(gameBlock);

    // Set the 'isInCorrectPosition' value
    gameBlocksGrid[gridLocation.row][gridLocation.col].isInCorrectPosition = isInCorrectPosition;
  }
}

/**
 * Checks if the given grid location fits the given game block index
 */
function doesLocationFitsOrderIndex(gridLocation: GridLocation, blockOrderIndex: number, colsPerRow: number) : boolean {
  return ((gridLocation.row * colsPerRow + gridLocation.col) === blockOrderIndex);
}

export {
  areBlocksNeighbours,
  switchBetweenBlocksInGrid,
  validateGameBlockPositionAndCloneIfNeeded,
  switchBetweenCells,
  doesLocationFitsOrderIndex,
}
