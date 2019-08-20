import { createStandardAction } from 'typesafe-actions';
import GridLocation from "../../models/gridLocation";

// eslint-disable-next-line import/prefer-default-export
export const performMoveIfValid = createStandardAction('game/performMoveIfValid')<{ blockToMoveGridLocation: GridLocation }>();
export const shuffleNewGame = createStandardAction('game/shuffleNewGame')<{}>();
