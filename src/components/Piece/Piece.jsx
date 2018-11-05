import React from 'react';
import PropTypes from 'prop-types';
import shortid from "shortid";
import classNames from 'classnames';

import './piece.scss';

class Piece extends React.Component {
  static propTypes = {
    grabbed: PropTypes.string,
    index: PropTypes.number.isRequired,
    isGrabbed: PropTypes.bool.isRequired,
    maxLength: PropTypes.number.isRequired,
    maxTurn: PropTypes.number,
    minPerspective: PropTypes.number,
    onPieceClick: PropTypes.func.isRequired,
    perspectiveChange: PropTypes.number,
    piece: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
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

    return maxTurn - ((maxTurn / maxLength * 2) * index);
  };

  calculateZIndex = () => {
    const { index, maxLength } = this.props;

    const half = maxLength/2;

    if (index <= half) {
      return 100 - index;
    }

    return index;
  };

  handleClick = () => {
    this.props.onPieceClick(this.props.isGrabbed ? null : this.props.piece.id);
  };

  render() {
    return (
      <div className={classNames('scene', { isGrabbed: this.props.isGrabbed })} style={{ zIndex: this.calculateZIndex() }}>
        <div className="box show-front" onClick={this.handleClick} style={{ transform: `translateZ(${this.calculatePerspective()}px) rotateY(${this.calculateTurn()}deg)` }}>
          <div className="box__face box__face--front">
            <img className="icon" src={require(`../../assets/pieces/${this.props.piece.icon}.svg`)} alt={this.props.piece.icon} />
          </div>
          <div className="box__face box__face--back"></div>
          <div className="box__face box__face--right"></div>
          <div className="box__face box__face--left"></div>
          <div className="box__face box__face--top"></div>
          <div className="box__face box__face--bottom"></div>
        </div>
      </div>
    );
  }
}

export class PieceElement {
  static icons = [
    'Man1',
    'Man2',
    'Man3',
    'Man4',
    'Man5',
    'Man6',
    'Man7',
    'Man8',
  ];

  static generateIcon = () => PieceElement.icons[Math.floor(Math.random() * PieceElement.icons.length)];

  constructor() {
    this.id = shortid.generate();
    this.icon = PieceElement.generateIcon();
  }
};
export default Piece;
