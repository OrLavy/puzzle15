import React from 'react';

import Button from 'react-bootstrap/Button';

import GameGrid from '../gameGrid/gameGrid';

const Game : React.FC = () => {
  return (
    <div>
      <GameGrid gridSize={4} />
    </div>
);
};

export default React.memo(Game);
