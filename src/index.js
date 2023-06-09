const BASE_URL = 'https://pixabay.com/api/';
 
const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
const perPage = 40;
let currentSearchQuery = '';
let totalHits = 0;



function getRequestUrl(searchQuery) {
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

function loadHeadLines(searchQuery) {
    
    currentSearchQuery = searchQuery;
    
    return fetch(getRequestUrl(searchQuery))
        .then(responce => responce.json())
        .then(data => {
            if (data.hits && data.hits.length > 0) {
                totalHits = data.totalHits;
                if (data.totalHits <= currentPage * perPage) {
                     hideLoadMoreButton();
                } else {
                    showLoadMoreButton();
                }
                return data.hits;
            } else {
             hideLoadMoreButton();   
        throw new Error('No images found');
      }
        })
}

function renderHeadLine({webformatURL,tags,likes,views,comments,downloads}) {
    const cardEl = document.createElement('div');
    const template = `<div class="photo-card">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" /> 
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`;
    cardEl.innerHTML = template;
    galleryEl.append(cardEl);
};

function renderHeadLinesList(headlines) {
    if (currentPage === 1) {
        galleryEl.innerHTML = '';
    }
    headlines.forEach(headline => {
        renderHeadLine(headline);
    });
}

function onFormSubmit(event) {
    event.preventDefault();
    
    const searchInput = this.searchQuery;  
    const searchQuery = searchInput.value.trim();
    
    if (searchQuery === '') {
    return; 
  }
    currentPage = 1;

    loadHeadLines(searchQuery)
        .then(data => {
            
            renderHeadLinesList(data);
            toggleLoadMoreButton();
        })
        .catch(error => {
      console.error(error);
      galleryEl.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
    });
}

function loadMore() {
    currentPage++;

    loadHeadLines(currentSearchQuery)
        .then(headlines => {
            renderHeadLinesList(headlines);
            checkEndOfResults();
        });
}

function hideLoadMoreButton() {
    loadMoreBtn.style.display = 'none';
}

function showLoadMoreButton() {
loadMoreBtn.style.display = 'block';
}

function checkEndOfResults() {
    if (totalHits <= currentPage * perPage) {
        hideLoadMoreButton();
        galleryEl.insertAdjacentHTML('beforeend', '<p>We\'re sorry, but you\'ve reached the end of search results.</p>');
    }
}

function toggleLoadMoreButton() {
    if (totalHits <= currentPage * perPage) {
        hideLoadMoreButton();
    } else {
        showLoadMoreButton();
    }
}

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', loadMore);