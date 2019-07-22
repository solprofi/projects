
import React from 'react';
import styled from 'styled-components';


const Card = ({
  background, title, logo, caption, subtitle,
}) => (
  <Container style={{ elevation: 10 }}>
      <Cover>
        <Background resizeMethod="resize" source={background} />
        <Title>{title}</Title>
      </Cover>

      <Content>
        <Logo resizeMethod="resize" source={logo} />
        <Wrapper>
          <Caption>{caption}</Caption>
          <Subtitle>{subtitle}</Subtitle>
        </Wrapper>
      </Content>
    </Container>
);

export default Card;

const Content = styled.View`
  height: 80px;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-weight: 600;
  font-size: 20px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`;

const Container = styled.View`
  width: 315px;
  height: 280px;
  position: relative;
  margin: 20px 10px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.20);
`;

const Cover = styled.View`
  overflow: hidden;
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const Background = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  margin-top: 20px;
  margin-left: 20px;
  width: 170px;
  font-weight: 600;
`;
