import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type Artwork from '../types/artwork';

interface Props{
        artworks:Artwork[];
        totalRecords:number;
        rows:number;
        loading:boolean;
        onPageChange: (page:number)=>void;
    }
export default function ArtworkTable({

    artworks, 
    totalRecords, 
    rows, 
    loading, 
    onPageChange
}:Props) {
     return (
       <DataTable value={artworks} paginator lazy rows ={rows} totalRecords={totalRecords} loading={loading} onPage={(x) => onPageChange(x.page + 1)} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions" body={(row) => row.inscriptions || "N/A"}></Column>
                <Column field="date_start" header="Start Date"></Column>
                <Column field="date_end" header="End Date"></Column>
            </DataTable>
    );
}
        