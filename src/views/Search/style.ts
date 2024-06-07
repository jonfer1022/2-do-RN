import {StyleSheet} from 'react-native';
import {backgroundContainer} from '../../utils/styles/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundContainer,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
