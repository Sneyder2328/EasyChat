import React from "react"
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"
import { colorScheme } from "../utils/colorScheme"

type Props = {
    title: string;
    disabled?: boolean;
    style?: ViewStyle;
    negative?: boolean;
} & React.ComponentPropsWithRef<typeof TouchableOpacity>

export const Button: React.FC<Props> = ({ title, disabled, style, negative, ...props }) => {
    return <TouchableOpacity
        style={[
            styles.container, style, disabled && styles.containerDisabled,
            negative && styles.containerNegative
        ]} {...props}>
        <Text style={[styles.title, disabled && styles.titleDisabled]}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.accent,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 30,
        minWidth: "80%",
        alignItems: "center",
        alignSelf: "center"
    },
    containerDisabled: {
        backgroundColor: colorScheme.accentDisabled,
    },
    containerNegative: {
        backgroundColor: colorScheme.accentNegative,
    },
    title: {
        color: colorScheme.textOnAccent,
        fontSize: 18,
        fontWeight: "700",
    },
    titleDisabled: {
        color: colorScheme.textOnAccentDisabled,
    }
})