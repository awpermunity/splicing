import React from 'react';
import {Layer, Text} from 'react-konva';
import {SplicingView} from './SplicingView';

class TextLayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      texts: props.texts
    }
  }

  render() {
    return (
      <Layer>
        {this.state.texts.map((text, index) =>
          <Text
            x={text.x}
            y={text.y}
            text={text.text}
            fontSize = {SplicingView.TEXT_HEIGHT}
          />
        )}
      </Layer>
    )
  }
}

export {TextLayer}
