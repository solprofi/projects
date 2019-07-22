import React, { Component } from 'react';
import {
  StatusBar, WebView, Linking, ScrollView,
} from 'react-native';
import styled from 'styled-components';
import { Icon } from 'expo';
import Markdown from 'react-native-showdown';

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
      image,
      title,
      caption,
      logo,
      subtitle,
      content,
    } = section;

    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={image} />
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
          <Content>
            {/* <WebView
            source={{ html: content + htmlStyles }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webview"
            onNavigationStateChange={(event) => {
              const { url } = event;

              if (url !== 'about:blank') {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

SectionScreen.navigationOptions = {
  header: null,
};

const htmlContent = `
<h2>This is a title</h2>
<p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
<img src="https://cl.ly/c0b07504bfec/download/background4.jpg" />
`;

const htmlStyles = `
  * {
    font-family: -apple-system, Roboto;
    margin: 0;
    padding: 0;
    font-size: 17px;
    font-weight: normal;
    color: #3c4560;
    line-height: 24px;
  }
   h2 {
    font-size: 20px;
    text-transform: uppercase;
    color: #b8bece;
    font-weight: 600;
    margin-top: 50px;
  }

  p {
    margin-top: 20px;
  }

  a {
    color: #4775f2;
    font-weight: 600;
    text-decoration: none;
  }

  strong {
    font-weight: 700;
  }
   img {
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
  }
   pre {
    padding: 20px;
    background: #212C4F;
    overflow: hidden;
    word-wrap: break-word;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  code {
    color: white;
  }
`;

const Content = styled.View`
  height: 1000px;
  padding: 12px;
`;

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
