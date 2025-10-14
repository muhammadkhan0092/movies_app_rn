import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction:()=>Promise<T>,autoFetch = true)=>{
    const [data,setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error|null>(null);

    const fetchData = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        }
        catch (err){
            console.log(err);
            setError(err instanceof  Error? err : new Error("An Error Occured"));
        }
        finally {
            setLoading(false);
        }
    }

    const reset = ()=>{
        setData(null);
        setLoading(false);

        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []); // 👈 important

    return {data,loading,error,refetchData:fetchData,reset};
}

export default useFetch;