import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components';
import { Icon } from 'expo';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class Project extends Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0),
  }

  spring = (param, value) => {
    Animated.spring(param, {
      toValue: value,
    }).start();
  }

  openCard = () => {
    const {
      cardWidth,
      cardHeight,
      titleTop,
      opacity,
    } = this.state;

    this.spring(cardWidth, SCREEN_WIDTH);
    this.spring(cardHeight, SCREEN_HEIGHT);
    this.spring(titleTop, 80);
    this.spring(opacity, 1);

    StatusBar.setHidden(true);
  }

  closeCard = () => {
    const {
      cardWidth,
      cardHeight,
      titleTop,
      opacity,
    } = this.state;

    this.spring(cardWidth, 315);
    this.spring(cardHeight, 560);
    this.spring(titleTop, 20);
    this.spring(opacity, 0);


    StatusBar.setHidden(false);
  }

  render() {
    const {
      cardWidth,
      cardHeight,
      titleTop,
      opacity,
    } = this.state;
    const {
      image,
      title,
      author,
      text,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer style={{
          width: cardWidth,
          height: cardHeight,
        }}>
          <Cover>
            <Image source={image} />
            <AnimatedTitle style={{ top: titleTop }}>{title}</AnimatedTitle>
            <Author>
              by
            {' '}
              {author}
            </Author>
          </Cover>
          <Text>{text}</Text>
          <AnimatedCloseView onPress={this.closeCard} style={{ opacity, top: titleTop }}>
            <Icon.Ionicons name='ios-close' size={32} color='#546bfb' />
          </AnimatedCloseView>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}


const Container = styled.View`
    width: 315px;
    height: 460px;
    border-radius: 14px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    `;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const CloseView = styled.TouchableOpacity`
      width: 32px;
      height: 32px;
      position: absolute;
      right: 20;
      border-radius: 16px;
      background: white;
      justify-content: center;
      align-items: center;
    `;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Cover = styled.View`
    height: 290px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
    `;

const Image = styled.Image`
    width: 100%;
    height: 290px;
    `;

const Title = styled.Text`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    width: 300px;
    `;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    `;

const Text = styled.Text`
    font-size: 17px;
    margin: 20px;
    line-height: 24px;
    color: #3c4560;
    `;
