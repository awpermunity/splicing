import {SplicingView} from "../draw/SplicingView";
import {TextBox} from "./TextBox";

class Device extends TextBox {

  constructor(deviceData, cards, ports) {
    super();
    this.deviceData = deviceData;
    this.cards = cards;
    this.ports = ports;
  }

  calculateDimensions(display) {

    var width = 0, height = 0;

    this.cards.forEach(card => {
      card.calculateDimensions(display);
      width = card.draw.width + 4 * SplicingView.MIN_LENGTH;
      height += card.draw.height + 4 * SplicingView.MIN_LENGTH;
      height += card.text.height
    })

    this.calculateText(this.deviceData.name, this.deviceData.model, this.deviceData.identifier);

    this.draw = {
      width: width,
      height: height
    }

  }

  calculatePosition(display) {

    var device = this;
    var prevCard;

    var x = this.originalPosition.x;
    var y = this.originalPosition.y;

    this.text.x = x;
    this.text.y = y;

    this.draw.x = x;
    this.draw.y = y + this.text.height;

    this.cards.forEach(card => {
      card.calculatePosition(device, prevCard, display);
      prevCard = card;
    })

  }

  getCards() {
    return this.cards; //TODO recursive
  }

}

export {Device}