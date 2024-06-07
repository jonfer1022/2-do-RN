/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './style';
import {
  ButtonPrimary,
  InputPassword,
  InputText,
  Loading,
  MainTittle,
  Paragraph,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {primaryAction} from '../../utils/styles/colors';
import axiosInstance from '../../utils/axios/fetcher';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAccessToken {
  accessToken: string;
  refreshToken: string;
}

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post<IAccessToken>('/auth/signin', {
        email,
        password,
      });
      const {accessToken, refreshToken} = response.data;
      AsyncStorage.setItem('token', accessToken);
      AsyncStorage.setItem('refreshToken', refreshToken);
      navigation.navigate('HomeRoot' as never);
      setPassword('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <MainTittle
        style={{marginBottom: 50, alignSelf: 'center'}}
        title={'Login'}
      />
      <Paragraph title={'Email'} style={style.paragraph} />
      <InputText
        onChange={setEmail}
        value={email}
        placeholder={'Enter your email'}
        keyboardType={'email-address'}
      />
      <Paragraph title={'Password'} style={style.paragraph} />
      <InputPassword
        showPassword={showPassword}
        onIconPress={setShowPassword}
        onChange={setPassword}
        value={password}
        placeholder={'Enter your password'}
      />
      <ButtonPrimary
        customStyle={{marginTop: 80, marginBottom: 20}}
        onPress={() => handleLogin()}
        title={'Sign In'}
        disabled={email === '' || password === ''}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Paragraph title={'New in 2Do '} />
        <Paragraph
          style={{color: primaryAction}}
          title={'¡Sign Up now!'}
          onPress={() => navigation.navigate('SignUp' as never)}
        />
      </View>
      <Loading isVisible={loading} />
    </SafeAreaView>
  );
};

export default SignIn;
