import React, { useEffect, useState } from "react"
import { FieldErrors, useForm } from 'react-hook-form'
import { Image, StyleSheet, View } from "react-native"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { colorScheme } from "../../utils/colorScheme"
import icLauncher from "../../assets/ic_launcher.png"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { signUpUser } from "../../modules/auth/authActions"
import { genUUID } from "../../utils/utils"
import { LoadingOverlay } from "../../components/LoadingOverlay"
import { isSigningUpSelector } from "../../modules/selectors"

type SignUpFormParams = { username: string, password: string, email: string, fullname: string };

export const SignUpScreen = () => {
    const dispatch = useDispatch()
    const isSigningUp = useSelector(isSigningUpSelector)
    const [username, setUsername] = useState<string>('')
    const [fullname, setFullname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { register, handleSubmit, setValue } = useForm<SignUpFormParams>()

    useEffect(() => {
        setValue("username", username)
        setValue("fullname", fullname)
        setValue('email', email)
        setValue('password', password)
    }, [username, password, email, fullname])

    useEffect(() => {
        register("fullname", {
            required: { value: true, message: 'Please enter your full name' },
            minLength: { value: 2, message: 'This field needs to be at least 2 characters long' }
        })
        register('username', {
            required: { value: true, message: 'Please enter a username' },
            pattern: { value: /^\w+$/, message: 'Username must contain only alphanumeric values' },
            minLength: { value: 2, message: 'Username must be at least 2 characters long' }
        })
        register('email', {
            required: { value: true, message: 'Please enter your email address' },
            pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please provide a properly formatted email address'
            }
        })
        register('password', {
            required: { value: true, message: 'Please enter your password' },
            minLength: { value: 8, message: 'Your password needs to be at least 8 characters long' }
        })
    }, [register])

    const onValidData = (data: SignUpFormParams) => {
        console.log('onValidData', data);
        dispatch(signUpUser({ ...data, id: genUUID() }))
    }
    const onInvalidData = (errors: FieldErrors) => {
        console.log('onInvalidData', errors);
        alert(Object.values(errors)[0].message)
    }

    return (
        <ScrollView
            style={styles.wrapper}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
                <Image source={icLauncher} style={styles.image} />
                <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    returnKeyType={'next'}
                    autoCapitalize={'none'}
                    label={"Username"}
                    containerStyle={styles.input} />
                <Input
                    placeholder="Fullname"
                    value={fullname}
                    onChangeText={setFullname}
                    returnKeyType={'next'}
                    autoCapitalize={'words'}
                    label={"Fullname"}
                    containerStyle={styles.input} />
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType={'email-address'}
                    autoCompleteType={'email'}
                    label={"Email"}
                    containerStyle={styles.input} />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCompleteType={'password'}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    label={"Password"}
                    containerStyle={styles.input} />
                <Button
                    title="Sign up"
                    onPress={handleSubmit(onValidData, onInvalidData)}
                    style={styles.button} />
            </View>
            <LoadingOverlay visible={isSigningUp} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colorScheme.primary,
    },
    container: {
        padding: 16,
        flex: 1,
    },
    image: {
        alignSelf: "center",
        width: 190,
        height: 190,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        width: "100%",
        marginTop: 16,
    }
})