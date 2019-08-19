import React from 'react';

import GameGrid from '../gameGrid/gameGrid';
import GameBlock from "../../models/gameBlock";
import GameControllers from "../gameControllers/gameControllers";

const gameBlocks: GameBlock[] = [
  { blockValue: 1, isEmptyBLock: false, isInCorrectPosition: false },
  { blockValue: 2, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 3, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 4, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 5, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 6, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 7, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 8, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 9, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 10, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 11, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 12, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 13, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 14, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 15, isEmptyBLock: false, isInCorrectPosition: false  },
  { blockValue: 16, isEmptyBLock: false, isInCorrectPosition: false  },
];

const Game : React.FC = () => {
  return (
    <div>
      <GameControllers />
      <br/>
      <GameGrid gridSize={4} gameBlocks={gameBlocks} />
    </div>
);
};

export default React.memo(Game);
