import { useState } from "react";
import ArtworkTable from "./components/ArtworkTable";
import { useArtworks } from './hooks/useArtworks';

export default function App() { 
  
  // PrimeReact pages are 1-based in our app
  const [page, setPage] = useState(1);

  // fixed rows per assignment requirement
  const rows = 12;

  // data hook
  const { artworks, totalRecords, loading } = useArtworks(page, rows);

  // checkbox selections stored page-wise
  const [selectedByPage, setSelectedByPage] = useState<
    Record<number, number[]>
  >({});

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Artworks</h2>

      <ArtworkTable
        artworks={artworks}
        totalRecords={totalRecords}
        rows={rows}
        loading={loading}
        onPageChange={setPage}
        page={page}
        selectedByPage={selectedByPage}
        setSelectedByPage={setSelectedByPage}
      />
    </div>
  )
}
