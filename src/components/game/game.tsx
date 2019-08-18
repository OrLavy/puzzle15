import React from 'react';

import Button from 'react-bootstrap/Button';


const Game : React.FC = () => {
  return (
    <div>
      <Button>This is a game board</Button>
    </div>
);
};

export default React.memo(Game);
