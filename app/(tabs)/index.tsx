import { Text, View, StyleSheet } from "react-native";

export default function Index() {
    return (
        <View style={styles.fullScreen}>
            <Text style={{ color: "white" }}>Full Screen Background ✅</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#030014",
        position: "absolute", // 👈 makes it ignore layout padding from bottom tab
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
