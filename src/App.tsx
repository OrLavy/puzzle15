import React, {useCallback, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Game from './components/game/game';
import GameBlock from "./models/gameBlock";
import GridLocation from "./models/gridLocation";
import GameBlocksGrid from "./models/gameBlocksGrid";

const gameBlocksGridDemo: GameBlocksGrid = [
  [
    { blockId: 1, blockValue: 1, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 2, blockValue: 2, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 3, blockValue: 3, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 4, blockValue: 4, isEmptyBLock: false, isInCorrectPosition: false },
  ],
  [
    { blockId: 5, blockValue: 5, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 6, blockValue: 6, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 7, blockValue: 7, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 8, blockValue: 8, isEmptyBLock: false, isInCorrectPosition: false },
  ],
  [
    { blockId: 9,  blockValue: 9,  isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 10, blockValue: 10, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 11, blockValue: 11, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 12, blockValue: 12, isEmptyBLock: false, isInCorrectPosition: false },
  ],
  [
    { blockId: 13, blockValue: 13, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 14, blockValue: 14, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 15, blockValue: 15, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 16, blockValue: 16, isEmptyBLock: true,  isInCorrectPosition: false },
  ],
];

const initialEmptyBlockLocation : GridLocation = { col: 3, row: 3 };

const App: React.FC = () => {
  const [emptyBlockLocation, setEmptyBlockLocation] = useState(initialEmptyBlockLocation);
  const [gameBlocksGrid, setGameBlocksGrid] = useState(gameBlocksGridDemo);

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
        <Col md={{ offset: 4 }}>
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
 * Performs the move on the given grid if it is valid.
 */
function performMoveIfValid(gameBlockGrid: GameBlock[][], emptyBlockLocation: GridLocation, blockToMove: GridLocation) : GameBlocksGrid | null {
  // Ensure that the block can be moved
  if (areBlocksNeighbours(emptyBlockLocation, blockToMove)) {

    // Calculates the game block grid after the blocks switch
    const updatedGameBlockGrid = switchBetweenBlocksInGrid(gameBlockGrid, emptyBlockLocation, blockToMove);

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

export default App;
