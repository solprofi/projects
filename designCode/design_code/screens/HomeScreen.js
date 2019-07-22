import React, { Component, Fragment } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';


import Card from '../components/Card';
import { logos, cards, courses } from '../components/data';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';
import Avatar from '../components/Avatar';
import { Query } from 'react-apollo';

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    menuScale: new Animated.Value(1),
    menuOpacity: new Animated.Value(1),
    user: {},
    isUserLoading: true,
  }

  componentDidMount() {
    fetch('https://uinames.com/api/?ext')
      .then(res => res.json())
      .then(res => {
        this.setState({
          isUserLoading: false,
          user: res,
        })
      });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.menuState !== this.props.menuState) {
      this.toggleMenu();
    }
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
    const {
      menuScale,
      menuOpacity,
      user: { photo, name },
      isUserLoading,
    } = this.state;

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
                  <Avatar photo={photo} isLoading={isUserLoading} />
                </TouchableOpacity>
                <Title>What it do,</Title>
                <Name>{isUserLoading ? 'Babeeee' : name} </Name>
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
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (error) {
                      return <Message>Error...</Message>;
                    } else if (loading) {
                      return <Message>Loading...</Message>;
                    } else {
                      return (
                        <Fragment>
                          {data.cardsCollection.items.map(card => (
                            <TouchableOpacity
                              key={card.title}
                              onPress={() => this.props.navigation.push('Section', { section: card })}
                            >
                              <Card
                                background={card.image}
                                title={card.title}
                                logo={card.logo}
                                caption={card.caption}
                                subtitle={card.subtitle}
                              />
                            </TouchableOpacity>
                          ))}
                        </Fragment>
                      )
                    }
                  }}
                </Query>


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
      </RootContainer >
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

const Message = styled.Text`
  margin: 20px;
  color: #B8BECE;
  font-weight: 500;
  font-size: 15px;
`;

const Subtitle = styled.Text`
      font-size: 15px;
      margin-left: 20px; 
      margin-top: 15px; 
      font-weight: 600;
      text-transform: uppercase;
      color: #B8BECE;
    `;

const Container = styled.View`
      flex: 1;
      background-color: #f0f3f5;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
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
