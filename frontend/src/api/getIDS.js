/* eslint-disable no-undef */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';

const createAuthString = (password) => {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
};

const getIDS = async (params) => {
  // const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  const password = 'Valantis';
  const url = 'http://api.valantis.store:40000/';
  const authString = createAuthString(password);

  const data = {
    action: 'get_ids',
    params
  };

  // Включение механизма повтора 5 раз
  axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      withCredentials: true, // Добавляем эту опцию
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.log('getIDS: 500');

    console.log('Retrying request IDS...');

    return getIDS(params);
  }
};

export default getIDS;
