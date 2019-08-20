import React, {useCallback} from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  setToSolvedGame: () => void,
  shuffleNewGame: (movesFromSolved : number) => void,
}

const GAME_RANDOMNESS_LEVELS = {
  EASY: 10,
  MEDIUM: 50,
  HARD: 100,
};

const GameControllers : React.FC<Props> = (props) => {
  const {
    setToSolvedGame,
    shuffleNewGame,
  } = props;

  const { EASY, MEDIUM, HARD } = GAME_RANDOMNESS_LEVELS;

  const shuffleEasyGame = useCallback(() => shuffleNewGame(EASY), [shuffleNewGame, EASY]);
  const shuffleMediumGame = useCallback(() => shuffleNewGame(MEDIUM), [shuffleNewGame, MEDIUM]);
  const shuffleHardGame = useCallback(() => shuffleNewGame(HARD), [shuffleNewGame, HARD]);

  return (
    <div>
      <Button onClick={setToSolvedGame}>
        Set to solved game
      </Button>
      {' '}
      <Button onClick={shuffleEasyGame}>
        New Easy Game ({EASY} moves)
      </Button>
      {' '}
      <Button onClick={shuffleMediumGame}>
        New Medium Game ({MEDIUM} moves)
      </Button>
      {' '}
      <Button onClick={shuffleHardGame}>
        New Hard Game ({HARD} moves)
      </Button>
    </div>
);
};

export default React.memo(GameControllers);
