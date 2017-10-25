import * as hull from 'hull.js'

export class ConcaveHull {

    constructor(concavity) {
        this.concavity = concavity ? concavity : 1; //1 - dokladna obwodka, nieskonczonosc - wypukla
    }

    compute(points) {
        console.log('[ConcaveHull.compute] points=' + JSON.stringify(points));
        let duration = new Date().getTime();
        const borderPoints = hull(points, this.concavity);
        duration = new Date().getTime() - duration;
        console.log('[ConcaveHull.compute] borderPoints=' + JSON.stringify(borderPoints));
        console.log('[ConcaveHull.compute] duration=' + duration)
        return borderPoints;
    }

}