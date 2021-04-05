import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { colorScheme } from "../utils/colorScheme"

type Props = {
    label: string;
    value: string;
} & React.ComponentPropsWithRef<typeof View>

export const ListItem: React.FC<Props> = ({ label, value, ...props }) => {

    return (<View style={styles.container} {...props}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: colorScheme.textOnPrimary2,
        paddingTop: 12,
        paddingBottom: 12,
    },
    label: {
        fontSize: 14,
        color: colorScheme.textOnPrimary,
        fontWeight: "700",
    },
    value: {
        fontSize: 14,
        color: colorScheme.textOnPrimary,
    }
})