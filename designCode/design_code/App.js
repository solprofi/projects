import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'expo';

import Card from './components/Card';
import cardBackground from './assets/background2.jpg';
import reactNativeLogo from './assets/logo-react.png';
import avatarImage from './assets/avatar.jpg';
import { logos, cards, courses } from './components/data';
import Logo from './components/Logo';
import Course from './components/Course';
import Menu from './components/Menu';

export default function App() {
  return (
    <Container>
      <Menu />
      <SafeAreaView>
        <ScrollView>
          <TitleBar>
            <Avatar source={avatarImage} />
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
            horizontal
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
    </Container>
  );
}

const Subtitle = styled.Text`
      font-size: 15px;
      margin-left: 20px; 
      margin-top: 15px; 
      font-weight: 600;
      text-transform: uppercase;
      color: #B8BECE;
    `;

const Avatar = styled.Image`
      position: absolute;
      top: 0;
      left: 20px;
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background: black;
      box-shadow: 10px 5px 5px black;
    `;

const Container = styled.View`
      flex: 1;
      background-color: #f0f3f5;
     `;

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
