/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ButtonPrimary,
  InputPassword,
  InputText,
  MainTittle,
  Paragraph,
} from '../../components';
import {style} from './style';
import {primaryAction} from '../../utils/styles/colors';
import axiosInstance from '../../utils/axios/fetcher';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleRegister = async () => {
    try {
      await axiosInstance.post('/auth/signup', {
        name,
        email,
        password,
      });
      navigation.navigate({
        name: 'ConfirmCode',
        params: {
          name,
          email,
          password,
        },
      } as never);
      setPassword('');
      setEmail('');
      setName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <MainTittle
        style={{marginBottom: 50, alignSelf: 'center'}}
        title={'Register'}
      />
      <Paragraph title={'Name'} style={style.paragraph} />
      <InputText
        onChange={setName}
        value={name}
        placeholder={'Enter your full name'}
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
        onPress={() => handleRegister()}
        title={'Sign up'}
        disabled={name === '' || email === '' || password === ''}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Paragraph title={'If you already have an account. '} />
        <Paragraph
          style={{color: primaryAction}}
          title={'¡Sign In!'}
          onPress={() => navigation.navigate('SignIn' as never)}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
