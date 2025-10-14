import {Text, View, StyleSheet, Image, ScrollView, ActivityIndicator} from "react-native";
import {images} from "@/constants/images";
import HomeSearchBar from "@/components/HomeSearchBar";
import {icons} from "@/constants/icons";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";

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
                <Image
                    style={styles.topBg}
                    source={images.bg}
                />
                <Image
                    style={styles.logo}
                    source={icons.logo}/>
                {
                    moviesLoading?(
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            style={styles.loading}
                        />
                    ) :moviesError?(
                        <Text>Error : {moviesError?.message}</Text>
                    ):(
                        <View style={styles.searchStyle}>
                            <HomeSearchBar
                                placeHolderText="Search For A Movie"
                                onPress = {()=>router.push("/search")}
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
        position: "absolute", // 👈 makes it ignore layout padding from bottom tab
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
