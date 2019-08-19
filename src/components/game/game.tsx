import React from 'react';

import GameGrid from '../gameGrid/gameGrid';
import GameControllers from "./gameControllers/gameControllers";
import GridLocation from "../../models/gridLocation";
import GameBlocksGrid from "../../models/gameBlocksGrid";

type Props = {
  gameBlocksGrid: GameBlocksGrid,
  onGameBlockPressed: (gridLocation: GridLocation) => void,
}

const Game : React.FC<Props> = (props) => {
  const {
    gameBlocksGrid,
    onGameBlockPressed,
  } = props;

  return (
    <div>
      <GameControllers />
      <br/>
      <GameGrid gameBlocksGrid={gameBlocksGrid} onBlockPress={onGameBlockPressed} />
    </div>
  );
};

export default React.memo(Game);
