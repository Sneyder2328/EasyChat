import React, { FC } from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { colorScheme } from "../utils/colorScheme"

type Props = {
    visible: boolean;
}
export const LoadingOverlay: FC<Props> = ({ visible }) => {
    if (!visible) return null
    return <View style={
        {
            ...styles.overlay,
            // width: useWindowDimensions().width,
            // height: useWindowDimensions().height,
        }}> 
        <ActivityIndicator size="large" color={colorScheme.accent} />
    </View>
}
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colorScheme.primaryDark2,
        opacity: 0.7,
        zIndex: 5,
        justifyContent: "center",
    },
})