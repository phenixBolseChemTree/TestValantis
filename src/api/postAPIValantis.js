import axios from 'axios';
import md5 from 'js-md5';

const createAuthString = (password) => {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
};

// env keys
const password = process.env.REACT_APP_VALANTIS_PASS;
const url = process.env.REACT_APP_API_URL;

let countConnect = 0;
const authString = createAuthString(password);

// method строка а data это параметры
const postAPIValantis = async (method, params) => {
  if (countConnect === 5) {
    return []; // нужно будет возвращать нихуя или ошибку
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
    // console.log('response!!!', response.data);
    return response.data;
  } catch (error) {
    console.log('error post${method}: ', error);
    countConnect += 1;
    return postAPIValantis(method, params);
  }
};

export default postAPIValantis;
