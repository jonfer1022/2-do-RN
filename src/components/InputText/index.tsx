import React from 'react';
import {KeyboardTypeOptions, Pressable, TextInput, View} from 'react-native';
import {style} from './style';
import Icon from 'react-native-vector-icons/Ionicons';

interface IInputTextProps {
  onChange: (text: string) => void;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  customStyle?: object;
}

interface IInputTextIconProps extends IInputTextProps {
  icon: JSX.Element;
}

interface IInputPasswordProps extends IInputTextProps {
  showPassword: boolean;
  onIconPress: (change: boolean) => void;
}

interface IInputButtonProps extends Partial<IInputTextProps> {
  icon: JSX.Element;
  onPress: () => void;
  onChange?: (text: string) => void;
}

export const InputText = ({
  onChange,
  value,
  placeholder,
  keyboardType = 'default',
  customStyle,
}: IInputTextProps) => {
  return (
    <TextInput
      style={[style.textInput, customStyle]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  );
};

export const InputTextIcon = ({
  onChange,
  value,
  placeholder,
  keyboardType = 'default',
  customStyle,
  icon,
}: IInputTextIconProps) => {
  return (
    <View style={[style.textInputIconContainer, customStyle]}>
      <TextInput
        style={[style.textInputIcon]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      <View>{icon}</View>
    </View>
  );
};

export const InputPassword = ({
  onChange,
  value,
  showPassword,
  customStyle,
  keyboardType = 'default',
  placeholder,
  onIconPress,
}: IInputPasswordProps) => {
  return (
    <View style={[style.textInputIconContainer, customStyle]}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[style.textInputIcon]}
        secureTextEntry={showPassword}
        value={value}
        onChangeText={onChange}
      />
      <Pressable onPress={() => onIconPress(!showPassword)}>
        {showPassword ? (
          <Icon name="eye-off-outline" size={22} color={'white'} />
        ) : (
          <Icon name="eye-outline" size={22} color={'white'} />
        )}
      </Pressable>
    </View>
  );
};

export const InputButton = ({
  icon,
  value,
  placeholder,
  keyboardType = 'default',
  customStyle,
  onPress,
}: IInputButtonProps) => {
  return (
    <Pressable
      style={[style.textInputIconContainer, customStyle]}
      onPress={onPress}>
      <TextInput
        onPressIn={e => {
          e.preventDefault();
          e.stopPropagation();
          onPress();
        }}
        style={[style.textInputIcon]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        readOnly
      />
      <View>{icon}</View>
    </Pressable>
  );
};
