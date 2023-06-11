import { getData } from "./fetch-api";
import Notiflix from 'notiflix';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
export let currentPage = 1;
export const perPage = 40;
let currentSearchQuery = '';
let totalHits = 0;

function loadHeadLines(searchQuery) {
currentSearchQuery = searchQuery;
   
    return getData(searchQuery)
        .then(data => {
            if (data.hits && data.hits.length > 0) {
                totalHits = data.totalHits;
                if (data.totalHits <= currentPage * perPage) {
                    hideLoadMoreButton();
                } else {
                    showLoadMoreButton();
                }
                return data.hits;
            }
        });
}

function renderHeadLine({webformatURL,tags,likes,views,comments,downloads}) {
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
    return template;
};

function renderHeadLinesList(headlines) {
    if (currentPage === 1) {
        galleryEl.innerHTML = '';
    }
    const renderedHTML = headlines
        .map(headline => renderHeadLine(headline))
        .join("");
    galleryEl.insertAdjacentHTML("beforeend", renderedHTML);
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
      Notiflix.Notify.failure( '<p>Sorry, there are no images matching your search query. Please try again.</p>');
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
        Notiflix.Notify.failure( 'We\'re sorry, but you\'ve reached the end of search results.');
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