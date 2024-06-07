import {StyleSheet} from 'react-native';

export const colors = {
  brandColor: '#1ba94c',
  secondaryColor: '#097bbf',
  errorColor: '#a93c32',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryColor,
  },
  image: {
    width: 100,
    marginVertical: 80,
    height: 100,
    borderRadius: 100,
  },
  loginContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    paddingHorizontal: '15%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    textAlign: 'center',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  editButton: {
    borderColor: colors.brandColor,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
  },
  editButtonText: {
    color: colors.brandColor,
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  email: {
    fontSize: 16,
  },
  inputView: {
    paddingBottom: 10,
    width: '100%',
  },
  input: {
    height: 46,
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginVertical: 40,
    fontWeight: 'bold',
    color: colors.brandColor,
  },
  loginBtn: {
    width: '100%',
    marginTop: 30,
    backgroundColor: colors.brandColor,
    alignItems: 'center',
    padding: 10,
  },
  loginButtonText: {
    color: 'white',
  },
});
