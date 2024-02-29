import axios from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'js-md5';

function createAuthString(password) {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
}

const getITEMS = async (ids) => {
  const password = 'Valantis'; // Пароль для доступа к API
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
    console.log('getITEMS: 500');

    // Повторный запрос в случае любых ошибок
    console.log('Retrying request...');
    return getITEMS(ids);
  }
};

export default getITEMS;
