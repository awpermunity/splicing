import React from 'react';
import {Rect} from 'react-konva';

class PortConnector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      portConnector: props.portConnector
    }
  }

  render() {
    const draw = this.state.portConnector.draw;
    return (
      <Rect
        x={draw.x}
        y={draw.y}
        width={draw.width}
        height={draw.height}
        stroke={'black'}
        strokeWidth = {0.5}
      />
    );
  }
}

export {PortConnector};
