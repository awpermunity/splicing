import { SplicingView } from '../draw/SplicingView';
import { TextBox } from './TextBox';
import { Intersection } from '../algorithms/Intersection';
import { PointGroup } from '../algorithms/PointGroup';
import { ConcaveHull } from '../algorithms/ConcaveHull';

class Location extends TextBox {

  constructor(locationData, devices) {
    super();
    this.locationData = locationData;
    this.devices = devices;
  }

  calculate(display) {

    //TODO uwzglednic display w obliczeniach

    var x = [], y = [], x2 = [], y2 = [];
    this.devices.forEach(device => {

      device.calculateDimensions(display);
      device.calculatePosition(display);

      const draw = device.draw;
      const text = device.text;
      x.push(text.x);
      y.push(text.y);
      x2.push(draw.width + draw.x);
      y2.push(draw.height + draw.y);
    });

    const lx = Math.min(...x) - 4 * SplicingView.MIN_LENGTH;
    const ly = Math.min(...y) - 4 * SplicingView.MIN_LENGTH;

    const borderPoints = this.calculateBorderPointsForDevices();

    this.draw = {
      x: lx,
      y: ly,
      borderPoints: borderPoints
    }

    this.calculateText(this.locationData.name, this.locationData.address, this.locationData.identifier)

    this.text.x = this.draw.x;
    this.text.y = this.draw.y - this.text.height;

  }

  calculateBorderPointsForDevices() {
    const pointGroups = this.preparePointGroupsForDevices(this.devices);
    return this.calculateBorderPoints(pointGroups);
  }


  preparePointsForDevice(device) {
    const text = device.text;
    const draw = device.draw;
    const diff = 4 * SplicingView.MIN_LENGTH;
    const points = [];
    points.push([text.x - diff, text.y - diff]);
    points.push([text.x + draw.width + diff, text.y - diff]);
    points.push([text.x + draw.width + diff, draw.y + draw.height + diff]);
    points.push([text.x - diff, draw.y + draw.height + diff]);
    return new PointGroup(points, true); // GB OPT zakladam ze te punkty nie beda sie pokrywac
  }



  preparePointGroupsForDevices(devices) {
    return devices.map(device => this.preparePointsForDevice(device));
  }

  calculateBorderPoints(pointGroups) {
    const intersection = new Intersection(); // todo GB jakies DI czy cos
    const allPoints = intersection.compute(pointGroups);
    const concaveHull = new ConcaveHull();
    return {
      points: concaveHull.compute(allPoints.points),
      allPoints: allPoints.points   // todo GB only for testing - remove later
    }
  }

}

export { Location }