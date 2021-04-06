/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { colorScheme } from './src/utils/colorScheme';
import { SplashScreen } from './src/screens/splash/SplashScreen';
import { persistor, store } from './src/modules/store';
import { AppNavigator } from './src/AppNavigator';
import { removeAuthTokenHeaders, setAccessTokenHeaders } from "./src/api";

// Fix to issue of Basic auth not working at all with axios
import { decode, encode } from 'base-64'
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;
// Reference: https://stackoverflow.com/questions/42829838/react-native-atob-btoa-not-working-without-remote-js-debugging/42833475

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorScheme.primary,
    accent: colorScheme.accent,
    surface: colorScheme.primary,
    text: colorScheme.textOnPrimary,
  }
}
const App = () => {

  return (<Provider store={store}>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={'light-content'} backgroundColor={colorScheme.primaryDark2} />
        <AppNavigator />
      </PaperProvider>
    </PersistGate>
  </Provider>)

  // return (
  //   <SafeAreaView style={styles.backgroundStyle}>
  //     <StatusBar barStyle={'light-content'} />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic">
  //       <View>
  //         <HomeScreen />
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
};

let currentValue: string | undefined

const handleChange = () => {
  const previousValue = currentValue
  currentValue = store.getState().auth.accessToken

  if (previousValue !== currentValue) {
    console.log('accessToken changed from', previousValue, 'to', currentValue)
    if (currentValue) {
      setAccessTokenHeaders(currentValue);
    } else if (previousValue) {
      removeAuthTokenHeaders()
    }
  }
};

store.subscribe(handleChange)

export default App;

