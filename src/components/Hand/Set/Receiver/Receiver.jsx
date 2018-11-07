import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './receiver.scss';

const Receiver = props => {
  const { grabbedIndex, index, onDrop, onHover, received, style } = props;

  if (grabbedIndex === null) {
    return null;
  } else if (index === grabbedIndex || grabbedIndex + 1 === index) {
    return null;
  }

  return (
    <div
      className={classNames('receiver', 'scene', { 'receiver--received': index === received }) }
      onClick={() => onDrop(props.index)}
      onMouseEnter={() => onHover(index)}
      onMouseOut={() => onHover(null)}
    >
      <div className='receiver__aerial' />
      <div className='receiver__shadow box show-front' style={{ transform: `translateZ(${style.perspective}px) rotateY(${style.turn}deg)` }}>
        <div className='box__face box__face--bottom'/>
      </div>
    </div>
  );
};

Receiver.propTypes = {
  grabbedIndex: PropTypes.number,
  index: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  received: PropTypes.number,
  style: PropTypes.shape({
    perspective: PropTypes.number.isRequired,
    turn: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
  }),
};

export default Receiver;