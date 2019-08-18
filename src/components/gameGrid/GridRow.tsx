import GameBlock from "../../models/gameBlock";
import React from "react";
import GridSquare from "../gridSquare/gridSquare";
import Row from "react-bootstrap/Row";

const { useMemo } = React;

type GridRowProps = {
  blocks: GameBlock[],
}

const GridRow : React.FC<GridRowProps> = (props) => {
  const { blocks } = props;

  const gridSquares = useMemo(() => {
    return blocks.map(gameBlock => <GridSquare key= {gameBlock.blockValue} value={gameBlock.blockValue}/>)
  }, [blocks]);

  return (
    <Row>
      {gridSquares}
    </Row>
  )
};

export default React.memo(GridRow);
