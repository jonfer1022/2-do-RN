import * as React from 'react';
import {Text} from 'react-native';
import {typography} from '../../utils/styles/typography';

interface ITextCustomProps {
  title: string;
  style?: object;
  onPress?: () => void;
}

const MainTittle = ({title, style, onPress}: ITextCustomProps) => {
  return (
    <Text onPress={onPress} style={[typography.mainTittle, style]}>
      {title}
    </Text>
  );
};

const SubTittle = ({title, style, onPress}: ITextCustomProps) => {
  return (
    <Text onPress={onPress} style={[typography.subTittle, style]}>
      {title}
    </Text>
  );
};

const Paragraph = ({title, style, onPress}: ITextCustomProps) => {
  return (
    <Text onPress={onPress} style={[typography.paragraph, style]}>
      {title}
    </Text>
  );
};

const Tittle1 = ({title, style, onPress}: ITextCustomProps) => {
  return (
    <Text onPress={onPress} style={[typography.tittle1, style]}>
      {title}
    </Text>
  );
};

export {MainTittle, SubTittle, Paragraph, Tittle1};
