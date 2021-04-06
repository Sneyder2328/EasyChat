import React from "react"
import { StyleSheet, View } from "react-native"
import { AppScreens } from "../../../App"
import { Input } from "../../components/Input"
import { Toolbar } from "../../components/ToolBar"
import { colorScheme } from "../../utils/colorScheme"

export const CreateGroupScreen = ({ navigation }) => {
    const handleBack = () => {
        navigation.navigate(AppScreens.HOME)
    }
    return (<View style={styles.wrapper}>
        <Toolbar title={"New group"} onBackPressed={handleBack} />
        <View style={styles.container}>
        <Input placeholder="Add people..." />
        </View>
        
    </View>)
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colorScheme.primary,
        flex: 1,
    },
    container: {
        padding: 16,
    },
})