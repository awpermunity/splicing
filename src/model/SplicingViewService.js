import { Location } from './Location'
import { Device } from './Device'
import { Card } from './Card'
import { Port } from './Port'
import { PortConnector } from './PortConnector'
import { Crossconnector } from './Crossconnector'
import { Connector } from './Connector'
import { React } from 'react';
import $ from 'jquery';



class SplicingViewService {


  locations;
  devices;
  cards;
  ports;


  calculateModel(display) {

    console.log('[SplicingViewService] display: ', display);

    this.locations = [];
    this.devices = [];
    this.cards = [];
    this.ports = [];
    this.portConnectors = [];
    this.texts = [];

    this.model.locations.forEach(location => {
      location.calculate(display);

      if (display.displayLocations) {
        this.locations.push(location);
        this.texts.push(location.text);
      }

      location.devices.forEach(device => {

        if (display.displayDevices) {
          this.devices.push(device);
          this.texts.push(device.text);
        }

        device.getCards().forEach(card => {

          if (display.displayCards) {
            this.cards.push(card);
            this.texts.push(card.text);
          }

          card.ports.forEach(port => {

            if (display.displayPorts) {
              this.ports.push(port);
              this.texts.push(port.text);
            }

            port.portConnectors.forEach(portConnector => {

              if (display.displayPortConnectors) {
                if (portConnector.inConnector) {
                  this.portConnectors.push(portConnector.inConnector);
                }
                if (portConnector.outConnector) {
                  this.portConnectors.push(portConnector.outConnector);
                }
              }

            })

          })

        })

        //TODO
        // device.ports.forEach(port => {
        //   this.ports.push(port);
        // })

      })
    })

  }


  getDeviceJSON() {
    let device
    $.get({
      url: `http://localhost:3000/devices/15708581073050566`,
      async: false,
      dataType: 'json',
      method: 'GET',
      cache: false,
      success: function (data) {
        device = data;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.url, status, err.toString());
      }.bind(this)
    });
    return device
  }
  getDataJSON = this.getDeviceJSON()

  fetchModel() {
    this.model = {
      locations: this.generateFakeLocations(1) // todo GB zeby sie obwodka nie nakladala
    };
  }

  generateFakeLocations(count) {
    return Array.from(Array(count).keys()).map(x => this.generateFakeLocation(x))
  }

  generateFakeLocation(index) {
    let devices = []
    devices.push(this.getDataJSON)
    return new Location({
      name: "Location " + index,
      address: "Address " + index,
      identifier: "Identifier " + index
    }, this.generateDevices(devices))
  }

  generateDevices(devicesJSON) {
    let devices = devicesJSON
    return devices.map(x => this.generateDevice(devices.indexOf(x), devices))
  }

  generateDevice(index, devicesFromApi) {
    var device = new Device({
      name: devicesFromApi[index].name,
      model: devicesFromApi[index].modelIdentifier,
      identifier: devicesFromApi[index].id
    }, this.generateCards(devicesFromApi[index].cards.length, devicesFromApi[index].cards))

    device.originalPosition = {
      x: Math.floor(Math.random() * window.innerWidth * 0.8) + 50,
      y: Math.floor(Math.random() * window.innerWidth * 0.2) + 100
    }

    return device;
  }

  generateCards(count, cardsFromApi) {
    let cards = cardsFromApi;
    return cards.map(x => this.generateCard(cards.indexOf(x), cards))
  }

  generateCard(index, cards) {
    return new Card({
      name: cards[index].name,
      model: cards[index].modelIdentifier,
      identifier: cards[index].id
    }, [], this.generatePorts(cards[index].ports.length, cards[index].ports))
  }

  generatePorts(count, portsFromApi) {
    let ports = portsFromApi;
    return ports.map(x => this.generatePort(ports.indexOf(x), ports))

  }

  generatePort(index, ports) {
    return new Port({
      name: ports[index].name
    }, this.generateFakePortConnectors(2))
  }

  generateFakePortConnectors(count) {
    return Array.from(Array(Math.floor(Math.random() * count + 1)).keys()).map(x => this.generateFakePortConnector(x))
  }

  generateFakePortConnector(index) {
    const outConnector = Math.round(Math.random());
    return new PortConnector({
      name: "Portconnector " + index
    },
      new Connector({}),
      outConnector ? new Connector({}) : undefined,
      outConnector ? new Crossconnector({}) : undefined,
    )
  }


}

export { SplicingViewService }

