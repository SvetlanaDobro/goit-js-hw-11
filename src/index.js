// https://pixabay.com/api/?key=37132018-4dabe95031a531ae3f58f9204&q=yellow+flowers&image_type=photo

// https://pixabay.com/api/?key=37132018-4dabe95031a531ae3f58f9204&q=dog+cat&image_type=photo

// API:37132018-4dabe95031a531ae3f58f9204

 const BASE_URL = 'https://pixabay.com/api/';
 

const formEl = document.getElementById('search-form');

function getRequestUrl(searchQuery) {
    const params = {
        key: '37132018-4dabe95031a531ae3f58f9204',
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    }
const queryString = new URLSearchParams(params).toString();
    return `${BASE_URL}?${queryString}`;  
}

function loadHeadLines(searchQuery) {
    return fetch(getRequestUrl(searchQuery))
        .then(responce => responce.json())
        .then(headlines => console.log(headlines));
}

function renderHeadLines(headlines) {
    console.log(headlines);
}

function onFormSubmit(event) {
    event.preventDefault();
    console.dir(this);
    const searchInput = this.searchQuery;  
    const searchQuery = searchInput.value;
    console.log('input', searchQuery);

    loadHeadLines(searchQuery)
        .then(headlines => renderHeadLines(headlines));

}

formEl.addEventListener('submit', onFormSubmit);