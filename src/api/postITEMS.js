import axios from 'axios';
import createAuthString from './createAuthString';

let countConnect = 0;

const postITEMS = async (ids) => {
  if (countConnect === 5) {
    return [];
  }

  console.log('countConnect postITEMS: ', countConnect);
  const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  const url = 'http://api.valantis.store:40000/'; // URL API
  const authString = createAuthString(password); // Строка авторизации

  const data = {
    action: 'get_items',
    params: { ids: [...ids] }
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    return response.data;
  } catch (error) {
    console.log('countConnect postITEMS: ', countConnect);
    console.log('error postITEMS: ', error);
    countConnect += 1;
    return postITEMS(ids);
  }
};

export default postITEMS;
