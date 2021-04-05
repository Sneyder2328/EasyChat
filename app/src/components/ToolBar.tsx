import React from "react"
import { Image, ImageSourcePropType, Platform, StyleSheet, Text, View } from "react-native"
import { Appbar } from 'react-native-paper';
import { colorScheme } from "../utils/colorScheme"


type Props = {
    title?: string;
    icon?: ImageSourcePropType;
    onBackPressed?: () => any;
}

export const Toolbar: React.FC<Props> = ({ title, icon, onBackPressed, children }) => {
    return (<View style={styles.container}>
        <View style={styles.leftActions}>
            {onBackPressed && <Appbar.BackAction onPress={onBackPressed} color={colorScheme.textOnPrimary} />}
            {icon && <Image source={icon} style={styles.icon} />}
            {title && <Text style={styles.title}>{title}</Text>}
        </View>
        <View style={styles.rightActions}>
            {children}
        </View>
    </View>)
}
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.primaryDark,
        flexDirection: "row",
        height: APPBAR_HEIGHT,
        alignItems: "center",
        justifyContent: "space-between"
    },
    leftActions: {
        flexDirection: "row",
        alignItems: "center",
        marginStart: 16,
    },
    rightActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        color: colorScheme.textOnPrimaryDark,
        fontSize: 22,
        fontWeight: "bold",
    },
    icon: {
        width: 48,
        height: 48,
    }
})