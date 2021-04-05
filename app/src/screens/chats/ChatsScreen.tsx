import React from "react"
import { StyleSheet, View } from "react-native"
import { colorScheme } from "../../utils/colorScheme"
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { InputDialog } from "../../dialogs/InputDialog";

export const ChatsScreen = () => {
    return (<View style={styles.container}>
        <Icon name="arrow-left" size={28} color="#FFF" />
        <Icon name="comments" size={30} color="#FFF" />
        <Icon name="comment-dots" size={30} color="#FFF" />
        <Icon name="users" size={30} color="#FFF" />
        <Icon name="user" size={30} color="#FFF" />
        <InputDialog visible={false} placeholder={"username"} title={"Edit username"}
        defaultValue={"stas2328"} onSave={()=>{}} onClose={()=>{}}/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})