import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { AppScreens } from "../../../App"
import icLauncher from "../../assets/ic_launcher.png"
import { Button } from "../../components/Button"
import { colorScheme } from "../../utils/colorScheme"

export const WelcomeScreen = ({navigation}) => {

    const handleLogIn = () => {
        navigation.navigate(AppScreens.LOG_IN)
    }
    const handleSignUp = () => {
        navigation.navigate(AppScreens.SIGN_UP)
    }

    return (<View style={styles.container}>
        <Text style={styles.title}>Welcome to EasyChat</Text>
        <Image source={icLauncher} style={styles.image} />
        <Button title="Log in" onPress={handleLogIn} />
        <Button title="Sign up" onPress={handleSignUp} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.primary,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: colorScheme.textOnPrimary,
        textAlign: "center",
        fontWeight: "700",
    },
    image: {
        width: 190,
        height: 190,
        alignSelf: "center",
        marginTop: 16,
    }
})