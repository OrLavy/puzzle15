type GameBlock = {
  readonly blockOrderIndex: number,
  readonly blockValue: number|string,
  readonly isEmptyBLock: boolean,
  isInCorrectPosition: boolean,
}

/**
 * Creates a clone of the given game block
 */
function cloneGameBlock(gameBlock: GameBlock) {
  const gameBlockClone : GameBlock = {
    blockOrderIndex: gameBlock.blockOrderIndex,
    blockValue: gameBlock.blockValue,
    isEmptyBLock: gameBlock.isEmptyBLock,
    isInCorrectPosition: gameBlock.isInCorrectPosition
  };

  return gameBlockClone;
}

export default GameBlock;

export {
  cloneGameBlock,
};
