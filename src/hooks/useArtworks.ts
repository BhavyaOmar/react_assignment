import { useEffect, useState } from "react";
import { fetchArtworks } from "../api/artworksApi";
import type Artwork from "../types/artwork";

export function useArtworks(page: number ,rows:number){
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        let cancelled = false;

        async function load(){
            setLoading(true);
            const result = await fetchArtworks(page, rows);

            if(!cancelled){
                setArtworks(result.data);
            setTotalRecords(result.pagination.total);

            setLoading(false);
            }
        }

        load();

        return ()=>{
        cancelled = true;
    };
    }, [page,rows]);

    return{
    artworks,
    totalRecords,
    loading
    }
}