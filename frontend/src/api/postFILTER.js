import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';

const createAuthString = (password) => {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
};

const postFILTER = async (input) => {
  const password = process.env.REACT_APP_VALANTIS_PASS;
  const url = 'http://api.valantis.store:40000/';
  const authString = createAuthString(password);

  const data = {
    action: 'filter',
    params: { product: input, offset: 0, limit: 50 }
  };

  // Включение механизма повтора 5 раз
  axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    console.log('123456789', response.data);
    return response.data;
  } catch (error) {
    console.log('postFILTER: 500');

    return postFILTER(input);
  }
};

export default postFILTER;
