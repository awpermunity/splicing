import React from 'react';
import {Rect} from 'react-konva';

class Device extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      device: props.device
    }
  }


  render() {
    const draw = this.state.device.draw;
    return (
      <Rect
        x={draw.x}
        y={draw.y}
        width={draw.width}
        height={draw.height}
        stroke={'black'}
      />
    );
  }
}

export {Device};
