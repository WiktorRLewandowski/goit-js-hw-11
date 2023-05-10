import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photos from './pexelsTest';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-submit');
const galleryEl = document.getElementById('gallery');

console.log(photos.hits);
function galleryCompleter(data) {
  data.forEach(data => {
    galleryEl.innerHTML += `
      <div class="photo-card"><a href="${data.largeImageURL}" class="gallery-link">
        <img src="${data.webformatURL}" class="gallery-image" alt="${data.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${data.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${data.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${data.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${data.downloads}
          </p>
        </div>
      </div>`;
  });
}

galleryCompleter(photos.hits);
Notiflix.Notify.success(`Yippie! ${photos.totalHits} hits found!`);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
