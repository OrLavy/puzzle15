import React, {useCallback} from 'react';
import { connect } from 'react-redux'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import RootState from './store/root-state';

import Game from './components/game/game';

import { performMoveIfValid } from './redux/game/game_actions';
import GridLocation from "./models/gridLocation";

const mapStateToProps = (state: RootState) => {
  return {
    gameBlocksGrid: state.game.gameBlocksGrid,
  }
};

const mapDispatchToProps = {
  performMoveIfValid: performMoveIfValid,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App: React.FC<Props> = React.memo((props) => {
  const {
    gameBlocksGrid,
    performMoveIfValid,
  } = props;

  const memoPerformMoveIfValid = useCallback((gridLocation: GridLocation) => {
    performMoveIfValid({ blockToMoveGridLocation: gridLocation });
  }, [performMoveIfValid]);

  return (
    <Container>
      <Row>
        <Col>
          <Game
            gameBlocksGrid={gameBlocksGrid}
            onGameBlockPressed={memoPerformMoveIfValid}
          />
        </Col>
      </Row>
    </Container>
  );
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
