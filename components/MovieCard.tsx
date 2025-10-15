import {Link} from "expo-router";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {icons} from "@/constants/icons";
const MovieCard = (
    {
        id,
        poster_path,
        title,
        vote_average,
        release_date
    }:Movie
)=>{
    return(
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity
                style={styles.cardContainer}>
                <Image
                    style={styles.image}
                    source={
                        {
                            uri:poster_path?
                                `https://image.tmdb.org/t/p/w500${poster_path}`
                                :'https://placehold.co/600x400/1a1a1a/ffffff.png',
                        }}
                />
                <Text numberOfLines={1} style={styles.textStyle}>{title}</Text>
                <View style={styles.ratingRow}>
                    <Image source={icons.star} style={styles.iconStar}/>
                    <Text style={styles.ratingText}>{Math.round(vote_average/2)}</Text>
                </View>
                <Text style={styles.dateText}>{release_date.split('-')[0]}</Text>
            </TouchableOpacity>
        </Link>
    )
}
export default MovieCard;
const styles = StyleSheet.create({
    cardContainer: {
        width: "30%",
    },
    image:{
        width: "100%",
        height: 167,
        resizeMode: "cover",
        borderRadius:10
    },
    textStyle: {
        fontSize: 12,
        lineHeight:16,
        fontWeight: "700",
        color:'white',
        marginTop:12
    },
    ratingRow:{
        marginTop:8,
        flexDirection:'row',
        alignItems:"center"
    },
    iconStar :{
        width:10,
        height:10,
    },
    ratingText:{
        fontSize:10,
        color:'white',
        fontWeight:'700',
        marginStart:2
    },
    dateText:{
        marginTop:5,
        marginBottom:24,
        fontSize:10,
        lineHeight:14,
        color:'white',
    }
});