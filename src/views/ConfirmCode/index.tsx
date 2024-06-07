import React, {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {style} from './style';
import {ButtonPrimary, MainTittle, Paragraph} from '../../components';
import axiosInstance from '../../utils/axios/fetcher';
import {AuthStackList} from '../../utils/types/navigation.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAccessToken {
  accessToken: string;
  refreshToken: string;
}

const ConfirmCode = () => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const route = useRoute<RouteProp<AuthStackList, 'ConfirmCode'>>();
  const navigation = useNavigation();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.post<IAccessToken>(
        '/auth/confirm-signup',
        {
          code: value,
          name: route.params.name,
          email: route.params.email,
          password: route.params.password,
        },
      );
      const {accessToken, refreshToken} = response.data;
      AsyncStorage.setItem('token', accessToken);
      AsyncStorage.setItem('refreshToken', refreshToken);
      navigation.navigate('HomeRoot' as never);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <MainTittle title={'Almost there'} />
      <Paragraph title={'Enter the code we just sent you to your email'} />
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={style.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[style.cellContainer, isFocused && style.focusCell]}>
            <Text style={[style.cell]} onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <ButtonPrimary
        onPress={handleConfirm}
        title={'Confirm'}
        disabled={value.length < 6}
      />
    </SafeAreaView>
  );
};

export default ConfirmCode;
