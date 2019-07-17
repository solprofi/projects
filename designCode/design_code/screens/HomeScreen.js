import React, { Component } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'expo';
import { connect } from 'react-redux';

import Card from '../components/Card';
import avatarImage from '../assets/avatar.jpg';
import { logos, cards, courses } from '../components/data';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';

class HomeScreen extends Component {
  state = {
    menuScale: new Animated.Value(1),
    menuOpacity: new Animated.Value(1),
  }

  componentDidUpdate(prevProps, prevState) {
    this.toggleMenu();
  }

  toggleMenu = () => {
    const { menuState } = this.props;
    const { menuScale, menuOpacity } = this.state;

    const isOpen = menuState === 'openMenu';

    Animated.timing(menuScale, {
      toValue: isOpen ? 0.9 : 1,
      duration: 300,
      easing: Easing.in(),
    }).start();
    Animated.spring(menuOpacity, {
      toValue: isOpen ? 0.5 : 1
    }).start();

    StatusBar.setBarStyle(isOpen ? 'light-content' : 'dark-content', true);
  }


  render() {
    const { openMenu } = this.props;
    const { menuScale, menuOpacity } = this.state;

    return (
      <RootContainer>
        <Menu />
        <AnimatedContainer style={{ transform: [{ scale: menuScale }], opacity: menuOpacity }}>
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={openMenu}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 20
                  }}
                >
                  <Avatar source={avatarImage} />
                </TouchableOpacity>
                <Title>What it do,</Title>
                <Name>Babee</Name>
                <Icon.Ionicons
                  name="ios-notifications"
                  size={32}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 20,
                    color: '#4775f2',
                  }}
                />
              </TitleBar>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator="false"
                style={{ padding: 20, paddingLeft: 12 }}
              >
                {logos.map(logo => (
                  <Logo
                    image={logo.source}
                    text={logo.text}
                    key={logo.text}
                  />
                ))}
              </ScrollView>


              <Subtitle>Continue Learning</Subtitle>
              <ScrollView
                horizontal
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >

                {cards.map(card => (
                  <Card
                    background={card.background}
                    title={card.title}
                    logo={card.logo}
                    caption={card.caption}
                    subtitle={card.subtitle}
                    key={card.title}
                  />
                ))}
              </ScrollView>

              <Subtitle>Popular Courses</Subtitle>

              <ScrollView

                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {courses.map(course => (
                  <Course
                    key={course.title}
                    background={course.background}
                    title={course.title}
                    subtitle={course.subtitle}
                    logo={course.logo}
                    author={course.author}
                    avatar={course.avatar}
                    caption={course.caption}
                  />
                ))}
              </ScrollView>

            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootContainer>
    );
  }
}

const mapStateToProps = state => ({
  menuState: state.menuState,
});

const mapDispatchToProps = dispatch => ({
  openMenu: () => dispatch({
    type: 'OPEN_MENU',
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootContainer = styled.View`
  flex: 1;
  background: black;
`;

const Subtitle = styled.Text`
      font-size: 15px;
      margin-left: 20px; 
      margin-top: 15px; 
      font-weight: 600;
      text-transform: uppercase;
      color: #B8BECE;
    `;

const Avatar = styled.Image`
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background: black;
      box-shadow: 10px 5px 5px black;
    `;

const Container = styled.View`
      flex: 1;
      background-color: #f0f3f5;
      border-radius: 10px;
     `;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
      color: #B8BECE;
      font-size: 16px;
      font-weight: 500;
    `;

const Name = styled.Text`
      color: #3C4560;
      font-size: 20px;
      font-weight: bold;
    `;

const TitleBar = styled.View`
      width: 100%;
      margin-top: 50px;
      padding-left: 80px;
    `;
