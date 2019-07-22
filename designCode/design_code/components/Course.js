
import React, { Component } from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getCourseWidth = screenWidth => {
  let cardWidth = screenWidth - 40;
  if (screenWidth >= 768 && screenWidth < 1024) {
    cardWidth = (screenWidth - 60) / 2;
  } else if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }

  return cardWidth;
}
class Course extends Component {
  state = {
    cardWidth: getCourseWidth(SCREEN_WIDTH)
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.adaptLayout);
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    })
  }

  render() {
    const {
      background, title, logo, caption, subtitle, author, avatar,
    } = this.props;

    return (
      <Container style={{ width: this.state.cardWidth, elevation: 10 }}>
        <Cover>
          <Background source={background} />
          <Logo source={logo} resizeMode="contain" />
          <Subtitle>{subtitle}</Subtitle>
          <Title>
            {' '}
            {title}
          </Title>
        </Cover>

        <Content>
          <Avatar source={avatar} />
          <Caption>{caption}</Caption>
          <Author>
            Taught by
            {' '}
            {author}
          </Author>
        </Content>
      </Container>
    );
  }
}
export default Course;

const Container = styled.View`
  width: 335px;
  height: 335px;
  position: relative;
  background: white;
  margin: 10px 10px;
  border-radius: 14px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.20);
`;

const Cover = styled.View`
  height: 260px;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  justify-content: flex-end;
`;

const Background = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  width: 170px;
  font-size: 24;
  color: white;
  font-weight: 600;
  margin: 4px 0 20px 20px;
`;

const Subtitle = styled.Text`
  color: rgba(255,255,255, 0.8);
  text-transform: uppercase;
  font-size: 15px;
  margin-left: 20px;
`;

const Content = styled.View`
height: 75px;
  padding-left: 60px;
  justify-content: center;
`;


const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 16px;
`;

const Author = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  color: #b8bece;
  font-weight: 500;
`;


const Caption = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #3c4560;
`;
