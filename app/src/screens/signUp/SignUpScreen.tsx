import React from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { colorScheme } from "../../utils/colorScheme"

export const SignUpScreen = () => {

    return (<View style={styles.container}>
        <Input placeholder="Username" includeLabel={true} containerStyle={styles.input} />
        <Input placeholder="Fullname" includeLabel={true} containerStyle={styles.input} />
        <Input placeholder="Email" includeLabel={true} containerStyle={styles.input} />
        <Input placeholder="Password" includeLabel={true} containerStyle={styles.input} />
        <Button title="Sign up" style={styles.button} />
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme.primary,
        padding: 16,
    },
    input: {
        marginTop: 12,
    },
    button: {
        width: "100%",
    }
})