import {Text, View, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList} from "react-native";
import {images} from "@/constants/images";
import HomeSearchBar from "@/components/HomeSearchBar";
import MovieCard from "@/components/MovieCard";
import {icons} from "@/constants/icons";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import TopBg from "@/components/TopBg";
import Logo from "@/components/Logo";
import Loading from "@/components/Loading";
export default function Index() {
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
            <ScrollView style={styles.scrollStyle}>
                <TopBg/>
                <Logo/>
                {
                    moviesLoading?(
                        <Loading/>
                    ) :moviesError?(
                        <Text>Error : {moviesError?.message}</Text>
                    ):(
                        <View>
                            <View style={styles.searchStyle}>
                                <HomeSearchBar
                                    placeHolderText="Search For A Movie"
                                    onPress = {()=>router.push("/search")}
                                />
                            </View>
                            <Text style={{marginTop:50,fontSize:18,lineHeight:20,fontWeight:'700',color:'white',marginBottom:12}}>Latest Movies</Text>
                            <FlatList
                                data={movies}
                                scrollEnabled={false}
                                renderItem={
                                    ({item})=>(
                                        <MovieCard {...item}/>
                                    )
                                }
                                keyExtractor={(item)=>item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{gap:20}}
                            />
                        </View>
                    )
                }
            </ScrollView>
        </View>
    );
}

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
