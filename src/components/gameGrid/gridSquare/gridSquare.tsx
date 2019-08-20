import React, {useCallback, useMemo} from 'react';

import Button from 'react-bootstrap/Button';
import GridLocation from "../../../models/gridLocation";

type Props = {
  // Grid location props
  rowIndex: number,
  colIndex: number,

  // Display props
  displayValue: number|string,
  isInCorrectPosition: boolean,

  // Event Handlers
  onClick: (gridLocation: GridLocation) => void,
};

const GridSquare : React.FC<Props> = (props) => {
  const {
    rowIndex, colIndex,
    displayValue,
    isInCorrectPosition,
    onClick
  } = props;

  // Memoize the square's grid location + onclick callback
  const gridLocation = useMemo<GridLocation>(() => {
    const gridLocation : GridLocation = {
      row: rowIndex,
      col: colIndex,
    };

    return gridLocation;
  }, [rowIndex, colIndex]);
  const onSquareClick = useCallback(() => onClick(gridLocation), [gridLocation, onClick]);

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
    height: 100,
    border: '1px black solid',
  },
};

export default React.memo(GridSquare);
