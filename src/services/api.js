const API_KEY = '26702272-2d7e64543fb5f8670261a42e5';
const BASE_URL = 'https://pixabay.com/api/';

const API = (imageName, page) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${imageName}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  });
};

export default API;
