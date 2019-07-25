import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components';
import { Icon, LinearGradient } from 'expo';
import { connect } from 'react-redux';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

class Project extends Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100),
  }

  spring = (param, value) => {
    Animated.spring(param, {
      toValue: value,
    }).start();
  }

  timing = (param, value, config) => {
    Animated.timing(param, {
      ...config,
      toValue: value,
    }).start();
  }

  openCard = () => {
    if (this.props.canBeOpened) {
      const {
        cardWidth,
        cardHeight,
        titleTop,
        opacity,
        textHeight,
      } = this.state;

      this.timing(cardWidth, SCREEN_WIDTH, { duration: 150 });
      this.timing(cardHeight, SCREEN_HEIGHT, { duration: 150 });
      this.spring(titleTop, 80);
      this.spring(opacity, 1);
      this.spring(textHeight, 1000);

      StatusBar.setHidden(true);
      this.props.openCard();
    }
  }

  closeCard = () => {
    const {
      cardWidth,
      cardHeight,
      titleTop,
      opacity,
      textHeight,
    } = this.state;

    this.timing(cardWidth, 315, { duration: 250 });
    this.timing(cardHeight, 460, { duration: 250 });
    this.spring(titleTop, 20);
    this.spring(opacity, 0);
    this.spring(textHeight, 100);

    StatusBar.setHidden(false);
    this.props.closeCard();
  }

  render() {
    const {
      cardWidth,
      cardHeight,
      titleTop,
      opacity,
      textHeight,
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
          <AnimatedText style={{ height: textHeight }}>{text}</AnimatedText>
          <AnimatedLinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={{
              position: "absolute",
              top: 330,
              width: "100%",
              height: textHeight,
            }}
          />
          <AnimatedCloseView onPress={this.closeCard} style={{ opacity, top: titleTop }}>
            <Icon.Ionicons name='ios-close' size={32} color='#546bfb' />
          </AnimatedCloseView>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({ projectCardState: state.projectCardState });

const mapDispatchToProps = dispatch => ({
  openCard: () => dispatch({
    type: 'OPEN_CARD',
  }),
  closeCard: () => dispatch({
    type: 'CLOSE_CARD',
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);

const Container = styled.View`
    width: 315px;
    height: 460px;
    border-radius: 14px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    `;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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

const AnimatedText = Animated.createAnimatedComponent(Text);