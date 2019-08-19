import React from 'react';

import GameGrid from '../gameGrid/gameGrid';
import GameBlock from "../../models/gameBlock";
import GameControllers from "./gameControllers/gameControllers";

const gameBlocks: GameBlock[] = [
  { blockId: 1, blockValue: 1, isEmptyBLock: false, isInCorrectPosition: false },
  { blockId: 2, blockValue: 2, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 3, blockValue: 3, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 4, blockValue: 4, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 5, blockValue: 5, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 6, blockValue: 6, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 7, blockValue: 7, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 8, blockValue: 8, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 9, blockValue: 9, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 10, blockValue: 10, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 11, blockValue: 11, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 12, blockValue: 12, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 13, blockValue: 13, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 14, blockValue: 14, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 15, blockValue: 15, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockId: 16, blockValue: 16, isEmptyBLock: false, isInCorrectPosition: false  },
];

const Game : React.FC = () => {
  return (
    <div>
      <GameControllers />
      <br/>
      <GameGrid gridSize={4} gameBlocks={gameBlocks} onBlockPress={blockId => console.log(blockId)} />
    </div>
);
};

export default React.memo(Game);
