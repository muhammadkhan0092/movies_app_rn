import {Image, StyleSheet} from "react-native";
import {images} from "@/constants/images";

const TopBg = ()=>{
    return(
        <Image
            style={styles.topBg}
            source={images.bg}
        />
    )
}
export default TopBg;
const styles = StyleSheet.create({
    topBg:{
        position: "absolute",
        width: "100%",
    }
});
