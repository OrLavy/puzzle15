import GameBlock from "../../models/gameBlock";
import React from "react";
import GridSquare from "./gridSquare/gridSquare";
import Row from "react-bootstrap/Row";

const { useMemo } = React;

type GridRowProps = {
  blocks: GameBlock[],
}

const GridRow : React.FC<GridRowProps> = (props) => {
  const { blocks } = props;

  const gridSquares = useMemo(() => {
    // Maps to a grid square or an empty block (represented by null)
    return blocks.map(gameBlock => ( gameBlock.isEmptyBLock ?
      null :
      <GridSquare key= {gameBlock.blockValue} value={gameBlock.blockValue} isInCorrectPosition={gameBlock.isInCorrectPosition}/>))
  }, [blocks]);

  return (
    <Row>
      {gridSquares}
    </Row>
  )
};

export default React.memo(GridRow);
