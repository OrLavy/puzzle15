import { Draft } from 'immer';
import { getType } from 'typesafe-actions';
import { createReducer } from 'redux-starter-kit';

// import { buildReducerTypeSafeHandler } from '@@TypeHelpers/reduxTypeHelpers';

import { GameState, defaultGameState } from './game_state';
import * as gameActions from './game_actions';

type draftState = Draft<GameState>;

export const GameReducer = createReducer<GameState>(defaultGameState, {
  [getType(gameActions.moveGameBlock)]: moveGameBlockHandler,
});


function moveGameBlockHandler(state: draftState, action: ReturnType<typeof gameActions.moveGameBlock>) {
  // eslint-disable-next-line no-empty-pattern
  const { blockToMoveGridLocation } = action.payload;

  // Update state here
}
