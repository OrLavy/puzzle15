import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GameControllers from './components/gameControllers/gameControllers';
import Game from './components/game/game';

const App: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ offset: 4 }}> <GameControllers /> </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={{ offset: 4 }}> <Game /> </Col>
      </Row>
    </Container>
  );
}

export default App;
