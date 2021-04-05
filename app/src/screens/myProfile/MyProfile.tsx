import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { Button } from "../../components/Button"
import { ListItem } from "../../components/ListItem"
import sample from "../../assets/ic_launcher.png"

export const MyProfileScreen = () => {
    return (<View style={styles.container}>
        <Image source={sample} style={styles.image} />
        <ListItem value={"@stas2328"} label={"Username"}/>
        <ListItem value={"Software developer"} label={"Bio"}/>
        <Button title="Save changes" style={styles.button}/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    button: {
        width: "100%",
    },
    image: {
        width: 190,
        height: 190,
        alignSelf: "center",
    }
})