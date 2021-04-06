import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { colorScheme } from "../../utils/colorScheme"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ChatsScreen } from "../chats/ChatsScreen";
import { GroupsScreen } from "../groups/GroupsScreen";
import { MyProfileScreen } from "../myProfile/MyProfile";
import { Toolbar } from "../../components/ToolBar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Appbar, Menu } from 'react-native-paper';
import { Platform } from 'react-native';
import { AppScreens } from "../../AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../modules/auth/authActions";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { isLogingOutSelector } from "../../modules/selectors";

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = ({ navigation }) => {
    const isLogingOut = useSelector(isLogingOutSelector)
    const dispatch = useDispatch()
    const [menuVisible, setMenuVisible] = useState(false)
    const handleSearch = () => {
        console.log("handleSearch");
    }
    const openMenu = () => setMenuVisible(true)
    const closeMenu = () => setMenuVisible(false)

    const handleNewGroup = () => {
        closeMenu()
        navigation.navigate(AppScreens.CREATE_GROUP)
    }
    const handleLogOut = () => {
        dispatch(logOutUser())
    }

    return (
        <View style={styles.wrapper}>
            <Toolbar title="EasyChat">
                <Appbar.Action icon="magnify" color={colorScheme.textOnPrimary} onPress={handleSearch} />
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon={MORE_ICON} color={colorScheme.textOnPrimary} onPress={openMenu} />}>
                    <Menu.Item onPress={handleNewGroup} title="New group" />
                    <Menu.Item onPress={handleLogOut} title="Log out" />
                </Menu>
            </Toolbar>
            <Tab.Navigator
                tabBarPosition={'bottom'}
                lazy={true}
                lazyPreloadDistance={1}
                sceneContainerStyle={{ backgroundColor: colorScheme.primary }}
                tabBarOptions={{
                    activeTintColor: colorScheme.textOnPrimary,
                    inactiveTintColor: colorScheme.textOnPrimary2,
                    showLabel: false,
                    showIcon: true,
                    scrollEnabled: false,
                    renderIndicator: () => false,
                    indicatorContainerStyle: {
                        backgroundColor: colorScheme.primaryDark,
                        color: colorScheme.accent,
                    },
                    indicatorStyle: { borderColor: colorScheme.accent },
                    iconStyle: { width: 34, height: 34 },
                }}>
                <Tab.Screen
                    name="Chats"
                    component={ChatsScreen}
                    options={{
                        tabBarIcon: ({ color }: { color: string }) => <Icon name="comments" size={25} color={color} />,
                    }} />
                <Tab.Screen
                    name="Groups"
                    component={GroupsScreen}
                    options={{
                        tabBarIcon: ({ color }: { color: string }) => <Icon name="users" size={25} color={color} />,
                    }} />
                <Tab.Screen
                    name="MyProfile"
                    component={MyProfileScreen}
                    options={{
                        tabBarIcon: ({ color }: { color: string }) => <Icon name="user" size={25} color={color} />,
                    }} />
            </Tab.Navigator>
            <LoadingOverlay visible={isLogingOut} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
})