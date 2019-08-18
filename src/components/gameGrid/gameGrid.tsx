import React from 'react';
import chunk from 'lodash/chunk';

import GridRow from './GridRow';
import GameBlock from "../../models/gameBlock";

const { useMemo } = React;

type Props = {
  gridSize: number,
  gameBlocks: GameBlock[],
};



const GameGrid : React.FC<Props> = (props) => {
  const { gridSize, gameBlocks } = props;

  const blocksByRows = useMemo(() => {
    return chunk(gameBlocks, gridSize);
  }, [gridSize, gameBlocks]);

  const gridRows = useMemo(() => {
    return blocksByRows.map(blockForRow => <GridRow blocks={blockForRow}/>)
  }, [blocksByRows]);

  for (let row = 0; row < gridSize; row++) {

  }

  return (
    <div>
      {gridRows}
    </div>
  );
};

export default React.memo(GameGrid);
