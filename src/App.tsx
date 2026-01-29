import './App.css'

import ArtworkTable from "./components/ArtworkTable";
import { useArtworks } from './hooks/useArtworks';
function App() { 
  
  const rows = 12;
  const {
    artworks,
    totalRecords,
    setPage,
    loading
  } = useArtworks(rows);


  return (
    <div style={{ padding: "2rem" }}>
      <h2>Art Institute of Chicago – Artworks</h2>

      <ArtworkTable
        artworks={artworks}
        totalRecords={totalRecords}
        rows={rows}
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  )
}

export default App
