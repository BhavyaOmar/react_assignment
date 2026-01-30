import { useState } from "react";
import ArtworkTable from "./components/ArtworkTable";
import SelectionOverlay from "./components/SelectionOverlay";

import { useArtworks } from "./hooks/useArtworks";
import { useArtworkSelection } from "./hooks/useArtworksSelection";
import { useSelectionOverlay } from "./hooks/useSelectionOverlay";

export default function App() {
  const [page, setPage] = useState(1);
  const rows = 12;

  const { artworks, totalRecords, loading } = useArtworks(page, rows);

  const {
    selectedByPage,
    getSelectionsForPage,
    updateSelection,
    selectTopN,
  } = useArtworkSelection();

  const {
    overlayRef,
    count,
    setCount,
    open,
    close,
  } = useSelectionOverlay();

  function handleSelectTopN(n: number) {
    if (!n || n <= 0) return;
    const ids = artworks.slice(0, n).map((a) => a.id);
    selectTopN(page, ids);
    close();
  }

  const totalSelected = Object.values(selectedByPage).reduce(
    (sum, ids) => sum + ids.length,
    0
  );

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "0.5rem", fontSize: "0.95rem" }}>
        <span style={{color:"gray"}}>Selected:</span> <span style={{color:"blue"}}>{totalSelected}</span> rows
      </div>
      <ArtworkTable
        artworks={artworks}
        page={page}
        rows={rows}
        totalRecords={totalRecords}
        loading={loading}
        selectedIds={getSelectionsForPage(page)}
        onSelectionChange={(ids) => updateSelection(page, ids)}
        onPageChange={setPage}
        onOpenOverlay={open}
      />

      <SelectionOverlay
        overlayRef={overlayRef}
        count={count}
        setCount={setCount}
        onConfirm={handleSelectTopN}
        onClose={close}
      />
    </div>
  );
}
