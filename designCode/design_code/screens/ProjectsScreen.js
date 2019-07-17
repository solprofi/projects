import React from 'react';
import styled from 'styled-components';

const ProjectsScreen = () => (
  <Container>
    <Text>What it do babeee (Projects)</Text>
  </Container>
);

ProjectsScreen.navigationOptions = {
  header: null,
};

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
