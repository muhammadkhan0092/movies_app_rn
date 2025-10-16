import {ActivityIndicator, StyleSheet} from "react-native";

const Loading = ()=>{
    return(
        <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
        />
    )
}
export default Loading;
const styles = StyleSheet.create({
    logo:{
        alignSelf: "center",
        marginTop:54,
    },
    loading:{
        marginTop:10,
        alignSelf: "center",
    }
});