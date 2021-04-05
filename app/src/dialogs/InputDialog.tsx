import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { DialogWrapper } from "./DialogWrapper"

type Props = {
    title: string;
    placeholder: string;
    defaultValue: string;
    onSave: (newValue: string) => any;
    onClose: () => any;
    visible: boolean;
}
export const InputDialog: React.FC<Props> = ({ title, placeholder, defaultValue, onSave, onClose, visible }) => {
    const [value, setValue] = useState(defaultValue)
    const handleSave = () => {
        console.log("handleSave", value);
        onSave(value)
    }
    return (<DialogWrapper visible={visible}>
        <DialogWrapper.Title>{title}</DialogWrapper.Title>
        <Input placeholder={placeholder} defaultValue={value} onChangeText={setValue} />
        <Button style={styles.button} title="Save" onPress={handleSave} />
        <Button style={styles.button} title="Cancel" onPress={onClose} negative={true} />
    </DialogWrapper>)
}
const styles = StyleSheet.create({
    button: {
        width: "100%",
        marginTop: 24,
    }
})