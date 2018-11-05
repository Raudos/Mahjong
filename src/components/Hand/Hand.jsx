import React from 'react';
import PropTypes from 'prop-types';

import Piece, { PieceElement } from '../Piece/Piece';
import Receiver from './Receiver/Receiver';

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
    this.state.pieces.splice(index, 0, this.state.pieces.splice(grabbedIndex, 1)[0]);

    this.setState({
      grabbed: null,
    });
  };

  handleReceiverHover = (index) => {
    this.setState({
      received: index,
    })
  };

  render() {
    const { grabbed, pieces, received } = this.state;
    console.log(this.state)
    return (
      <div className="hand">
        {pieces.map((piece, index) => (
         <React.Fragment key={piece.id}>
           <Receiver
             grabbed={grabbed}
             index={index}
             onDrop={this.handleReceiverDrop}
             onHover={this.handleReceiverHover}
             received={received}
           />

           <Piece
             grabbed={grabbed}
             index={index}
             isGrabbed={piece.id === grabbed}
             maxLength={10}
             onPieceClick={this.handlePieceClick}
             piece={piece}
           />

           {index === pieces.length -1 &&
              <Receiver
                grabbed={grabbed}
                index={pieces.length}
                onDrop={this.handleReceiverDrop}
                onHover={this.handleReceiverHover}
                received={received}
              />
           }
         </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Hand;
