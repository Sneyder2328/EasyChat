import React from "react"
import { View } from "react-native"
import { AppScreens } from "../../../App"
import { Toolbar } from "../../components/ToolBar"

export const CreateGroupScreen = ({ navigation }) => {
    const handleBack = () => {
        navigation.navigate(AppScreens.HOME)
    }
    return (<View>
        <Toolbar title={"New group"} onBackPressed={handleBack} />
    </View>)
}