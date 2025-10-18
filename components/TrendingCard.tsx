import {Image, Linking, StyleSheet, Text, TouchableOpacity, View,Dimensions} from "react-native";
import {Link} from "expo-router";
import MovieCard from "@/components/MovieCard";
const { width, height } = Dimensions.get('window');
const TrendingCard = (
    {movie:{movie_id,poster_url,title},index}:TrendingCardProps
    ) =>{
    return(
       <Link href={`/movies/${movie_id}`} asChild>
           <TouchableOpacity style={styles.container}>
               <View style={styles.container}>
                   <Image
                       style={styles.image}
                       source={{uri:poster_url}}
                   />
                   <Text style={styles.trendCount}>{index+1}</Text>
               </View>
               <Text numberOfLines={1} style={styles.title}>{title}</Text>
           </TouchableOpacity>
       </Link>
    )
}
export default TrendingCard;

const styles = StyleSheet.create(
    {
        container:{
            width:width*0.3,
            flexDirection:'column'
        },
        image:{
            borderRadius:10,
            width:width*0.3,
            height:height*0.2,
            zIndex:55,
            marginStart:5,
        },
        imageContainer:{
            width:width*0.3,
            height:height*0.2,
        },
        title:{
            marginTop:9,
            color:'white',
            fontSize:12,
            lineHeight:16,
            fontWeight:'700'
        },
        trendCount:{
            position:"absolute",
            bottom:-10,
            start:0,
            color:'white',
            fontSize:44,
            fontWeight:'700',
            zIndex:70,
        }
    }
)