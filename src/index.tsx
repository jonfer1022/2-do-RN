import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  backgroundContainer,
  backgroundPrimary,
  textPrimary,
} from './utils/styles/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackList} from './utils/types/navigation.type';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mainContainer} from './style';
import {ConfirmCode, HomeRoot, Landing, SignIn, SignUp} from './views';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

const Stack = createNativeStackNavigator<AuthStackList>();

const MainRender = () => {
  const [token, setToken] = useState<string>('');
  AsyncStorage.getItem('token').then(_token => setToken(_token || ''));

  return (
    <SafeAreaView style={mainContainer.container}>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: backgroundContainer,
            primary: backgroundPrimary,
            text: textPrimary,
            card: 'rgb(18, 18, 18)',
            border: 'rgb(39, 39, 41)',
            notification: 'rgb(255, 69, 58)',
          },
        }}>
        <Stack.Navigator
          initialRouteName={token?.length ? 'HomeRoot' : 'Landing'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
          <Stack.Screen name="HomeRoot" component={HomeRoot} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainRender;
