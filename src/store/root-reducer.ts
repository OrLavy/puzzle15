import { combineReducers } from 'redux';

import { GameReducer } from '../redux/game/game_reducer';

const rootReducer = combineReducers({
  game: GameReducer,
});

export default rootReducer;
