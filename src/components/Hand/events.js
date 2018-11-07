const clearPickedPiece = function(e) {
  if (this.state.grabbedIndex) {

    e.preventDefault();

    this.setState({
      grabbedIndex: null,
    });
  }
};

export default class EventsSubscriptionManager {
  constructor(that) {
    this.component = that;
    this.clearPickedPiece = clearPickedPiece.bind(that);
  }

  subscribe() {
    document.addEventListener('contextmenu', this.clearPickedPiece);
    document.addEventListener('keydown', this.clearPickedPiece);
  };

  unSubscribe() {
    document.removeEventListener('contextmenu', this.clearPickedPiece);
    document.removeEventListener('keydown', this.clearPickedPiece);
  };
};