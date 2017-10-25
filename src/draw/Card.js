import React from 'react';
import {Rect} from 'react-konva';

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: props.card
    }
  }

  render() {
    const draw = this.state.card.draw;
    return (
      <Rect
        x={draw.x}
        y={draw.y}
        width={draw.width}
        height={draw.height}
        stroke={'black'}
        strokeWidth = {1}
      />
    );
  }
}

export {Card};
