import React from "react"
import { StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { colorScheme } from "../utils/colorScheme";

type Props = {
    visible: boolean;
}
export const DialogWrapper: React.FC<Props> & { Title: React.FC<TitleProps> } = ({ visible, children }) => {
    return (
        <View>
            <Dialog.Container visible={visible} contentStyle={styles.container}>
                {children}
            </Dialog.Container>
        </View>
    )
}

type TitleProps = { 
    
}
const Title: React.FC<TitleProps> = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>
}
DialogWrapper.Title = Title

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.secondaryDark,
        borderRadius: 24,
        padding: 32,
        paddingTop: 10,
    },
    title: {
        color: colorScheme.textOnPrimary,
        fontSize: 20,
        textAlign: "center",
        paddingEnd: 18,
        paddingStart: 18,
        fontWeight: "700",
        marginBottom: 16,
    }
})