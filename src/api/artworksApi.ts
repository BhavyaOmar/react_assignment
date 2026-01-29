export async function fetchArtworks(pages:number, rows:number) {
    const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${pages}&limit=${rows}`
    );

    const result = await response.json();
    return result;
}