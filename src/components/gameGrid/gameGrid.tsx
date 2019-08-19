import React from 'react';
import chunk from 'lodash/chunk';

import GridRow from './GridRow';
import GameBlock from "../../models/gameBlock";

const { useMemo } = React;

type Props = {
  // Technical data
  gridSize: number,

  // Live data props
  gameBlocks: GameBlock[],

  // Event Handlers
  onBlockPress: (blockId: number) => void,
};

const GameGrid : React.FC<Props> = (props) => {
  const { gridSize, gameBlocks, onBlockPress } = props;

  const blocksByRows = useMemo(() => {
    return chunk(gameBlocks, gridSize);
  }, [gridSize, gameBlocks]);

  const gridRows = useMemo(() => {
    return blocksByRows.map((blockForRow, index) => <GridRow blocks={blockForRow} onBlockPress={onBlockPress} />)
  }, [blocksByRows, onBlockPress]);

  for (let row = 0; row < gridSize; row++) {

  }

  return (
    <div>
      {gridRows}
    </div>
  );
};

export default React.memo(GameGrid);
