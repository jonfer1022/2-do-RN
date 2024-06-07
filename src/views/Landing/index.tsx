/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './style';
import {
  ButtonPrimary,
  ButtonSecondary,
  MainTittle,
  SubTittle,
} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Landing = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token?.length) {
          navigation.navigate('HomeRoot' as never);
        }
      };
      getToken();
    }, [navigation]),
  );

  return (
    <SafeAreaView style={style.container}>
      <View style={style.welcomeContainer}>
        <MainTittle title={'Welcome to 2Do'} />
        <SubTittle
          title={'Please login with your account or create a new one'}
        />
      </View>
      <View style={style.welcomeButtons}>
        <ButtonPrimary
          customStyle={{marginBottom: 10}}
          onPress={() => navigation.navigate('SignIn' as never)}
          title={'Login'}
        />
        <ButtonSecondary
          onPress={() => navigation.navigate('SignUp' as never)}
          title={'Register'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Landing;
