import {SplicingView} from "../draw/SplicingView";
import {TextBox} from './TextBox';

class Card extends TextBox {

  constructor(cardData, cards, ports) {
    super();
    this.cardData = cardData;
    this.cards = cards;
    this.ports = ports;
  }

  calculateDimensions(display) {
    var height = 0;

    this.ports.forEach(port => {
      port.calculateDimensions(display);
      height += port.draw.height + 2 * SplicingView.MIN_LENGTH;
      height += port.text.height;
    })

    this.draw = {
      width: SplicingView.MIN_CARD_WIDTH,
      height: height + 2 * SplicingView.MIN_LENGTH
    }

    this.calculateText(this.cardData.name, this.cardData.model, this.cardData.identifier)

  }

  calculatePosition(device, prevCard, display) {

    var card = this;
    var prevPort;

    var x = (prevCard || device).draw.x + (prevCard ? 0 : 2 * SplicingView.MIN_LENGTH);
    var y = (prevCard || device).draw.y + (prevCard ? prevCard.draw.height : 0 ) + 2 * SplicingView.MIN_LENGTH;

    this.text.x = x
    this.text.y = y;

    this.draw.x = x
    this.draw.y = y + this.text.height;

    this.ports.forEach(port => {
      port.calculatePosition(card, prevPort, display);
      prevPort = port;
    })
  }

}

export {Card}