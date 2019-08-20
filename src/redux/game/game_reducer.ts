import { Draft } from 'immer';
import { getType } from 'typesafe-actions';
import { createReducer } from 'redux-starter-kit';

// import { buildReducerTypeSafeHandler } from '@@TypeHelpers/reduxTypeHelpers';

import { GameState, defaultGameState } from './game_state';
import * as gameActions from './game_actions';
import {performGameMoveIfValid} from "../../gameLogic/gameLogic";

type draftState = Draft<GameState>;

export const GameReducer = createReducer<GameState>(defaultGameState, {
  [getType(gameActions.performMoveIfValid)]: performMoveIfValidHandler,
});


function performMoveIfValidHandler(state: draftState, action: ReturnType<typeof gameActions.performMoveIfValid>) {
  // Extract the block that we want to move from the payload
  const blockToMoveGridLocation = action.payload;

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
