import { Draft } from 'immer';
import { getType } from 'typesafe-actions';
import { createReducer } from 'redux-starter-kit';

// import { buildReducerTypeSafeHandler } from '@@TypeHelpers/reduxTypeHelpers';

import { GameState, defaultGameState } from './game_state';
import * as gameActions from './game_actions';
import {
  buildInitialSquareGameBoardState,
  buildShuffledGameBoardState,
  performGameMoveIfValid
} from "../../gameLogic/gameLogic";
import {MATRIX_SIZE} from "../../gameLogic/gameConstants";

type draftState = Draft<GameState>;

export const GameReducer = createReducer<GameState>(defaultGameState, {
  [getType(gameActions.performMoveIfValid)]: performMoveIfValidHandler,
  [getType(gameActions.setToSolvedPosition)]: setToSolvedPositionHandler,
  [getType(gameActions.shuffleNewGame)]: shuffleNewGameHandler,
});


function performMoveIfValidHandler(state: draftState, action: ReturnType<typeof gameActions.performMoveIfValid>) : void {
  // Extract the block that we want to move from the payload
  const { blockToMoveGridLocation } = action.payload;

  // Calculate the new game blocks grid after the move
  const newGameBlocksGrid = performGameMoveIfValid(state.gameBlocksGrid, state.emptyBlockLocation, blockToMoveGridLocation);

  // If the requested move was valid, we should have a new game blocks grid
  if (newGameBlocksGrid) {
    // Important note:  We can 'directly mutate the state' (actually mutating a draft of the original state)
    //                  because we are using the 'immer' library.

    // Sets the new game blocks grid
    state.gameBlocksGrid = newGameBlocksGrid;

    // If the move was valid, the empty block now sits in the location of the moved block
    state.emptyBlockLocation = blockToMoveGridLocation;
  }
}

function setToSolvedPositionHandler(state: draftState, action: ReturnType<typeof gameActions.performMoveIfValid>) : void {
  const { initialGameBlocksGrid, initialEmptyBlockLocation } = buildInitialSquareGameBoardState(MATRIX_SIZE);

  // Important note:  We can 'directly mutate the state' (actually mutating a draft of the original state)
  //                  because we are using the 'immer' library.

  // Sets the initial game blocks grid
  state.gameBlocksGrid = initialGameBlocksGrid;

  // Sets the initial empty block location
  state.emptyBlockLocation = initialEmptyBlockLocation;
}

function shuffleNewGameHandler(state: draftState, action: ReturnType<typeof gameActions.shuffleNewGame>) : void {
  // Extract the 'movesFromStart' from the payload
  const { movesFromStart } = action.payload;

  console.log(`Will shuffle new game with ${movesFromStart} moves`);

  const { shuffledGmeBlocksGrid, emptyBlockLocation } = buildShuffledGameBoardState(MATRIX_SIZE, movesFromStart);

  // Important note:  We can 'directly mutate the state' (actually mutating a draft of the original state)
  //                  because we are using the 'immer' library.

  // Sets shuffled game blocks grid
  state.gameBlocksGrid = shuffledGmeBlocksGrid;

  // Set the current location of the empty block
  state.emptyBlockLocation = emptyBlockLocation;
}
