import React, { Component } from 'react';
import styled from 'styled-components';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'expo';
import { connect } from 'react-redux';

import menuBackground from '../assets/background2.jpg';
import MenuItem from './MenuItem';
import { menuItems } from './data'

const SCREEN_HEIGHT = Dimensions.get('window').height;

class Menu extends Component {
  state = {
    top: new Animated.Value(SCREEN_HEIGHT)
  }

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }


  toggleMenu = () => {
    const { top } = this.state;
    const { menuState } = this.props;

    Animated.spring(top, {
      toValue: menuState === 'openMenu' ? 54 : SCREEN_HEIGHT,
    }).start();
  }

  render() {
    const { top } = this.state;

    return (
      <AnimatedContainer style={{ top }}>
        <Cover>
          <Image source={menuBackground} />
          <Title>What it do</Title>
          <Subtitle>Babee</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: 'absolute',
            left: '50%',
            top: 120,
            marginLeft: -22,
            zIndex: 1,
          }}
        >
          <CloseView>
            <Icon.Ionicons name='ios-close' size={44} color='#546bfb' />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {menuItems.map(item => (
            <MenuItem
              icon={item.icon}
              title={item.title}
              text={item.text}
              key={item.text}
            />
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

const mapStateToProps = state => ({
  menuState: state.menuState,
});

const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch({
    type: "CLOSE_MENU"
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Image = styled.Image`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  color: rgba(255,255,255, 0.5);
`;

const CloseView = styled.View`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0,0,0, 0.15);
`;


const Container = styled.View`
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      background: white;
      border-radius: 10px;
      overflow: hidden;
    `;


const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
      height: 142px;
      background: black;
      justify-content: center;
      align-items: center;
    `;

const Content = styled.View`
      height: ${SCREEN_HEIGHT}px;
      background: #f0f3f5;
      padding: 50px;
    `;
