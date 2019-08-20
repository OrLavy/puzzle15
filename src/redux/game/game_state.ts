// NOTE : In real life we will have better files structure.

import GameBlocksGrid from "../../models/gameBlocksGrid";
import GridLocation from "../../models/gridLocation";
import {buildInitialSquareGameBoardState} from "../../gameLogic/gameLogic";
import {MATRIX_SIZE} from "../../gameLogic/gameConstants";

export interface GameState {
  gameBlocksGrid: GameBlocksGrid,
  emptyBlockLocation: GridLocation,
}

// Creates the default state
const { initialGameBlocksGrid, initialEmptyBlockLocation } = buildInitialSquareGameBoardState(MATRIX_SIZE);

export const defaultGameState : GameState = {
  emptyBlockLocation: initialEmptyBlockLocation,
  gameBlocksGrid: initialGameBlocksGrid,
};
