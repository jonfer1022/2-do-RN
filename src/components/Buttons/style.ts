import {StyleSheet} from 'react-native';
import {
  primaryAction,
  decline,
  secondaryAction,
} from '../../utils/styles/colors';

export const style = StyleSheet.create({
  primary: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: primaryAction,
  },
  secondary: {
    padding: 10,
    borderRadius: 5,
    borderColor: secondaryAction,
    borderWidth: 2,
  },
  reject: {
    backgroundColor: decline,
    padding: 10,
    borderRadius: 5,
  },
  alignCenter: {
    alignSelf: 'center',
  },
});
