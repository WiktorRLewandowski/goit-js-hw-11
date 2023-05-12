import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './fetchGallery';
import photos from './pexelsTest.json';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const loadBtn = document.querySelector('.load-more');
const galleryEl = document.getElementById('gallery');
let page = 1;

let lightbox;

searchForm.addEventListener('submit', submitHandler);
// searchInput.addEventListener('blur', submitHandler);
loadBtn.addEventListener('click', loadMore);

function submitHandler(e) {
  e.preventDefault();
  page = 1;
  const query = searchInput.value;
  galleryEl.innerHTML = '';

  if (!searchInput.value.trim()) {
    galleryEl.innerHTML = '';
    loadBtn.classList.add('is-hidden');
    return;
  }

  fetchGallery(query)
    .then(data => {
      if (data.total === 0) {
        loadBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(`Sorry, we couldn't find anything :(`);
        return;
      }

      loadBtn.classList.remove('is-hidden');
      Notiflix.Notify.success(`Hey, we found ${data.totalHits} images`);
      galleryCompleter(data);
      lightbox = new SimpleLightbox('.gallery a');

      if (data.total < 40) {
        loadBtn.classList.add('is-hidden');
      }
    })
    .catch(error => console.log(error));
}

function loadMore() {
  const query = searchInput.value;
  page++;
  const pageParam = `&page=${page}`;

  fetchGallery(`${query}${pageParam}`)
    .then(data => {
      if (data.totalHits < (page - 1) * 40) {
        loadBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      galleryCompleter(data);
      lightbox.refresh();
    })
    .catch(error => console.log(error));
}

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

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
