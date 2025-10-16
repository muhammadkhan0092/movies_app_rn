import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import React from "react";
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
const Search = () => {
    const router = useRouter();
    const {
        data:movies,
        loading:moviesLoading,
        error:moviesError
    } = useFetch(
        ()=>fetchMovies(
            {
                query:''
            }
        )
    )
    return (
        <View style={styles.fullScreen}>
            <Image source={images.bg} style={styles.topBg}/>
            <FlatList
                data={movies}
                renderItem=
                    {
                ({item})=><MovieCard {...item}/>
            }
                keyExtractor={(item)=>item.id.toString()}
                numColumns={3}
                ListHeaderComponent={
                <>
                </>
                }
            />
        </View>
    )
}
export default Search;

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#030014",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom:100
    },
    logo:{
        alignSelf: "center",
        marginTop:54,
    },
    topBg:{
        position: "absolute",
        width: "100%",
    },
    scrollStyle:{
        flex: 1,
        paddingHorizontal:20,
    },
    searchStyle:{
        marginTop:24,
        width:"100%",
    },
    loading:{
        marginTop:10,
        alignSelf: "center",
    }
});
