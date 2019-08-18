import React from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  value: number|string,
};

const BoardSquare : React.FC<Props> = (props) => {
  const { value } = props;

  return (
    <Button variant="outline-success" style={{ width: 100, height: 100 }}>{value}</Button>
  );
};

export default React.memo(BoardSquare);
