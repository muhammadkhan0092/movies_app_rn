import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { icons } from "@/constants/icons";

export default function CustomBottomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.wrapper}>   {/* ✅ New wrapper */}
            <View style={styles.container}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel ?? options.title ?? route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconSource;
                    switch (route.name) {
                        case "Home": iconSource = icons.home; break;
                        case "Search": iconSource = icons.search; break;
                        case "Saved": iconSource = icons.save; break;
                        case "Profile": iconSource = icons.person; break;
                        default: iconSource = icons.person;
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={[styles.tabBase, isFocused && styles.tabSelected]}>
                            {isFocused ? (
                                <View style={styles.selectedLayout}>
                                    <Image source={iconSource} style={styles.selectedIcon} />
                                    <Text style={styles.selectedText}>{label}</Text>
                                </View>
                            ) : (
                                <View style={styles.unselectedLayout}>
                                    <Image source={iconSource} style={styles.icon} />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute", // ✅ Stick it to bottom of screen
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: "center", // centers the inner bar horizontally
    },
    container: {
        flexDirection: "row",
        backgroundColor: "#0F0D23",
        elevation: 5,
        justifyContent: "space-around",
        borderRadius: 30,
        marginHorizontal: 20,
        width: "90%",
    },
    tabBase: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    tabSelected: {
        backgroundColor: "#D6C7FF",
        borderRadius: 30,
    },
    selectedLayout: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    unselectedLayout: {
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#A8B5DB",
        resizeMode: "contain",
    },
    selectedIcon: {
        width: 24,
        height: 24,
        tintColor: "black",
        resizeMode: "contain",
    },
    selectedText: {
        fontWeight: "bold",
        fontSize: 16,
        marginStart: 5,
    },
});
