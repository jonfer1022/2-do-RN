import {StyleSheet} from 'react-native';
import {backgroundContainer} from '../../utils/styles/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundContainer,
    paddingHorizontal: 15,
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 2,
  },
  welcomeButtons: {
    flex: 1,
    justifyContent: 'center',
  },
});
