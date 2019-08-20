import React, {useCallback} from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  setToSolvedGame: () => void,
  shuffleNewGame: (movesFromSolved : number) => void,
}

const GameControllers : React.FC<Props> = (props) => {
  const {
    setToSolvedGame,
    shuffleNewGame,
  } = props;

  const shuffleEasyGame = useCallback(() => shuffleNewGame(10), [shuffleNewGame]);
  const shuffleMediumGame = useCallback(() => shuffleNewGame(20), [shuffleNewGame]);
  const shuffleHardGame = useCallback(() => shuffleNewGame(50), [shuffleNewGame]);

  return (
    <div>
      <Button onClick={setToSolvedGame}>
        Set to solved game
      </Button>
      {' '}
      <Button onClick={shuffleEasyGame}>
        New Easy Game
      </Button>
      {' '}
      <Button onClick={shuffleMediumGame}>
        New Medium Game
      </Button>
      {' '}
      <Button onClick={shuffleHardGame}>
        New Hard Game
      </Button>
    </div>
);
};

export default React.memo(GameControllers);
