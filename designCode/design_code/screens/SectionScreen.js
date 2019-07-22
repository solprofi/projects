import React, { Component } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'expo';

export default class SectionScreen extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const { navigation } = this.props;

    const section = navigation.getParam('section');
    const {
      background,
      title,
      caption,
      logo,
      subtitle,
    } = section;

    console.log(logo);

    return (
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={background} />
          <Wrapper>
            <Logo source={logo} />
            <Subtitle>{subtitle}</Subtitle>
          </Wrapper>
          <Title>{title}</Title>
          <Caption>{caption}</Caption>
        </Cover>
        <CloseView onPress={() => navigation.goBack()}>
          <Icon.Ionicons name="ios-close" size={36} color="#4775f2" />
        </CloseView>
      </Container>
    );
  }
}

SectionScreen.navigationOptions = {
  header: null,
};

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: rgba(255,255,255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 5px;
`;

const Container = styled.View`
  flex: 1;
`;

const CloseView = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: white;
  position: absolute;
  right: 20px;
  top: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  position: absolute;
  top: 78px;
  left: 20px;
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 300px;
`;
