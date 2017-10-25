import React from 'react';
import { Circle, Group, Line } from 'react-konva';

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: props.location
        }
    }

    originalRender() {
        const draw = this.state.location.draw;
        console.log('[Location] RENDER', draw);
        const borderPoints = draw.borderPoints.points; // todo gb change after tests
        const closedLinePoints = borderPoints.concat(borderPoints[0]);
        const flattenedClosedLinePoints = closedLinePoints.reduce((acc, val) => acc.concat(val));
        return (<Line
            points={flattenedClosedLinePoints}
            stroke={'black'}
            dash={[10, 5]}
        />);
    }

    testRender() {
        const draw = this.state.location.draw;
        console.log('[Location] RENDER', draw);
        const borderPoints = draw.borderPoints.points; // todo gb change after tests
        const closedLinePoints = borderPoints.concat(borderPoints[0]);
        const flattenedClosedLinePoints = closedLinePoints.reduce((acc, val) => acc.concat(val));
        return (
            <Group>
                {<Line
                    points={flattenedClosedLinePoints}
                    stroke={'black'}
                    dash={[10, 5]}
                />}
                {
                    this.state.location.draw.borderPoints.allPoints
                        .map((point, index) =>
                            <Circle
                                x={point[0]}
                                y={point[1]}
                                radius={3}
                                key={index}
                                stroke={'red'}
                                fill={'red'}
                            />
                        )
                }
            </Group>
        );
    }

    render() {
        return this.testRender();
    }
}

export { Location };
