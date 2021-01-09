const baseUrl = 'https://pixabay.com/api/';
const APIkey = '19547883-c83eecf3fafc0cf8c7a25c2e3';

export function fetchImages(q, currentPage) {
  return fetch(
    `${baseUrl}?q=${q}&page=${currentPage}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(res => res.json())
    .then(data =>
      data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })),
    );
}
