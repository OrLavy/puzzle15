import React from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
};

const EmptyGridSquare : React.FC<Props> = () => {
  return (
    <Button
      variant="light"
      style={styles.button}
      disabled
    >
    </Button>
  );
};

const styles = {
  button: {
    width: 100,
    height: 100,
    border: '1px black solid',
  },
};

export default React.memo(EmptyGridSquare);
