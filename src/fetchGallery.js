import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const params = new URLSearchParams({
  key: '30372139-17e231f0453b63e760e856e5b',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export const fetchGallery = async query => {
  const response = await axios.get(`${API_URL}?${params}&q=${query}`);
  const data = await response.data;
  console.log('this is response >>', response);
  console.log('this is data >>', data);
  console.log(query);

  return data;
};
