import React from 'react';
import {Modal, View, ActivityIndicator} from 'react-native';
import {style} from './style';
import {primaryAction} from '../../utils/styles/colors';

interface ILoadingProps {
  isVisible: boolean;
}

const Loading = ({isVisible}: ILoadingProps) => {
  return (
    <Modal transparent={true} visible={isVisible} collapsable={isVisible}>
      <View style={style.modalContainer}>
        <View>
          <ActivityIndicator
            collapsable={isVisible}
            size="large"
            color={primaryAction}
            style={[style.indicator]}
            animating={isVisible}
            hidesWhenStopped={isVisible}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
