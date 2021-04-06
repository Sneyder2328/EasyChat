import { StyleSheet, View } from "react-native"
import { AppScreens } from "../../AppNavigator"
import { Toolbar } from "../../components/ToolBar"
import { colorScheme } from "../../utils/colorScheme"

export const SearchScreen = ({ navigation }) => {
    const goBack = () => navigation.replace(AppScreens.HOME)
    return (<View style={styles.container}>
        <Toolbar onBackPressed={goBack} />
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme.primary
    }
})