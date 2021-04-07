import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { useSelector } from "react-redux";
import { isAuthSelector } from "./modules/selectors";
import { CreateGroupScreen } from "./screens/createGroup/CreateGroupScreen";
import { HomeScreen } from "./screens/home/HomeScreen";
import { LogInScreen } from "./screens/logIn/LogInScreen";
import { SearchScreen } from "./screens/search/SearchScreen";
import { SignUpScreen } from "./screens/signUp/SignUpScreen";
import { WelcomeScreen } from "./screens/welcome/WelcomeScreen";

const Stack = createStackNavigator();

export const AppScreens = {
    LOG_IN: "LogIn",
    SIGN_UP: "SignUp",
    SPLASH: "Splash",
    HOME: "Home",
    WELCOME: "Welcome",
    CREATE_GROUP: "CreateGroup",
    SEARCH: "Search",
}

export const AppNavigator = () => {
    const isAuthenticated = useSelector(isAuthSelector)

    return (
        <NavigationContainer>
            { isAuthenticated ? (<Stack.Navigator initialRouteName={AppScreens.HOME}>
                <Stack.Screen
                    name={AppScreens.HOME}
                    component={HomeScreen}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name={AppScreens.CREATE_GROUP}
                    component={CreateGroupScreen}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name={AppScreens.SEARCH}
                    component={SearchScreen}
                    options={{ header: () => null }}
                />
            </Stack.Navigator>) : (
                <Stack.Navigator initialRouteName={AppScreens.WELCOME}>
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
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}