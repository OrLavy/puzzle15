import React from 'react';

import Button from 'react-bootstrap/Button';

import GameGrid from '../gameGrid/gameGrid';
import GameBlock from "../../models/gameBlock";

const gameBlocks: GameBlock[] = [
  { blockValue: 1 },
  { blockValue: 2 },
  { blockValue: 3 },
  { blockValue: 4 },
  { blockValue: 5 },
  { blockValue: 6 },
  { blockValue: 7 },
  { blockValue: 8 },
  { blockValue: 9 },
  { blockValue: 10 },
  { blockValue: 11 },
  { blockValue: 12 },
  { blockValue: 13 },
  { blockValue: 14 },
  { blockValue: 15 },
  { blockValue: 16 },
];

const Game : React.FC = () => {
  return (
    <div>
      <GameGrid gridSize={4} gameBlocks={gameBlocks} />
    </div>
);
};

export default React.memo(Game);
