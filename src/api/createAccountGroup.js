import axios from 'axios';
import apiConfig from './apiConfig';
import idRegistry from './idRegistry';

export default function (detectionId, transientId) {
  if (idRegistry.isRegistered(transientId)) {
    return new Promise(resolve => resolve());
  }

  return axios.post(
    `${apiConfig.baseUrl}accountGroups`,
    {
      status: 'unconfirmed',
      detectionId,
    },
  ).then((response) => {
    const group = response.data;
    idRegistry.register(transientId, group.id);
    return group;
  });
}
