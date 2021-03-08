import axios from 'axios';

export function getBanner(url, key) {
  return axios
    .get(url, {
      params: {
        key,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw new Error('No valid banner data found.');
    });
}
