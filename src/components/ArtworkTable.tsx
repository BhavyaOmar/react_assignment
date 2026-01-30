import { DataTable } from "primereact/datatable";
import type { DataTablePageEvent, DataTableSelectionMultipleChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type Artwork from "../types/artwork";

/**
 * Props for the ArtworkTable component
 */
interface Props {
  artworks: Artwork[];
  page: number;
  rows: number;
  totalRecords: number;
  loading: boolean;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onPageChange: (page: number) => void;
  onOpenOverlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * ArtworkTable component displays a paginated, selectable table of artworks
 * with lazy loading support
 */
export default function ArtworkTable({
  artworks,
  page,
  rows,
  totalRecords,
  loading,
  selectedIds,
  onSelectionChange,
  onPageChange,
  onOpenOverlay,
}: Props) {
  /**
   * Custom header for the selection column with a dropdown button
   */
  const header = (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    }}
  >
    <span /> {/* empty placeholder for checkbox alignment */}
    <Button
      label="v"
      size="small"
      onClick={onOpenOverlay}
      style={{backgroundColor:"white", color:"gray", border:"none", fontSize:"20px"}}
    />
  </div>
);

  /**
   * Calculate pagination range for the footer display
   * Shows "Showing X to Y of Z entries"
   */
  const first = (page - 1) * rows + 1;
  const last = Math.min(page * rows, totalRecords);

  /**
   * Filter artworks to get only the selected ones based on selectedIds
   * This is necessary because PrimeReact DataTable expects the full objects
   */
  const selectedArtworks = artworks.filter((artwork) =>
    selectedIds.includes(artwork.id)
  );

  /**
   * Handle selection changes from the DataTable
   * Extracts IDs from selected artwork objects and passes them to parent
   */
  const handleSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
    const ids = e.value.map((artwork) => artwork.id);
    onSelectionChange(ids);
  };

  /**
   * Handle page changes from the DataTable
   * Converts 0-based page index to 1-based for parent component
   */
  const handlePageChange = (e: DataTablePageEvent) => {
    onPageChange((e.page ?? 0) + 1);
  };

  /**
   * Render inscriptions column with fallback for empty values
   */
  const inscriptionsBodyTemplate = (artwork: Artwork) => {
    return artwork.inscriptions || "N/A";
  };

  return (
    <DataTable<Artwork[]>
      value={artworks}
      dataKey="id"
      // Pagination settings
      paginator
      lazy // Enables server-side pagination
      rows={rows}
      first={(page - 1) * rows} // Convert 1-based page to 0-based index
      totalRecords={totalRecords}
      // Loading state
      loading={loading}
      // Selection handling
      selection={selectedArtworks}
      onSelectionChange={handleSelectionChange}
      // Page change handling
      onPage={handlePageChange}
      // Footer showing current range
      footer={
        <span>
          Showing {first} to {last} of {totalRecords} entries
        </span>
      }
      showGridlines
    >
      {/* Selection column with custom header */}
      <Column
        selectionMode="multiple"
        header={header}
        headerStyle={{ width: "4rem" }}
      />
      {/* Data columns */}
      <Column field="title" header="Title" />
      <Column field="artist_display" header="Artist" />
      <Column field="place_of_origin" header="Origin" />
      <Column
        field="inscriptions"
        header="Inscriptions"
        body={inscriptionsBodyTemplate}
      />
      <Column field="date_start" header="Start Date" />
      <Column field="date_end" header="End Date" />
    </DataTable>
  );
}