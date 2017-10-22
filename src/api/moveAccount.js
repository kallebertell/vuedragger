import axios from 'axios';
import apiConfig from './apiConfig';
import idRegistry from './idRegistry';

export default function (accountId, toAccountGroupId) {
  return axios.patch(
    `${apiConfig.baseUrl}accounts/${accountId}`,
    {
      id: accountId,
      accountGroupId: idRegistry.resolve(toAccountGroupId),
    },
  ).then(response => response.data);
}
