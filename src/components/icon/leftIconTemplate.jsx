import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const LeftIconTemplate = ({color, size}) => (
  <Icon name="chevron-left" size={size} color={color} />
);

export default LeftIconTemplate;