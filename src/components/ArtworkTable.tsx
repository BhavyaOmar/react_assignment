import { DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import type Artwork from '../types/artwork';

interface Props{
        artworks:Artwork[];
        totalRecords:number;
        rows:number;
        loading:boolean;
        page:number;
        onPageChange: (page:number)=>void;
        selectedByPage: Record<number, number[]>;
        setSelectedByPage: React.Dispatch<React.SetStateAction<Record<number, number[]>>
        >;
    }
export default function ArtworkTable({

    artworks, 
    totalRecords, 
    rows, 
    loading, 
    page,
    onPageChange, 
    selectedByPage,
    setSelectedByPage
}:Props) {

 
    const currentSelections = selectedByPage[page] || []; // Get the selections from the current page but if none, return empty array
    
     function onSelectionChange(e: any) {
    const selectedRows = e.value as Artwork[];
    const ids = selectedRows.map((art) => art.id);

    setSelectedByPage((prev) => {
      // if nothing selected → delete page key
      if (ids.length === 0) {
        const { [page]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [page]: ids,
      };
    });
  }

  function onPage(e: any) {
    // PrimeReact pages are 0-based
    onPageChange(e.page + 1);
  }
    return (
       <DataTable 
       value={artworks} 
       dataKey="id"
       paginator 
       lazy 
       rows ={rows} 
       totalRecords={totalRecords} 
       loading={loading} 
       selectionMode="checkbox"
       selection={artworks.filter((art) =>
        currentSelections.includes(art.id)
      )}
      onSelectionChange={onSelectionChange}
      onPage={onPage}
      showGridlines 
       tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions" body={(row) => row.inscriptions || "N/A"}></Column>
                <Column field="date_start" header="Start Date"></Column>
                <Column field="date_end" header="End Date"></Column>
            </DataTable>
    );
}
        