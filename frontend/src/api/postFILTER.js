import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';

const createAuthString = (password) => {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
};

const postFILTER = async (input, inputKey) => {
  const password = process.env.REACT_APP_VALANTIS_PASS;
  const url = 'http://api.valantis.store:40000/';
  const authString = createAuthString(password);
  // console.log('!!!input', input);
  console.log('!!!inputKey', inputKey, input);
  const data = {
    action: 'filter',
    params: { [inputKey]: input }
  };

  axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });
    console.log('response!!!', response.data);
    return response.data;
  } catch (error) {
    console.log('postFILTER: 500');

    return postFILTER(input);
  }
};

export default postFILTER;
