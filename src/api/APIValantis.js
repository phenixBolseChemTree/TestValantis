import axios from 'axios';
import createAuthString from './createAuthString';

// остается
const password = process.env.REACT_APP_VALANTIS_PASS;
const url = process.env.REACT_APP_API_URL;

let countConnect = 0;
const authString = createAuthString(password);

// method строка а data это параметры
const postFILTER = async (data) => {
  if (countConnect === 5) {
    return [];
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    console.log('response!!!', response.data);
    return response.data;
  } catch (error) {
    console.log('countConnect postFILTER: ', countConnect);
    console.log('error postFILTER: ', error);
    countConnect += 1;
    return postFILTER(input);
  }
};

export default postFILTER;
