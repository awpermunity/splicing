import {SplicingView} from "../draw/SplicingView";

class PortConnector {

  constructor(portConnectorData, inConnector, outConnector, crossConnector) {
    this.portConnectorData = portConnectorData;
    this.inConnector = inConnector;
    this.outConnector = outConnector;
    this.crossConnector = crossConnector;
  }

  calculateDimensions(display) {
    this.draw = {
      width: display.displayPortConnectors ? SplicingView.MIN_PORT_WIDTH - 2 * SplicingView.MIN_LENGTH : 0,
      height: display.displayPortConnectors ? SplicingView.MIN_LENGTH: 0
    }

    this.calculateConnectorDimensions(this.inConnector, display);
    this.calculateConnectorDimensions(this.outConnector, display);

  }

  calculateConnectorDimensions(connector, display) {
    if(connector) {
      connector.draw = {
        width: display.displayPortConnectors ? SplicingView.MIN_LENGTH : 0,
        height: display.displayPortConnectors ? SplicingView.MIN_LENGTH : 0
      }
    }
  }

  calculatePosition(port, prevPortConnector, display) {

    this.draw.x = (prevPortConnector || port).draw.x + (prevPortConnector ? 0 : SplicingView.MIN_LENGTH);
    this.draw.y = (prevPortConnector || port).draw.y + (prevPortConnector ? prevPortConnector.draw.height : 0 ) + SplicingView.MIN_LENGTH;

    if(this.inConnector) {
      this.inConnector.draw.x = this.draw.x;
      this.inConnector.draw.y = this.draw.y;
    }

    if(this.outConnector) {
      this.outConnector.draw.x = this.draw.x + SplicingView.MIN_PORT_WIDTH - 3 * SplicingView.MIN_LENGTH;
      this.outConnector.draw.y = this.draw.y;
    }

  }

}

export {PortConnector}