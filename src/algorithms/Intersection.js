import {PointGroup} from './PointGroup';

export class Intersection {

    doGetInstersectionPoint(point, lineStart, lineEnd, index) {
        let start = lineStart[index];
        let end = lineEnd[index];
        if (start > end) {
            const oldStart = start;
            start = end;
            end = oldStart;
        }
        const pointPos = point[index];
        if (pointPos >= start && pointPos <= end) {
            const otherAxisIndex = (index + 1) % 2;
            // rysujemy linie pionowe i poziome
            // wiec punkt przeciecia jest na prostej miedzy start i end
            //w przypadku wielokatow trzeba by go wyznaczyc bazujac na wspolrzednych konca i poczatku
            const otherAxisPos = lineStart[otherAxisIndex];
            return index === 0 ? [pointPos, otherAxisPos] : [otherAxisPos, pointPos];
        }
        return undefined; // celowo
    }

    // wyznaczamy punkty przeciecia sie linii laczacych 2 sasiednie punkty device`a
    // z linia pionowa lub pozioma wychodzaca z innego punktu
    getIntersectionPoint(point, pointGroup, index) {
        const lineStart = pointGroup.get(index);
        const lineEnd = pointGroup.get((index + 1) % pointGroup.size());
        // metoda obsluguje dowolny wielokat, w przypadku prostokata niektore linie zdegraduja sie do punktu
        for (let i = 0 ; i < 2 ; i++){
            const result = this.doGetInstersectionPoint(point, lineStart, lineEnd, i);
            if (result) {
                return result;
            }
        }
        return undefined;
    }

    distance(p1, p2) {
        // punkty maja jedna wspolna wspolrzedna, wiec nie musimy liczyc tego normalnie
        const index = (p1[0] === p2[0]) ? 1 : 0;
        return Math.abs(p1[index] - p2[index]);
    }

    compareDistance(p1, p2) {
        return p1.distance - p2.distance;
    }

    appendDistance(point, intersectionPoint) {
        return {intersectionPoint,
                distance: this.distance(point, intersectionPoint)
               };
    }

    getIntersectionPointsWithGroup(point, pointGroup) {
        return pointGroup
            .map((currentPoint, index) => this.getIntersectionPoint(point, pointGroup, index))
            .filter(currentPoint => !!currentPoint);
    }

    getNearestIntersectionPoint(point, intersectionPoints) {
        // metoda powinna zwracac, tylko najblizszy od punktu wyjsciowego punkt przeciecia
        const pointsWithDistance = intersectionPoints
            .filter(intersectionPoint => !!intersectionPoint)
            .map(intersectionPoint => this.appendDistance(point, intersectionPoint));
        if (pointsWithDistance.length === 0) {
            return undefined;
        }
        pointsWithDistance.sort(this.compareDistance);
        return pointsWithDistance[0].intersectionPoint;
    }

    getIntersectionPointWithGroup(point, pointGroup) {
        const intersectionPoints = this.getIntersectionPointsWithGroup(point, pointGroup);
        if (intersectionPoints.length === 0) {
            return undefined;
        }
        return this.getNearestIntersectionPoint(point, intersectionPoints);
    }

    concat = (acc, elem) => acc.concat(elem);

    merge = (pointGroups) => pointGroups.reduce(this.concat, new PointGroup());

    getIntersectionPointsForPointAndOtherGroups(point, pointGroups) {
        const intersectionPoints = pointGroups
            .map(pointGroup => this.getIntersectionPointWithGroup(point, pointGroup))
            .filter(intersectionPoint => !!intersectionPoint)

        // dla punktu i roznych grup moga wyjsc te same punkty
        // dlatego zamieniamy zrwacamy na koncu grupe, zbey bylo unikalnie
        return new PointGroup(intersectionPoints);
    }

    getIntersectionPointsForGroupAndOtherGroups(pointGroupIndex, pointGroups) {
        const pointGroup = pointGroups[pointGroupIndex];
        const otherPointGroups = pointGroups.filter((pointGroup, index) => index !== pointGroupIndex); // todo GB opt, pewno moze tak zostac
        const result = this.merge(pointGroup
            .map(point => this.getIntersectionPointsForPointAndOtherGroups(point, otherPointGroups)));
        console.log('[Intersection.getIntersectionPointsForGroupAndOtherGroups] pointGroup='+JSON.stringify(pointGroup) + ' ; result='+ JSON.stringify(result));
        return result;

    }

    getIntersectionPointsForGroups(pointGroups) {
        return this.merge(pointGroups
            .map((pointGroup, index) => this.getIntersectionPointsForGroupAndOtherGroups(index, pointGroups))
        );
    }

    compute(pointGroups) {
        //const pointGroups = this.preparePointGroupsForDevices(this.devices); // generujemy grupy punktow dla kazdego device`a osobno
        console.log('[Intersection.compute] pointGroups=' + JSON.stringify(pointGroups));
        let duration = new Date().getTime();
        const pointsGroup = this.merge(pointGroups);
        console.log('[Intersection.compute] pointsGroup=' + JSON.stringify(pointsGroup));
        const intersectionPointsGroup = this.getIntersectionPointsForGroups(pointGroups);
        console.log('[Intersection.compute] intersectionPointsGroup=' + JSON.stringify(intersectionPointsGroup));
        const allPoints = pointsGroup.concat(intersectionPointsGroup);
        console.log('[Intersection.compute] allPointsGroup=' + JSON.stringify(allPoints));
        duration = new Date().getTime() - duration;
        console.log('[Intersection.compute] duration=' + duration)
        // teraz algorytm na otoczke wypulka i przygotowanie modelu linii
        return allPoints;
    }
}