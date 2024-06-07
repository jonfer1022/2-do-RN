import React from 'react';
import {View} from 'react-native';
import {style as _style} from './style';

interface ICardProps {
  children: JSX.Element[] | JSX.Element;
  style?: object;
}

export const SimpleCard = ({children, style}: ICardProps) => {
  return <View style={[_style.cardContainer, style]}>{children}</View>;
};
