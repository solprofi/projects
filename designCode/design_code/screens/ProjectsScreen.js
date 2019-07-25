import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import styled from 'styled-components';

import Project from '../components/Project';
import { projects } from '../components/data';

export default class ProjectsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(0.9),
      translateY: new Animated.Value(44),
    };

    const {
      pan,
      pan: { x, y },
      scale,
      translateY,
    } = this.state;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: x, dy: y },
      ]),
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
        }).start();
      },
      onPanResponderRelease: () => {
        const yPosition = y.__getValue();

        if (yPosition > 200) {
          Animated.timing(pan, {
            toValue: {
              x,
              y: 1000,
            },
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
          }).start();
          Animated.spring(scale, {
            toValue: 0.9,
          }).start();
          Animated.spring(translateY, {
            toValue: 44,
          }).start();
        }
      },
    });
  }

  render() {
    const {
      pan: { x, y },
      scale,
      translateY,
    } = this.state;

    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: x },
              { translateY: y },
            ],
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={projects[0].title}
            image={projects[0].image}
            author={projects[0].author}
            text={projects[0].text}
          />
        </Animated.View>
        <Animated.View style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1,
          transform: [
            { scale },
            { translateY },
          ],
        }}
        >
          <Project
            title={projects[1].title}
            image={projects[1].image}
            author={projects[1].author}
            text={projects[1].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

ProjectsScreen.navigationOptions = {
  header: null,
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;
