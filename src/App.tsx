import { useState } from "react";
import ArtworkTable from "./components/ArtworkTable";
import SelectionOverlay from "./components/SelectionOverlay";

import { useArtworks } from "./hooks/useArtworks";
import { useArtworkSelection } from "./hooks/useArtworksSelection";
import { useSelectionOverlay } from "./hooks/useSelectionOverlay";

export default function App() {
  const [page, setPage] = useState(1);
  const rows = 12;

  // fetch artworks
  const { artworks, totalRecords, loading } = useArtworks(page, rows);

  // selection state (by page)
  const {
    getSelectionsForPage,
    updateSelection,
    selectTopN,
  } = useArtworkSelection();

  // overlay state
  const {
    overlayRef,
    count,
    setCount,
    open,
    close,
  } = useSelectionOverlay();

  function handleSelectTopN(n: number) {
    if (!n || n <= 0) return;

    // ONLY current page rows (important rule)
    const ids = artworks.slice(0, n).map((a) => a.id);
    selectTopN(page, ids);
    close();
  }

  return (
    <div style={{ padding: "1rem" }}>
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
