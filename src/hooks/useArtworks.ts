import { useEffect, useState } from "react";
import { fetchArtworks } from "../api/artworksApi";
import type Artwork from "../types/artwork";

export function useArtworks(rows:number){
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function loadArtworks(){
            setLoading(true);
            const result = await fetchArtworks(page, rows);

            setArtworks(result.data);
            setTotalRecords(result.pagination.total);

            setLoading(false);
        }

        loadArtworks();
    }, [page,rows]);

    return {
        artworks,
    totalRecords,
    page,
    setPage,
    loading
    }
}