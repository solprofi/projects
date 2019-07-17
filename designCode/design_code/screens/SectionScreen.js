import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-native';

const SectionScreen = ({ navigation }) => (
  <Container>
    <Text>What it do babeee</Text>
    <Button title="Close" onPress={() => navigation.goBack()} />
  </Container>
);

SectionScreen.navigationOptions = {
  header: null,
};

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
