import {SplicingView} from "../draw/SplicingView";
import {TextBox} from "./TextBox";

class Port extends TextBox {

  constructor(portData, portConnectors) {
    super();
    this.portData = portData;
    this.portConnectors = portConnectors;
  }

  calculateDimensions(display) {
    var height = 0;

    this.portConnectors.forEach(portConnector => {
      portConnector.calculateDimensions(display);
      height += portConnector.draw.height + SplicingView.MIN_LENGTH;
    })

    this.draw = {
      width: SplicingView.MIN_PORT_WIDTH,
      height: height + SplicingView.MIN_LENGTH
    }

    this.calculateText(this.portData.name)

  }

  calculatePosition(card, prevPort, display) {

    var prevPortConnector;
    var port = this;

    var offset = (SplicingView.MIN_CARD_WIDTH - SplicingView.MIN_PORT_WIDTH) / 2

    var x = (prevPort || card).draw.x + (prevPort ? 0 : offset);
    var y = (prevPort || card).draw.y + (prevPort ? prevPort.draw.height : 0 ) + 2 * SplicingView.MIN_LENGTH;

    this.text.x = x
    this.text.y = y;

    this.draw.x = x
    this.draw.y = y + this.text.height;

    this.portConnectors.forEach(portConnector => {
      portConnector.calculatePosition(port, prevPortConnector, display);
      prevPortConnector = portConnector;
    })
  }

}

export {Port}