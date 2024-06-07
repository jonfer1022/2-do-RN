/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import MainRender from './src';
import {mainContainer} from './src/style';
import {SafeAreaView} from 'react-native-safe-area-context';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={mainContainer.container}>
        <MainRender />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
