const BASE_URL = 'https://pixabay.com/api/';

import {currentPage, perPage} from './index'


export function getData(searchQuery) {
  return fetch(getRequestUrl(searchQuery))
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText || response.status)
      }
        return response.json();
    })
};

export function getRequestUrl(searchQuery) {
    const params = {
        key: '37132018-4dabe95031a531ae3f58f9204',
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: currentPage,
        per_page: perPage
    }
const queryString = new URLSearchParams(params).toString();
    return `${BASE_URL}?${queryString}`;  
}