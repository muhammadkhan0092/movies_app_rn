import {Client, Databases, ID, Query} from "react-native-appwrite";
import {data} from "browserslist";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const APPWRITE_EP = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const client = new Client()
    .setEndpoint(APPWRITE_EP)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);
export const updateSearchCount = async (query: string,movies:Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,
            [Query.equal('searchTerm',query)]
        )
        if(result.documents.length > 0) {
            console.log(`Found ${result.documents.length} documents adding count`)
            const existingMovie = result.documents[0];
            await database.updateDocument(DATABASE_ID,COLLECTION_ID,existingMovie.$id,
                {
                    count: existingMovie.count+1,
                }
            )
        }
        else
        {
            console.log(`Found ${result.documents.length} documents making 1`)
            await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
                count:1,
                searchTerm:query,
                poster_url:`https://image/tmdb.org/t/p/w500${movies.poster_path}`,
                title:`${movies.title}`,
            })
        }
    }
    catch (error) {
        console.log("err is ",error);
        throw error;
    }
}