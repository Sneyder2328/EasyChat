import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { colorScheme } from "../../utils/colorScheme"

export const LogInScreen = () => {

    return (<View style={styles.container}>
        <Input placeholder="Username" includeLabel={true} containerStyle={styles.input} />
        <Input placeholder="Password" includeLabel={true} containerStyle={styles.input} />
        <Button title="Log in" style={styles.button} />
        <Text style={styles.register}>Do not have an account?</Text>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme.primary,
        padding: 20,
        justifyContent: "center",
    },
    input: {
        marginTop: 12,
    },
    button: {
        width: "100%",
    },
    register: {
        color: colorScheme.accent,
        fontSize: 15,
        textAlign: "center",
        marginTop: 46,
        fontWeight: "600",
    }
})