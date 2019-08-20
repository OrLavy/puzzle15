// NOTE : In real life we will have better files structure.

import GameBlocksGrid from "../../models/gameBlocksGrid";
import GridLocation from "../../models/gridLocation";

export interface GameState {
  gameBlocksGrid: GameBlocksGrid,
  emptyBlockLocation: GridLocation,
}

export const defaultGameState : GameState = {
  emptyBlockLocation: { col: 0, row: 0},
  gameBlocksGrid: [],
};
