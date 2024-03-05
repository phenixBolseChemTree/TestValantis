import axios from 'axios';
import axiosRetry from 'axios-retry';
import createAuthString from './createAuthString';

const postIDS = async (params) => {
  const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  const url = process.env.REACT_APP_API_URL;

  const authString = createAuthString(password);

  const data = {
    action: 'get_ids',
    params
  };

  axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.log('postIDS: ', error);

    return postIDS(params);
  }
};

export default postIDS;
