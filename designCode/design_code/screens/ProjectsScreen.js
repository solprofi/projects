import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Project from '../components/Project';
import { projects } from '../components/data';

const getNextCardIndex = index => {
  return (index++) % projects.length;
}

class ProjectsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(0.9),
      translateY: new Animated.Value(44),
      thirdCardScale: new Animated.Value(0.8),
      thirdCardTranslateY: new Animated.Value(-50),
      opacity: new Animated.Value(0),
      activeCardIndex: 0,
    };

    const {
      pan,
      pan: { x, y },
      scale,
      translateY,
      thirdCardScale,
      thirdCardTranslateY,
      opacity,
    } = this.state;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else if (this.props.projectCardState === 'openCard') {
          return false;
        }
        return true;
      },
      onPanResponderGrant: () => {
        this.spring(scale, 1);
        this.spring(translateY, 0);
        this.spring(thirdCardScale, 0.9);
        this.spring(thirdCardTranslateY, 44);
        this.spring(opacity, 1);
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: x, dy: y },
      ]),


      onPanResponderRelease: () => {
        const yPosition = y.__getValue();

        if (yPosition > 200) {
          Animated.timing(pan, {
            toValue: {
              x: 0,
              y: 1000,
            },
          }).start(() => {
            this.setState(prevState => ({
              activeCardIndex: (prevState.activeCardIndex + 1) % projects.length,
            }), () => {
              pan.setValue({ x: 0, y: 0 });
              scale.setValue(0.9);
              translateY.setValue(44)
              thirdCardScale.setValue(0.8)
              thirdCardTranslateY.setValue(-50);
            });
          });
        } else {
          this.spring(pan, { x: 0, y: 0 });
          this.spring(scale, 0.9);
          this.spring(translateY, 44);
          this.spring(thirdCardScale, 0.8);
          this.spring(thirdCardTranslateY, -50);
          this.spring(opacity, 0);
        }
      },
    });
  }

  spring = (param, value) => {
    Animated.spring(param, {
      toValue: value,
    }).start();
  }

  render() {
    const {
      pan: { x, y },
      scale,
      translateY,
      thirdCardScale,
      thirdCardTranslateY,
      activeCardIndex,
      opacity,
    } = this.state;

    return (
      <Container>
        <AnimatedBackground style={{ opacity }} />
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
            title={projects[activeCardIndex].title}
            image={projects[activeCardIndex].image}
            author={projects[activeCardIndex].author}
            text={projects[activeCardIndex].text}
            canBeOpened
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
            title={projects[getNextCardIndex(activeCardIndex + 1)].title}
            image={projects[getNextCardIndex(activeCardIndex + 1)].image}
            author={projects[getNextCardIndex(activeCardIndex + 1)].author}
            text={projects[getNextCardIndex(activeCardIndex + 1)].text}
          />
        </Animated.View>
        <Animated.View style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -2,
          transform: [
            { scale: thirdCardScale },
            { translateY: thirdCardTranslateY },
          ],
        }}
        >
          <Project
            title={projects[getNextCardIndex(activeCardIndex + 2)].title}
            image={projects[getNextCardIndex(activeCardIndex + 2)].image}
            author={projects[getNextCardIndex(activeCardIndex + 2)].author}
            text={projects[getNextCardIndex(activeCardIndex + 2)].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ projectCardState: state.projectCardState });

export default connect(mapStateToProps)(ProjectsScreen);

ProjectsScreen.navigationOptions = {
  header: null,
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0, 0.2);
  z-index: -3;
`;

const AnimatedBackground = Animated.createAnimatedComponent(Background);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;
