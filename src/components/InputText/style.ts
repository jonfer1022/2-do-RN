import {StyleSheet} from 'react-native';
import {backgroundTertiary, primaryAction} from '../../utils/styles/colors';
import {typography} from '../../utils/styles/typography';

export const style = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: primaryAction,
    backgroundColor: backgroundTertiary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    ...typography.paragraph,
  },
  textInputIconContainer: {
    borderWidth: 1,
    borderColor: primaryAction,
    backgroundColor: backgroundTertiary,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputIcon: {
    ...typography.paragraph,
    flex: 1,
    paddingRight: 10,
    paddingVertical: 0,
  },
});
