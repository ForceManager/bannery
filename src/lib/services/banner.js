import axios from 'axios';

export function getBanner(url) {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw new Error('No valid banner data found.');
    });
}
