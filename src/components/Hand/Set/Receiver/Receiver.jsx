import React from 'react';
import classNames from 'classnames';

import './receiver.scss';

class Receiver extends React.Component {
  handleMouseEnter = () => {
    this.props.onHover(this.props.index);
  };

  handleMouseOut = () => {
    this.props.onHover(null);
  };

  render() {
    const { grabbedIndex, index,  style } = this.props;

    if (grabbedIndex === null) {
      return null;
    } else if (index === grabbedIndex || grabbedIndex + 1 === index) {
      return null;
    }

    return (
      <div
        className={classNames('receiver', 'scene', { 'receiver--received': index === this.props.received }) }
        onClick={() => this.props.onDrop(this.props.index)}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
      >
        <div className='receiver__aerial' />
        <div className='receiver__shadow box show-front' style={{ transform: `translateZ(${style.perspective}px) rotateY(${style.turn}deg)` }}>
          <div className='box__face box__face--bottom'/>
        </div>
      </div>
    );
  }
}

export default Receiver;