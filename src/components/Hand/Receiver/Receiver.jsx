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
    if (!this.props.grabbed) {
      return null;
    }

    return (
      <div onClick={() => this.props.onDrop(this.props.index)} onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} className={classNames('receiver', { 'receiver--received': this.props.index === this.props.received })}>
        <div className='receiver__aerial' />
      </div>
    );
  }
}

export default Receiver;