import React from 'react';
import PropTypes from 'prop-types';

import { PieceElement } from './Set/Piece/Piece';
import Set from './Set/Set';

import './hand.scss';

class Hand extends React.Component {
  static propTypes = {
    numberOfPieces: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      grabbed: null,
      pieces: Array(this.props.numberOfPieces).fill('').map(() => new PieceElement()),
      received: null,
    };
  }

  handlePieceClick = (id = null) => {
    this.setState({
      grabbed: id
    });
  };

  handleReceiverDrop = (index) => {
    const grabbedIndex = this.state.pieces.findIndex(elem => elem.id === this.state.grabbed);
    const targetIndex = grabbedIndex < index ? index - 1 : index;

    this.state.pieces.splice(targetIndex, 0, this.state.pieces.splice(grabbedIndex, 1)[0]);

    this.setState({
      grabbed: null,
      received: null,
    });
  };

  handleReceiverHover = (index) => {
    this.setState({
      received: index,
    })
  };

  render() {
    const { grabbed, pieces, received } = this.state;

    return (
      <div className="hand">
        {pieces.map((piece, index) => (
          <Set
            key={piece.id}
            grabbed={grabbed}
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
