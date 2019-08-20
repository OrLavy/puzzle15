import React from 'react';

import GameGrid from '../gameGrid/gameGrid';
import GameControllers from "./gameControllers/gameControllers";
import GridLocation from "../../models/gridLocation";
import GameBlocksGrid from "../../models/gameBlocksGrid";

type Props = {
  // Game data props
  gameBlocksGrid: GameBlocksGrid,

  // Game events handlers
  onGameBlockPressed: (gridLocation: GridLocation) => void,

  // Game controllers actions
  setToSolvedGame: () => void,
  shuffleNewGame: (movesFromSolved : number) => void,
}

const Game : React.FC<Props> = (props) => {
  const {
    // Game data props
    gameBlocksGrid,

    // Game events handlers
    onGameBlockPressed,

    // Game controllers actions
    setToSolvedGame,
    shuffleNewGame,
  } = props;

  return (
    <div>
      <GameControllers
          setToSolvedGame={setToSolvedGame}
          shuffleNewGame={shuffleNewGame}
      />
      <br/>
      <GameGrid gameBlocksGrid={gameBlocksGrid} onBlockPress={onGameBlockPressed} />
    </div>
  );
};

export default React.memo(Game);
