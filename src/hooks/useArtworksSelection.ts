import { useState } from "react";

export function useArtworkSelection(){

    const [selectedByPage, setSelectedByPage] = useState<Record<number,number[]>
    >([]);

    function updateSelection(page:number, ids:number[]){

        setSelectedByPage((id_list)=>{
            if(ids.length ===0){

                const id_list_copy = {...id_list};
                delete id_list_copy[page];
                return id_list_copy;
            }
            return{
                ...id_list,
                [page]:ids
            }

        });
    }

    function selectTopN(page:number, ids:number[]){
        updateSelection(page,ids);
    }

    function getSelectionsForPage(page:number){
        return selectedByPage[page] || [];
    }

    return {
        selectedByPage,
        getSelectionsForPage,
        updateSelection,
        selectTopN,
    }
}