import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {icons} from "@/constants/icons";

interface Props {
    placeHolderText: string;
    onPress?: () => void;
}
const HomeSearchBar = ({placeHolderText,onPress}:Props)=>{
    return(
        <View style={styles.container}>
            <Image
                source={icons.search}
                style={styles.icon}
                />
            <TextInput
                placeholder={placeHolderText}
                onPress={onPress}
                value=""
                onChangeText={(text)=>{}}
                placeholderTextColor={"#A8B5DB"}
                style={styles.hintStyle}
            />
        </View>
    )
}
export default HomeSearchBar;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor:'#0F0D23',
        borderRadius:100,
        paddingBottom:14,
        paddingTop:14,
        paddingHorizontal:14,
        flexDirection:'row',
    },
    hintStyle:{
        width:'100%',
        fontSize:14,
        color:'#A8B5DB',
        marginStart:10,
    },
    icon:{
        tintColor:'#AB8BFF',
        width:16,
        alignSelf:'center',
        height:16,
    }
})