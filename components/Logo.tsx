import {icons} from "@/constants/icons";
import {Image, StyleSheet} from "react-native";

const Logo = ()=>{
    return(
        <Image
            style={styles.logo}
            source={icons.logo}/>
    )
}
export default Logo;
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