import { useState } from "react";

export function useArtworkSelection(){

    const [selectedByPage, setSelectedByPage] = useState<Record<number,number[]>
    >([]);

    function updateSelection(page:number, ids:number[]){

        setSelectedByPage((id_list)=>{

            // 0 Length means that all elements have been deselected or none selected, so we remove the existing key value pair of that particular page too
            if(ids.length ===0){

                const id_list_copy = {...id_list};
                delete id_list_copy[page];
                return id_list_copy;
            }

            // Otherwise, we update the id_list by adding page and ids there
            return{
                ...id_list,
                page:[ids]
            }

        });
    }

    function selectTopN(page:number, ids:number[]){
        updateSelection(page,ids);
    }

    function getSelectionsForPage(page:number){

        return selectedByPage[page] || []; // Get the selections from the current page but if none, return empty array
    }

    return {
        selectedByPage,
        getSelectionsForPage,
        updateSelection,
        selectTopN,
    }
}