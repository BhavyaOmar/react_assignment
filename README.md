# React Internship Assignment — Artwork Table

React + TypeScript application that fetches artwork data from the Art Institute of Chicago API, renders it in a PrimeReact DataTable with server-side pagination, and supports persistent row selection across pages without preloading data.

## Objective

Build a frontend that:

- Fetches artwork data from a public API.
- Implements server-side pagination.
- Allows row selection with persistence across pages.
- Provides a custom selection panel for selecting top $n$ rows on the current page.

## Core Features

- **PrimeReact DataTable** with checkbox selection.
- **Server-side pagination** (fetches only the current page).
- **Persistent selection** stored by IDs (no caching of full datasets).
- **Custom selection overlay** to select top $n$ rows on the current page.
- **TypeScript-first** codebase using Vite.

## Tech Stack

- React 19
- TypeScript
- Vite
- PrimeReact + PrimeFlex + PrimeIcons

## Data Source

- API: https://api.artic.edu/api/v1/artworks?page=1
- Fields rendered in the table:
  - `title`
  - `place_of_origin`
  - `artist_display`
  - `inscriptions`
  - `date_start`
  - `date_end`

## Project Setup

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or a compatible package manager)

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

### Server-Side Pagination

- Pagination events from the table trigger a new API request.
- The API is called with `page` and `limit` parameters.
- Only the current page is stored in memory.

### Persistent Selection Strategy

- The app stores **only selected IDs** per page.
- When you return to a page, selections are rehydrated using those IDs.
- No data from other pages is prefetched or stored.

### Custom Selection Overlay

- The selection header includes a dropdown button.
- You can input a number to select the top $n$ rows of the current page.

## Folder Structure

```
src/
  api/
    artworksApi.ts
  components/
    ArtworkTable.tsx
    SelectionOverlay.tsx
  hooks/
    useArtworks.ts
    useArtworksSelection.ts
    useSelectionOverlay.ts
  types/
    artwork.ts
  App.tsx
  main.tsx
```

## Key Files

- [src/api/artworksApi.ts](src/api/artworksApi.ts) — API client.
- [src/hooks/useArtworks.ts](src/hooks/useArtworks.ts) — Data fetching + pagination state.
- [src/hooks/useArtworksSelection.ts](src/hooks/useArtworksSelection.ts) — Selection persistence by page.
- [src/components/ArtworkTable.tsx](src/components/ArtworkTable.tsx) — DataTable + pagination UI.
- [src/components/SelectionOverlay.tsx](src/components/SelectionOverlay.tsx) — Custom selection panel.

## Notes

- This submission focuses on correctness, clean state management, and avoiding data preloading.
- PrimeReact styles are imported in [src/main.tsx](src/main.tsx).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Type-check and build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
