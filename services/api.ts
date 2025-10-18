import {fetch} from "expo/fetch";

export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}
interface props{
    query:string
}
export const fetchMovies = async ({query}:props)=>{
    const endPoint =
        query? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
    const response = await fetch(endPoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers
    })
    if(!response.ok){
        // @ts-ignore
        throw new Error("Failed to Fetch the movies",response.statusText)
    }
    const data = await response.json();
    return data.results;
}
