import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';
// import process from 'process';
// require('dotenv').config();

function createAuthString(password) {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
}

const postITEMS = async (ids) => {
  // нужно взять промежуток
  const password = process.env.REACT_APP_VALANTIS_PASS || 'Valantis';
  const url = 'http://api.valantis.store:40000/'; // URL API
  const authString = createAuthString(password); // Строка авторизации

  const data = {
    action: 'get_items',
    params: { ids: [...ids] }
  };

  // Используйте axiosRetry для автоматической попытки повторного запроса при ошибке
  axiosRetry(axios, { retries: 5 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Auth': authString
      }
    });

    // Возвращение данных в случае успешного ответа
    return response.data;
  } catch (error) {
    // Дополнительная логика обработки ошибок, если необходимо
    // console.log('postITEMS: 500');

    // Повторный запрос в случае любых ошибок
    // console.log('Retrying request ITEMS...');
    return postITEMS(ids);
  }
};

export default postITEMS;