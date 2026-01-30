import { DataTable } from "primereact/datatable";
import type { DataTablePageEvent, DataTableSelectionMultipleChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type Artwork from "../types/artwork";

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
  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span />
      <Button
        label="v"
        size="small"
        onClick={onOpenOverlay}
        style={{ backgroundColor: "white", color: "gray", border: "none", fontSize: "20px" }}
      />
    </div>
  );

  const first = (page - 1) * rows + 1;
  const last = Math.min(page * rows, totalRecords);

  const selectedArtworks = artworks.filter((artwork) =>
    selectedIds.includes(artwork.id)
  );

  const handleSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
    const ids = e.value.map((artwork) => artwork.id);
    onSelectionChange(ids);
  };

  const handlePageChange = (e: DataTablePageEvent) => {
    onPageChange((e.page ?? 0) + 1);
  };

  const inscriptionsBodyTemplate = (artwork: Artwork) => {
    return artwork.inscriptions || "N/A";
  };

  return (
    <DataTable<Artwork[]>
      value={artworks}
      dataKey="id"
      paginator
      lazy
      rows={rows}
      first={(page - 1) * rows}
      totalRecords={totalRecords}
      loading={loading}
      selectionMode="multiple"
      selection={selectedArtworks}
      onSelectionChange={handleSelectionChange}
      onPage={handlePageChange}
      footer={
        <span>
          Showing {first} to {last} of {totalRecords} entries
        </span>
      }
      showGridlines
    >
      <Column
        selectionMode="multiple"
        header={header}
        headerStyle={{ width: "4rem" }}
      />
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