import React from 'react';

import Button from 'react-bootstrap/Button';

import BoardSquare from '../boardSquare/boardSquare';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
  gridSize: number,
};

const GameGrid : React.FC<Props> = (props) => {
  return (
    <div>
      <Row>
        <BoardSquare value={1}/>
        <BoardSquare value={2}/>
        <BoardSquare value={3}/>
        <BoardSquare value={4}/>
      </Row>
      <Row>
        <BoardSquare value={5}/>
        <BoardSquare value={6}/>
        <BoardSquare value={7}/>
        <BoardSquare value={8}/>
      </Row>
      <Row>
        <BoardSquare value={9}/>
        <BoardSquare value={10}/>
        <BoardSquare value={11}/>
        <BoardSquare value={12}/>
      </Row>
      <Row>
        <BoardSquare value={13}/>
        <BoardSquare value={14}/>
        <BoardSquare value={15}/>
        <BoardSquare value={16}/>
      </Row>
    </div>
  );
};

export default React.memo(GameGrid);
