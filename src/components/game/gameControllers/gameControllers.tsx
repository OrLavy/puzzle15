import React from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  setToSolvedGame: () => void,
}

const GameControllers : React.FC<Props> = (props) => {
  const { setToSolvedGame } = props;

  return (
    <div>
      <Button onClick={setToSolvedGame}>
        Set to solved game
      </Button>
      {' '}
      <Button>New Game</Button>
    </div>
);
};

export default React.memo(GameControllers);
