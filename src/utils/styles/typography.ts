import {StyleSheet} from 'react-native';
import {textGray, textPrimary} from './colors';

export const typography = StyleSheet.create({
  mainTittle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: textPrimary,
    marginBottom: 20,
  },
  subTittle: {
    fontSize: 16,
    color: textGray,
  },
  paragraph: {
    fontSize: 16,
    color: textPrimary,
  },
  tittle1: {
    fontSize: 22,
    color: textPrimary,
  },
});
