import React from 'react';

import GridRow from './GridRow';
import GameBlock from "../../models/gameBlock";
import GridLocation from "../../models/gridLocation";

const { useMemo } = React;

type Props = {
  // Live data props
  gameBlocksGrid: GameBlock[][],

  // Event Handlers
  onBlockPress: (gridLocation: GridLocation) => void,
};

// Note : Intentionally allowing for any shape of grid (as long as it row-based)
//        This allows the 'GameGrid' and all lower level component to be as "dumb" as possible
//        while keeping the actual logic at the top level.

const GameGrid : React.FC<Props> = (props) => {
  const { gameBlocksGrid, onBlockPress } = props;

  // Memoize the grid rows
  const gridRows = useMemo(() => {
    // NOTE : We can safely use "index as key" because the order of the rows will not change. nor will rows will be added/removed.
    //        Otherwise we would have used a more complex key.
    return gameBlocksGrid.map((blockForRow, index) => <GridRow key={index} rowIndex={index} blocks={blockForRow} onBlockPress={onBlockPress} />)
  }, [gameBlocksGrid, onBlockPress]);

  return (
    <div>
      {gridRows}
    </div>
  );
};

export default React.memo(GameGrid);
