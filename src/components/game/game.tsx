import React from 'react';

import GameGrid from '../gameGrid/gameGrid';
import GameBlock from "../../models/gameBlock";
import GameControllers from "./gameControllers/gameControllers";
import GridLocation from "../../models/gridLocation";

type Props = {
  gameBlocksGrid: GameBlock[][],
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
