import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { SplicingViewService } from "../model/SplicingViewService";
import { Location } from './Location';
import { Device } from './Device';
import { Card } from './Card';
import { Port } from './Port';
import { PortConnector } from './PortConnector';

class SplicingView extends React.Component {

  static MIN_LENGTH = 4;
  static MIN_CARD_WIDTH = 40 * SplicingView.MIN_LENGTH;
  static MIN_PORT_WIDTH = 15 * SplicingView.MIN_LENGTH;
  static TEXT_HEIGHT = 10;

  static DEFAULT_DISPLAY = {
    displayLocations: true,
    displayDevices: true,
    displayCards: true,
    displayPorts: true,
    displayPortConnectors: true
  }

  constructor(props) {
    super(props);

    console.log('[SplicingView] constructor');

    this.splicingViewService = new SplicingViewService();
    this.getDevice(15708581073050566);

    this.state = SplicingView.DEFAULT_DISPLAY;
    this.handleChange = this.handleChange.bind(this);

  }

  getDevice(id) {
    this.splicingViewService.fetchModel(id).done((device) => {
      console.log(device.location.id)

      // this.splicingViewService
      //   .generateFakeLocations(device, 10)
      //   .forEach(d => this.splicingViewService.addDevice(d));

        this.splicingViewService.addDevice(device)
      
      this.splicingViewService.calculateModel(SplicingView.DEFAULT_DISPLAY)
      this.forceUpdate();
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    const state = this.state;
    const display = {
      displayLocations: state.displayLocations,
      displayDevices: state.displayDevices,
      displayCards: state.displayCards,
      displayPorts: state.displayPorts,
      displayPortConnectors: state.displayPortConnectors
    }
    display[name] = value;

    this.setState({
      [name]: value,
    });

    this.splicingViewService.calculateModel(display);

  }

  render() {

    var width = window.innerWidth * 4;
    var height = window.innerHeight * 4;
    console.log('[SplicingView] RENDER');

    return (
      <div>
        <form>
          <label style={{ 'margin-right': '10px' }}>
            Locations
            <input
              name="displayLocations"
              type="checkbox"
              checked={this.state.displayLocations}
              onChange={this.handleChange} />
          </label>
          <label style={{ 'margin-right': '10px' }}>
            Devices
            <input
              name="displayDevices"
              type="checkbox"
              checked={this.state.displayDevices}
              onChange={this.handleChange} />
          </label>
          <label style={{ 'margin-right': '10px' }}>
            Cards
            <input
              name="displayCards"
              type="checkbox"
              checked={this.state.displayCards}
              onChange={this.handleChange} />
          </label>
          <label style={{ 'margin-right': '10px' }}>
            Ports
            <input
              name="displayPorts"
              type="checkbox"
              checked={this.state.displayPorts}
              onChange={this.handleChange} />
          </label>
          <label style={{ 'margin-right': '10px' }}>
            Port connectors
            <input
              name="displayPortConnectors"
              type="checkbox"
              checked={this.state.displayPortConnectors}
              onChange={this.handleChange} />
          </label>
        </form>
        <Stage width={width} height={height}>
          {this.splicingViewService.locations && (
            <Layer>
            {this.splicingViewService.locations.map((location, index) =>
              <Location key={index} location={location} />
            )}
            {this.splicingViewService.devices.map((device, index) =>
              <Device key={index} device={device} />
            )}
            {this.splicingViewService.cards.map((card, index) =>
              <Card card={card} key={index} />
            )}
            {this.splicingViewService.ports.map((port, index) =>
              <Port key={index} port={port} />
            )}
            {this.splicingViewService.portConnectors.map((portConnector, index) =>
              <PortConnector key={index} portConnector={portConnector} />
            )}
            {this.splicingViewService.texts.map((text, index) =>
              <Text
                x={text.x}
                y={text.y}
                key={index}
                text={text.text}
                fontSize={SplicingView.TEXT_HEIGHT}
              />
            )}
          </Layer>
          )}
        </Stage>
      </div>
    );
  }

  componentWillMount() {
    console.log('[SplicingView] will mount');
    this.startTime = new Date().getTime();
  }

  componentDidMount() {
    const duration = new Date().getTime() - this.startTime;
    console.log('[SplicingView] did mount. Duration: ', duration);
  }

  componentWillUpdate() {
    console.log('[SplicingView] will unpdate');
    this.startTime = new Date().getTime();
  }

  componentDidUpdate() {
    const duration = new Date().getTime() - this.startTime;
    console.log('[SplicingView] did update. Duration: ', duration);
  }

}

export { SplicingView };