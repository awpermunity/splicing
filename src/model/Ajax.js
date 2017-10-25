import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Ajax extends React.Component {
  static devices = this.state.devices
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      url: `http://localhost:3000/devices`
    };
  }

  componentDidMount() {
    $.get({
      url: this.state.url,
      dataType: 'json',
      method: 'GET',
      cache: false,
      success: function (data) {
        this.setState({ devices: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    const devices = this.state.devices || [];
    return (
      <div>
        <h1> DEVICES </h1>
        {
          devices.map(device => <tr>
            <h5> NAME:{
              device.chassis[0].cards[0].ports.length}</h5>
          </tr>)
        }
      </div>
    );
  }
}

export default Ajax