import React from 'react';
import PropTypes from 'prop-types';
import shortid from "shortid";
import classNames from 'classnames';

import './piece.scss';

const Piece = props => {
  const { style } = props;

  return (
    <div className={classNames('scene', { isGrabbed: props.isGrabbed })} style={{ zIndex: style.zIndex }}>
      <div
        className="box show-front"
        onClick={() => props.onPieceClick(props.isGrabbed ? null : props.piece.id)}
        style={{ transform: `translateZ(${style.perspective}px) rotateY(${style.turn}deg)` }}
      >
        <div className="box__face box__face--front">
          <img className="icon" src={require(`../../../../assets/pieces/${props.piece.icon}.svg`)} alt={props.piece.icon} />
        </div>
        <div className="box__face box__face--back"></div>
        <div className="box__face box__face--right"></div>
        <div className="box__face box__face--left"></div>
        <div className="box__face box__face--top"></div>
        <div className="box__face box__face--bottom"></div>
      </div>
    </div>
  )
}

Piece.propTypes = {
  isGrabbed: PropTypes.bool.isRequired,
  onPieceClick: PropTypes.func.isRequired,
  piece: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  style: PropTypes.shape({
    perspective: PropTypes.number.isRequired,
    turn: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
  }),
};

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
