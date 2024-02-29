import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';

function createAuthString(password) {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
}

const getIDS = async (params) => {
  const password = 'Valantis';
  const url = 'http://api.valantis.store:40000/';
  const authString = createAuthString(password);

  const data = {
    action: 'get_ids',
    params
  };

  // Включение механизма повтора с максимальным количеством попыток 3
  axiosRetry(axios, { retries: 5 });

  try {
    // console.log('Попытка соединения');
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.error('getITEMS: ', error);
  }
};

export default getIDS;
