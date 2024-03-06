import axios from 'axios';
import createAuthString from './createAuthString';

let countConnect = 0;

const postIDS = async (params) => {
  if (countConnect === 5) {
    return [];
  }

  const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  // const url = process.env.REACT_APP_API_URL;
  const url = 'http://api.valantis.store:40000/';

  const authString = createAuthString(password);

  const data = {
    action: 'get_ids',
    params
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.log('countConnect postIDS: ', countConnect);
    console.log('error postIDS: ', error);

    countConnect += 1;
    return postIDS(params);
  }
};

export default postIDS;
