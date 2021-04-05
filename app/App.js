/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { HomeScreen } from './src/screens/home/HomeScreen';
import { colorScheme } from './src/utils/colorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { WelcomeScreen } from './src/screens/welcome/WelcomeScreen';
import { SplashScreen } from './src/screens/splash/SplashScreen';
import { SignUpScreen } from './src/screens/signUp/SignUpScreen';
import { LogInScreen } from './src/screens/logIn/LogInScreen';
import { CreateGroupScreen } from './src/screens/CreateGroup.tsx/CreateGroupScreen';

const Stack = createStackNavigator();

export const AppScreens = {
  LOG_IN: "LogIn",
  SIGN_UP: "SignUp",
  SPLASH: "Splash",
  HOME: "Home",
  WELCOME: "Welcome",
  CREATE_GROUP: "CreateGroup",
}

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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.HOME}>
          <Stack.Screen
            name={AppScreens.SPLASH}
            component={SplashScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name={AppScreens.HOME}
            component={HomeScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name={AppScreens.WELCOME}
            component={WelcomeScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name={AppScreens.SIGN_UP}
            component={SignUpScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name={AppScreens.LOG_IN}
            component={LogInScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name={AppScreens.CREATE_GROUP}
            component={CreateGroupScreen}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <HomeScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: colorScheme.primary,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;