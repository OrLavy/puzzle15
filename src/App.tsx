import React, {useCallback, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Game from './components/game/game';
import GridLocation from "./models/gridLocation";
import { buildInitialSquareGameBoardState, performMoveIfValid } from "./gameLogic/gameLogic";
import { MATRIX_SIZE } from "./gameLogic/gameConstants";

const { initialGameBlocksGrid, initialEmptyBlockLocation } = buildInitialSquareGameBoardState(MATRIX_SIZE);

const App: React.FC = () => {
  const [emptyBlockLocation, setEmptyBlockLocation] = useState(initialEmptyBlockLocation);
  const [gameBlocksGrid, setGameBlocksGrid] = useState(initialGameBlocksGrid);

  // Memoize the callback for pressing a "game block" (Will later be change into a proper redux action).
  const performMoveOnClick = useCallback((gameBlockToMove: GridLocation) => {
    // Calculate the new game blocks grid after the move
    const newGameBlockGrid = performMoveIfValid(gameBlocksGrid, emptyBlockLocation, gameBlockToMove);

    if (newGameBlockGrid) {
      // Sets the new (or unmodified - in that case, no re-render will occur) game blocks grid
      setGameBlocksGrid(newGameBlockGrid);
      setEmptyBlockLocation(gameBlockToMove);
    }

  }, [gameBlocksGrid, emptyBlockLocation, setGameBlocksGrid]);

  return (
    <Container>
      <Row>
        <Col>
          <Game
            gameBlocksGrid={gameBlocksGrid}
            onGameBlockPressed={performMoveOnClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

