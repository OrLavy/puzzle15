import React from 'react';

import Button from 'react-bootstrap/Button';


const GameControllers : React.FC = () => {
  return (
    <div>
      <Button>New Game</Button>
    </div>
);
};

export default React.memo(GameControllers);
