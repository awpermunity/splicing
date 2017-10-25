export class PointGroup { // substytut seta

    constructor(points, noCheck) {
        if (!points) {
            this.points = [];
            return;
        }
        if( noCheck ) {
            this.points = points;
        } else {
            this.points = [];
            this.addAll(points);
        }
    }

    indexOf(point) {
        let index = -1; // findIndex nie dziala w IE
        this.points.some((currentPoint, currentIndex) => {
            if (this.pointEquals(currentPoint, point)) {
                index = currentIndex;
                return true;
            }
            return false;
        });
        return index;
    }

    pointEquals = (point1, point2) => point1[0] === point2[0] && point1[1] === point2[1];

    add(point) {
        if (this.indexOf(point) === -1) {
            this.points.push(point);
            return true; // js Set zwraca this, mi tak wygodniej
        }
        return false;
    }

    get = (index) => this.points[index];

    size = () => this.points.length;

    addAll = (points) => points.forEach(point => this.add(point));

    forEach = (callback) => this.points.forEach(callback);

    filter = (callback) => new PointGroup(this.points.filter(callback), true);

    map = (callback) => this.points.map(callback);

    concat(pointGroupOrArray) {
        const result = new PointGroup(this.points, false);
        result.addAll(Array.isArray(pointGroupOrArray) ? pointGroupOrArray : pointGroupOrArray.points);
        return result;
    }

}