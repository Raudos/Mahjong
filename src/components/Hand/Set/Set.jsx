import React from 'react';
import PropTypes from 'prop-types';

import Receiver from "./Receiver/Receiver";
import Piece from "./Piece/Piece";

class Set extends React.Component {
  static propTypes = {
    grabbed: PropTypes.string,
    grabbedIndex: PropTypes.number,
    index: PropTypes.number.isRequired,
    maxLength: PropTypes.number.isRequired,
    maxTurn: PropTypes.number,
    minPerspective: PropTypes.number,
    onDrop: PropTypes.func.isRequired,
    onHover: PropTypes.func.isRequired,
    onPieceClick: PropTypes.func.isRequired,
    perspectiveChange: PropTypes.number,
    piece: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    received: PropTypes.number,
  };

  static defaultProps = {
    maxTurn: 15,
    minPerspective: -50,
    perspectiveChange: 20,
  };

  calculatePerspective = () => {
    const { index, maxLength, minPerspective, perspectiveChange } = this.props;
    const half = maxLength / 2;
    let perspective = minPerspective;

    if (index <= half) {
      perspective -= perspectiveChange * index;
    } else {
      perspective = perspective - (half * perspectiveChange);
      perspective -= perspectiveChange * (half - index);
    }

    return perspective;
  };

  calculateTurn = () => {
    const { index, maxLength, maxTurn } = this.props;
    const isEven = !(maxLength%2);
    const half = Math.floor(maxLength/2);
    const turnPerPiece = maxTurn / half;

    if (isEven) {
      if (index < half - 1) {
        return turnPerPiece * ((half - 1) - index);
      } else if (index > half) {
        return -(turnPerPiece * (index - half));
      }

      return 0;
    } else {
      if (index < half) {
        return turnPerPiece * (half - index);
      } else if (index === half) {
        return 0;
      }

      return -(turnPerPiece * (index - half));
    }
  };

  calculateZIndex = () => {
    const { index, maxLength } = this.props;

    const half = maxLength/2;

    if (index <= half) {
      return 100 - index;
    }

    return index;
  };

  render() {
    const { grabbedIndex, index, maxLength, onDrop, onHover, onPieceClick, piece, received } = this.props;
    const style = {
      perspective: this.calculatePerspective(),
      turn: this.calculateTurn(),
      zIndex: this.calculateZIndex(),
    };

    return (
      <React.Fragment>
        <Receiver
          grabbedIndex={grabbedIndex}
          index={index}
          onDrop={onDrop}
          onHover={onHover}
          received={received}
          style={style}
        />

        <Piece
          index={index}
          isGrabbed={index === grabbedIndex}
          maxLength={maxLength}
          onPieceClick={onPieceClick}
          piece={piece}
          style={style}
        />

        {index === maxLength -1 &&
          <Receiver
            grabbedIndex={grabbedIndex}
            index={maxLength}
            onDrop={onDrop}
            onHover={onHover}
            received={received}
            style={style}
          />
        }
      </React.Fragment>
    );
  }
}

export default Set;
