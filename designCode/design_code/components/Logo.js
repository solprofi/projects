import React from 'react';
import styled from 'styled-components';

const Logo = ({ image, text }) => (
  <Container style={{ elevation: 10 }}>
    <Image source={image} resizeMode="contain" />
    <Text>{text}</Text>
  </Container>
);

const Container = styled.View`
  height: 60px;
  padding: 12px 16px 12px;
  margin: 10px 8px;
  background: white;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 10px;
`;

export default Logo;
