import axios from 'axios';
import axiosRetry from 'axios-retry';
import createAuthString from './func/createAuthString';

const postITEMS = async (ids) => {
  const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  const url = process.env.REACT_APP_API_URL;
  const authString = createAuthString(password);

  const data = {
    action: 'get_items',
    params: { ids: [...ids] }
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
    console.log('postITEMS: ', error);

    return postITEMS(ids);
  }
};

export default postITEMS;
