import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';

const createAuthString = (password) => {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
};

const url = 'http://api.valantis.store:40000/';
const password = process.env.REACT_APP_VALANTIS_PASS;
const authString = createAuthString(password);

const postIDS = async (restFunc, params) => {
  const data = {};
  if (restFunc === 'get_ids') {
    // {...data, action: 'get_ids', params };
    data.action = 'get_ids';
    data.params = params;
  }
  if (restFunc === 'get_items') {
    data.action = 'get_id';
    data.params = params;
  }

  // Включение механизма повтора 5 раз
  axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.log('postIDS: 500'); // потом возвращать всю ошибку, сейчас так что бы логи не засорять

    // console.log('Retrying request IDS...');

    return postIDS(params);
  }
};

export default postIDS;
