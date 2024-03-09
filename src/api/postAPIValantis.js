import axios from 'axios';
import md5 from 'js-md5';

const createAuthString = (password) => {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// env keys
const password = process.env.REACT_APP_VALANTIS_PASS;
const url = process.env.REACT_APP_API_URL;

let countConnect = 0;
const authString = createAuthString(password);

const postAPIValantis = async (method, params) => {
  if (countConnect === 10) {
    throw new Error('Number of connection attempts exceeded');
  }

  const data = {
    action: method,
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
    console.log('error post${method}: ', error);
    countConnect += 1;
    await delay(1000);
    return postAPIValantis(method, params);
  }
};

export default postAPIValantis;
