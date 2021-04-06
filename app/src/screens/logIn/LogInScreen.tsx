import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import icLauncher from "../../assets/ic_launcher.png"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { LoadingOverlay } from "../../components/LoadingOverlay"
import { logInUser } from "../../modules/auth/authActions"
import { isLogingInSelector } from "../../modules/selectors"
import { colorScheme } from "../../utils/colorScheme"

export const LogInScreen = ({ navigation }) => {
    const isLogingIn = useSelector(isLogingInSelector)
    const dispatch = useDispatch()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const logIn = () => {
        if (username.length === 0) {
            alert("Please enter your username")
            return
        }
        if (password.length === 0) {
            alert("Please enter your password")
            return
        }
        dispatch(logInUser({ username, password }))
    }

    return (
        <ScrollView
            style={styles.wrapper}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
                <Image source={icLauncher} style={styles.image} />
                <Input
                    placeholder="Username"
                    label={"Username"}
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                    returnKeyType={'next'}
                    autoCapitalize={'none'}
                    containerStyle={styles.input} />
                <Input
                    placeholder="Password"
                    label={"Password"}
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType={'send'}
                    autoCapitalize={'none'}
                    containerStyle={styles.input} />
                <Button
                    title="Log in"
                    onPress={logIn}
                    style={styles.button} />
                <TouchableOpacity onPress={() => { navigation.replace('SignUp') }}>
                    <Text style={styles.register}>Do not have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
            <LoadingOverlay visible={isLogingIn} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colorScheme.primary,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        alignSelf: "center",
        width: 190,
        height: 190,
        marginTop: 16,
    },
    input: {
        marginTop: 12,
    },
    button: {
        width: "100%",
        marginTop: 32,
    },
    register: {
        color: colorScheme.accent,
        fontSize: 15,
        textAlign: "center",
        marginTop: 46,
        fontWeight: "600",
    }
})