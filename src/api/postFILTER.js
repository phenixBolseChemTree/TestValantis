import axios from 'axios';
import axiosRetry from 'axios-retry';
import createAuthString from './createAuthString';

const postFILTER = async (input, inputKey) => {
  const password = process.env.REACT_APP_VALANTIS_PASS;
  const url = process.env.REACT_APP_API_URL;

  const authString = createAuthString(password);
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
