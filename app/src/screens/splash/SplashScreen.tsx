import React from "react"
import {Image, StyleSheet, Text, View} from "react-native"
import { colorScheme } from "../../utils/colorScheme"
import ic_launcher from "../../assets/ic_launcher.png"

export const SplashScreen = ()=>{

    return <View style={styles.wrapper}>
        <Text style={styles.title}>EasyChat</Text>
        <Image source={ic_launcher} style={styles.image} />
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colorScheme.primary,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        color: colorScheme.textOnPrimary,
        fontWeight: "700",
        textAlign: "center",
    },
    image: {
        width: 190,
        height: 190,
        alignSelf: "center",
    }
})