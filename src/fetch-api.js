import axios from 'axios';
import { currentPage, perPage } from './index';

axios.defaults.baseURL = 'https://pixabay.com/api/'

export async function getData(searchQuery) {
  const response = await axios.get(getRequestUrl(searchQuery));
  if (response.status !== 200) {
     throw new Error(response.statusText || response.status);
  }
    return response.data;
}

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
    return `?${queryString}`;  
}

