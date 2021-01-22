import axios from 'axios';

export function getBanner(url) {
  return axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error('No valid banner data found.');
    });
}
