import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Game from './components/game/game';

const App: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={{ offset: 4 }}> <Game /> </Col>
      </Row>
    </Container>
  );
}

export default App;
