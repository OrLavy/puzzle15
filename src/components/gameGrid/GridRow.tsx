import GameBlock from "../../models/gameBlock";
import React from "react";
import GridSquare from "./gridSquare/gridSquare";
import Row from "react-bootstrap/Row";

const { useMemo } = React;

type GridRowProps = {
  blocks: GameBlock[],
  onBlockPress: (blockId: number) => void,
}

const GridRow : React.FC<GridRowProps> = (props) => {
  const {
    blocks,
    onBlockPress
  } = props;

  const gridSquares = useMemo(() => {
    // Maps to a grid square or an empty block (represented by null)
    return blocks.map(gameBlock => ( gameBlock.isEmptyBLock ?
      null :
      <GridSquare
        key= {gameBlock.blockValue}
        squareId={gameBlock.blockId}
        displayValue={gameBlock.blockValue}
        isInCorrectPosition={gameBlock.isInCorrectPosition}
        onClick={onBlockPress}
      />))
  }, [blocks, onBlockPress]);

  return (
    <Row>
      {gridSquares}
    </Row>
  )
};

export default React.memo(GridRow);
