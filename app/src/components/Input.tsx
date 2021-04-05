import React from "react"
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { colorScheme } from "../utils/colorScheme"

type Props = {
    includeLabel?: boolean;
    placeholder: string;
    defaultValue?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    labelStyle?: StyleProp<TextStyle>;
} & React.ComponentPropsWithRef<typeof TextInput>

export const Input: React.FC<Props> =
    ({ placeholder, includeLabel, defaultValue, containerStyle,
        inputStyle, labelStyle, ...props }) => {

        return (<View style={[styles.container, containerStyle]}>
            {includeLabel && <Text style={[styles.label, labelStyle]}>{placeholder}</Text>}
            <TextInput style={[styles.input, inputStyle]} placeholderTextColor={colorScheme.textOnPrimaryDark2} placeholder={placeholder} {...props}>{defaultValue}</TextInput>
        </View>)
    }
const styles = StyleSheet.create({
    container: {
    },
    input: {
        backgroundColor: colorScheme.primaryDark,
        color: colorScheme.textOnPrimary,
        marginTop: 8,
        borderRadius: 20,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 16,
    },
    label: {
        color: colorScheme.textOnSecondary2,
        fontWeight: "600",
    }
})