import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Game from './components/game/game';
import GameBlock from "./models/gameBlock";
import GridLocation from "./models/gridLocation";

const gameBlocksGridDemo: GameBlock[][] = [
  [
    { blockId: 1, blockValue: 1, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 2, blockValue: 2, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 3, blockValue: 3, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 4, blockValue: 4, isEmptyBLock: false, isInCorrectPosition: false },
  ],
  [
    { blockId: 5, blockValue: 5, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 6, blockValue: 6, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 7, blockValue: 7, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 8, blockValue: 8, isEmptyBLock: false, isInCorrectPosition: false },
  ],
  [
    { blockId: 9,  blockValue: 9,  isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 10, blockValue: 10, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 11, blockValue: 11, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 12, blockValue: 12, isEmptyBLock: false, isInCorrectPosition: false },
  ],
  [
    { blockId: 13, blockValue: 13, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 14, blockValue: 14, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 15, blockValue: 15, isEmptyBLock: false, isInCorrectPosition: false },
    { blockId: 16, blockValue: 16, isEmptyBLock: true,  isInCorrectPosition: false },
  ],
];

const initialEmptyBlockLocation : GridLocation = { col: 3, row: 3 };

const App: React.FC = () => {
  const [emptyBlockLocation, setEmptyBlockLocation] = useState(initialEmptyBlockLocation);
  const [gameBlocksGrid, setGameBlocksGrid] = useState(gameBlocksGridDemo);

  return (
    <Container>
      <Row>
        <Col md={{ offset: 4 }}>
          <Game
            gameBlocksGrid={gameBlocksGrid}
            onGameBlockPressed={gridLocation => console.log(gridLocation)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
