import GameBlock from "../../models/gameBlock";
import React from "react";
import GridSquare from "./gridSquare/gridSquare";
import Row from "react-bootstrap/Row";
import GridLocation from "../../models/gridLocation";

const { useMemo } = React;

type GridRowProps = {
  rowIndex: number,
  blocks: GameBlock[],
  onBlockPress: (gridLocation: GridLocation) => void,
}

const GridRow : React.FC<GridRowProps> = (props) => {
  const {
    blocks,
    onBlockPress,
    rowIndex
  } = props;

  // Memoize the grid squares of the row
  const gridSquares = useMemo(() => {
    // Maps to a grid square or an empty block (represented by null)
    return blocks.map((gameBlock, colIndex) => ( gameBlock.isEmptyBLock ?
      null :
      <GridSquare
        // Key
        key= {gameBlock.blockValue}

        // Grid location
        rowIndex={rowIndex}
        colIndex={colIndex}

        // Display props
        displayValue={gameBlock.blockValue}
        isInCorrectPosition={gameBlock.isInCorrectPosition}

        // Event handlers
        onClick={onBlockPress}
      />))
  }, [ rowIndex, blocks, onBlockPress]);

  return (
    <Row>
      {gridSquares}
    </Row>
  )
};

export default React.memo(GridRow);
