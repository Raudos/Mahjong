import React from 'react';
import PropTypes from 'prop-types';

import PieceElement from '../../models/piece';
import Set from './Set/Set';

import './hand.scss';

class Hand extends React.Component {
  static propTypes = {
    numberOfPieces: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      grabbedIndex: null,
      pieces: Array(this.props.numberOfPieces).fill('').map(() => new PieceElement()),
      received: null,
    };
  }

  handlePieceClick = (id = null) => {
    this.setState(state => ({
      grabbedIndex: id ? state.pieces.findIndex(obj => obj.id === id) : null,
    }));
  };

  handleReceiverDrop = (index) => {
    const { grabbedIndex } = this.state;
    const targetIndex = grabbedIndex < index ? index - 1 : index;

    this.state.pieces.splice(targetIndex, 0, this.state.pieces.splice(grabbedIndex, 1)[0]);

    this.setState({
      grabbedIndex: null,
      received: null,
    });
  };

  handleReceiverHover = (index) => {
    this.setState({
      received: index,
    })
  };

  render() {
    const { grabbedIndex, pieces, received } = this.state;

    return (
      <div className="hand">
        {pieces.map((piece, index) => (
          <Set
            key={piece.id}
            grabbedIndex={grabbedIndex}
            index={index}
            maxLength={pieces.length}
            onDrop={this.handleReceiverDrop}
            onHover={this.handleReceiverHover}
            onPieceClick={this.handlePieceClick}
            piece={piece}
            received={received}
          />
        ))}
      </div>
    );
  }
}

export default Hand;
