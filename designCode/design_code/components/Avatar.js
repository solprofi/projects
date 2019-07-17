import React from 'react';
import styled from 'styled-components';

import defaultAvatar from '../assets/avatar-default.jpg';


const Avatar = ({ photo, isLoading }) => (

  <Image source={isLoading ? defaultAvatar : { uri: photo }} />
);

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
