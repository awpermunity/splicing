import React from 'react';
import {Rect} from 'react-konva';

class Port extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      port: props.port
    }
  }

  render() {
    const draw = this.state.port.draw;
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

export {Port};
