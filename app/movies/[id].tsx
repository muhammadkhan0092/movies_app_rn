import {View, Text, Dimensions, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import React from "react";
import {getMovieDetails} from "@/services/api";
import useFetch from "@/services/useFetch";
import Loading from "@/components/Loading";
import {useLocalSearchParams} from 'expo-router'
const {width,height} = Dimensions.get("window");

const MovieDetails = () => {
    const {id} = useLocalSearchParams()
    const {
        data: movieDetails,
        error,
        loading,
    } = useFetch(()=> getMovieDetails(id as string))
    return (
        <ScrollView style={styles.container}>
            {
                loading?(
                    <Loading/>
                ):error?(
                  <Text>Error Loading Data</Text>
                ):movieDetails?(
                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={{
                                uri:movieDetails.poster_path?
                                    `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                                    :'https://placehold.co/600x400/1a1a1a/ffffff.png',
                        }}
                        />
                        <View style={styles.paddingContent} >
                            <Text style={styles.title}>{movieDetails.title}</Text>
                            <Text style={[styles.headings,{marginTop:36}]}>Overview</Text>
                            <Text style={[styles.textContent,{marginTop:4}]}>{movieDetails.overview}</Text>
                            <View style={
                                {
                                    flexDirection:'row',
                                    width:'100%',
                                    alignItems:'stretch',
                                    justifyContent:'space-between',
                                    marginTop:24
                                }
                            }>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={[styles.headings]}>Release Date</Text>
                                    <Text style={[styles.textContent]}>{movieDetails.release_date}</Text>
                                </View>
                                <View style={{flexDirection:'column',marginEnd:50}}>
                                    <Text style={[styles.headings]}>Status</Text>
                                    <Text style={[styles.textContent]}>{movieDetails.status}</Text>
                                </View>
                            </View>
                            <Text style={[styles.headings,{marginTop:24}]}>Generes</Text>
                            <FlatList
                                style = {{marginTop:8}}
                                horizontal
                                ItemSeparatorComponent={()=>(
                                    <View style={{marginEnd:10}}>
                                    </View>
                                )}
                                data={movieDetails.genres} renderItem={
                                (item)=>(
                                    <Text style={styles.generes}>{item.item.name}</Text>
                                )
                            }
                            />
                            {
                                movieDetails.production_countries.length > 0 && (
                                    <>
                                        <Text style={[styles.headings, { marginTop: 24 }]}>Countries</Text>
                                        {movieDetails.production_countries.map((country, index) => (
                                            <View key={index}>
                                                <Text style={styles.textContent}>{country.name}</Text>
                                            </View>
                                        ))}
                                    </>
                                )
                            }
                            <View style={
                                {
                                    flexDirection:'row',
                                    width:'100%',
                                    marginTop:24
                                }
                            }>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={[styles.headings]}>Budget</Text>
                                    <Text style={[styles.textContent]}>{movieDetails.budget}</Text>
                                </View>
                                <View style={{flexDirection:'column',marginStart:32}}>
                                    <Text style={[styles.headings]}>Revenue</Text>
                                    <Text style={[styles.textContent]}>{movieDetails.revenue}</Text>
                                </View>
                            </View>
                            <Text style={[styles.headings,{marginTop:24}]}>Tagline</Text>
                            <Text style={[styles.textContent,{marginTop:4}]}>{movieDetails.tagline}</Text>
                            {movieDetails.production_companies &&
                                movieDetails.production_companies.length > 0 && (
                                    <View style={{ width: '100%' }}>
                                        <Text style={[styles.headings, { marginTop: 24 }]}>
                                            Production Companies
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                width: '100%',
                                                marginTop: 8,
                                            }}
                                        >
                                            {movieDetails.production_companies.map((company, index) => (
                                                <Text
                                                    key={company.id ?? index} // ✅ add unique key
                                                    style={[styles.textContent, { marginRight: 10 }]}
                                                >
                                                    {company.name}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}

                            <Text style={styles.button}>Visit Home Page</Text>
                        </View>
                    </View>
                ):null
            }
        </ScrollView>
    )
}
export default MovieDetails;

const styles = StyleSheet.create(
    {
        container:{
            flex: 1,
            flexDirection: "column",
            backgroundColor:'#030014'
        },
        image:{
            width:'100%',
            height:height*0.5,
            resizeMode:'cover',
            marginTop:50,
            borderRadius:10,
        },
        title:{
            fontSize:20,
            lineHeight:28,
            color:'white',
            fontWeight:'700',
        },
        paddingContent:{
            paddingTop:17,
            paddingBottom:36,
            paddingStart:20,
            paddingEnd:20,
        },
        headings:{
            color:'#A8B5DB',
            fontSize:12,
            fontWeight:'400'
        },
        textContent:{
            fontSize:14,
            lineHeight:10*1.75,
            fontWeight:'400',
            color:'#D6C7FF',
        },
        generes:{
            backgroundColor:'#221F3D',
            borderRadius:10,
            paddingTop:6,
            paddingBottom:6,
            paddingStart:10,
            paddingEnd:10,
            color:'white',
        },
        button:{
            textAlign:'center',
            width:'100%',
            paddingTop:12,
            paddingBottom:12,
            marginTop:24,
            backgroundColor:'#D6C7FF',
            borderRadius:10,
        }
    }
)