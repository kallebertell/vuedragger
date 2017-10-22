import axios from 'axios';
import apiConfig from './apiConfig';

export default function (detectionId) {
  return axios
    .get(`${apiConfig.baseUrl}detections/${detectionId}/accountGroups?_embed=accounts`)
    .then(response => response.data);
}
