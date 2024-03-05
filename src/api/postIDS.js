import axios from 'axios';
// import axiosRetry from 'axios-retry';
import createAuthString from './createAuthString';

let countConnect = 0;

const postIDS = async (params) => {
  if (countConnect === 5) {
    return [];
  }
  console.log('countConnect postIDS: ', countConnect);

  const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  const url = process.env.REACT_APP_API_URL;

  const authString = createAuthString(password);

  const data = {
    action: 'get_ids',
    params
  };

  // axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.log('postIDS: ', error);

    countConnect += 1;
    return postIDS(params);
  }
};

export default postIDS;
