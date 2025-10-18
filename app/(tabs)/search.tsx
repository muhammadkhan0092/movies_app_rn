import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useState} from "react";
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
import Logo from "@/components/Logo";
import TopBg from "@/components/TopBg";
import HomeSearchBar from "@/components/HomeSearchBar";
import Loading from "@/components/Loading";
import {updateSearchCount} from "@/services/appwrite";
const Search = () => {
    const router = useRouter();
    const [searchQuery,setSearchQuery] = useState("")
    const {
        data:movies,
        loading,
        error,
        refetchData,
        reset
    } = useFetch(
        ()=>fetchMovies(
            {
                query:searchQuery
            }
        ),false
    )

    useEffect(()=>{
        const timeoutId  =setTimeout(async ()=>{
            if(searchQuery.trim()){
                await refetchData()
            }
            else {
                reset()
            }
        },500);
        return ()=>{
            clearTimeout(timeoutId);
        }
    },[searchQuery])
    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]){
            updateSearchCount(searchQuery,movies[0])
        }
        else
        {
            console.log("error")
        }
    }, [movies]);
    return (
        <View style={styles.fullScreen}>
            <FlatList
                data={movies}
                renderItem=
                    {
                ({item})=><MovieCard {...item}/>}
                columnWrapperStyle={{gap:20}}
                keyExtractor={(item)=>item.id.toString()}
                numColumns={3}
                style={{paddingStart:20,paddingEnd:20}}
                ListEmptyComponent={
                !loading && !error?(
                    <Text
                        style={{color:'white',fontSize:20,fontWeight:'700',alignSelf:'center',marginTop:20}}
                    >
                        {searchQuery.trim()?`No Movies Found for ${searchQuery}`:"Search For A Movie"}
                    </Text>
                ):null
                }
                ListHeaderComponent={
                <>
                    <TopBg/>
                    <Logo/>
                    <View style={{marginTop:24}}>
                        <HomeSearchBar placeHolderText={"movies"} value={searchQuery} onValueChanged={
                            (text) => setSearchQuery(text)
                        } />
                    </View>
                    {
                        loading && (
                            <Loading/>
                        )
                    }
                    {
                        error && (
                            <Text>Error Loading Movies</Text>
                        )
                    }
                    {
                        !error && !loading && searchQuery.trim() && movies?.length>0 &&(
                            <Text style={{marginTop:40,marginBottom:20,color:'white',fontSize:20,lineHeight:28,fontWeight:"700"}}>Search Results for</Text>
                        )
                    }
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
    }
});
