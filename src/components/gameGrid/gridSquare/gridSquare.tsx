import React, {useCallback} from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  squareId: number,
  displayValue: number|string,
  isInCorrectPosition: boolean,
  onClick: (blockId: number) => void,
};

const GridSquare : React.FC<Props> = (props) => {
  const {
    squareId,
    displayValue,
    isInCorrectPosition,
    onClick
  } = props;

  // Memoize the callback
  const onSquareClick = useCallback(() => onClick(squareId), [onClick, squareId]);

  // Bootstrap variant
  const variant = isInCorrectPosition ? "success" : "outline-secondary";

  return (
    <Button
      variant={variant}
      style={styles.button}
      onClick={onSquareClick}
    >
      {displayValue}
    </Button>
  );
};

const styles = {
  button: {
    width: 100,
    height: 100
  },
};

export default React.memo(GridSquare);
