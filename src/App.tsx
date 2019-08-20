import React, {useCallback, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Game from './components/game/game';
import GameBlock, {cloneGameBlock} from "./models/gameBlock";
import GridLocation from "./models/gridLocation";
import GameBlocksGrid from "./models/gameBlocksGrid";

const MATRIX_SIZE = 4;

const { initialGameBlocksGrid, initialEmptyBlockLocation } = buildInitialSquareGameBoardState(MATRIX_SIZE);

const App: React.FC = () => {
  const [emptyBlockLocation, setEmptyBlockLocation] = useState(initialEmptyBlockLocation);
  const [gameBlocksGrid, setGameBlocksGrid] = useState(initialGameBlocksGrid);

  // Memoize the callback for pressing a "game block" (Will later be change into a proper redux action).
  const performMoveOnClick = useCallback((gameBlockToMove: GridLocation) => {
    // Calculate the new game blocks grid after the move
    const newGameBlockGrid = performMoveIfValid(gameBlocksGrid, emptyBlockLocation, gameBlockToMove);

    if (newGameBlockGrid) {
      // Sets the new (or unmodified - in that case, no re-render will occur) game blocks grid
      setGameBlocksGrid(newGameBlockGrid);
      setEmptyBlockLocation(gameBlockToMove);
    }

  }, [gameBlocksGrid, emptyBlockLocation, setGameBlocksGrid]);

  return (
    <Container>
      <Row>
        <Col>
          <Game
            gameBlocksGrid={gameBlocksGrid}
            onGameBlockPressed={performMoveOnClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

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
function performMoveIfValid(gameBlockGrid: GameBlock[][], emptyBlockGridLocation: GridLocation, blockToMoveGridLocation: GridLocation) : GameBlocksGrid | null {
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
  // Get a reference to the game block
  const gameBlock = gameBlocksGrid[gridLocation.row][gridLocation.col];

  // is the new location the proper location for the game block ?
  const isInCorrectPosition = doesLocationFitsOrderIndex(gridLocation, gameBlock.blockOrderIndex);

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
function doesLocationFitsOrderIndex(gridLocation: GridLocation, blockOrderIndex: number, colsPerRow = MATRIX_SIZE) : boolean {
  return ((gridLocation.row * colsPerRow + gridLocation.col) === blockOrderIndex);
}

export default App;
