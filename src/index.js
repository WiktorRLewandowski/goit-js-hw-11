import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photos from './pexelsTest';
import { fetchGallery } from './fetchGallery';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-submit');
const galleryEl = document.getElementById('gallery');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value;
  if (!searchInput.value.trim()) {
    galleryEl.innerHTML = '';
  } else {
    galleryEl.innerHTML = '';
    fetchGallery(query)
      .then(data => {
        if (data.total === 0) {
          Notiflix.Notify.failure(`Sorry, we couldn't find anything :(`);
          return;
        }
        // lightbox.refresh();
        Notiflix.Notify.success(`We found ${data.totalHits} hits`);
        galleryCompleter(data);
      })
      .catch(error => console.log(error));
  }
});

function galleryCompleter(data) {
  const photo = data.hits;
  photo.forEach(photo => {
    galleryEl.innerHTML += `
      <div class="photo-card"><a href="${photo.largeImageURL}" class="gallery-link">
        <img src="${photo.webformatURL}" class="gallery-image" alt="${photo.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${photo.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${photo.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${photo.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${photo.downloads}
          </p>
        </div>
      </div>`;
  });
}
const lightbox = new SimpleLightbox('.gallery a');
