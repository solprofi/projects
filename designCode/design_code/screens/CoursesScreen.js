import React from 'react';
import styled from 'styled-components';

const CoursesScreen = () => (
  <Container>
    <Text>What it do babeee (Courses)</Text>
  </Container>
);

CoursesScreen.navigationOptions = {
  header: null,
};

export default CoursesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
