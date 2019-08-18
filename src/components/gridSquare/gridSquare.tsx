import React from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  value: number|string,
  isInCorrectPosition: boolean,
};

const GridSquare : React.FC<Props> = (props) => {
  const { value, isInCorrectPosition } = props;

  const variant = isInCorrectPosition ? "success" : "outline-secondary";

  return (
    <Button variant={variant} style={{ width: 100, height: 100 }}>{value}</Button>
  );
};

export default React.memo(GridSquare);
