import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import styled from 'styled-components';

import Project from '../components/Project';

export default class ProjectsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };

    const {
      pan,
      pan: { x, y },
    } = this.state;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
        }).start();
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: x, dy: y },
      ]),
    });
  }

  render() {
    const {
      pan: { x, y },
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
            title="Price Tag"
            image={require('../assets/background5.jpg')}
            author="Liu Yi"
            text="Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
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
