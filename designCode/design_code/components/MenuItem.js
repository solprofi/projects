import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';

const MenuItem = ({ icon, title, text }) => (
  <Container>
    <IconView>
      <Icon.Ionicons
        name={icon}
        size={24}
        color="#546bfb"
      />
    </IconView>
    <Content>
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Content>
  </Container>
);

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;

const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding-left: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #3c4560;
`;

const Text = styled.Text`
  margin-top: 5px;
  color: #3c4560;
  opacity: 0.6;
  font-weight: 600;
`;


export default MenuItem;
