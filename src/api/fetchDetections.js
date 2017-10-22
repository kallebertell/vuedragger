import axios from 'axios';
import apiConfig from './apiConfig';

export default function () {
  return axios.get(`${apiConfig.baseUrl}detections/`).then(response => response.data);
}
