import axios from 'axios';
import md5 from 'js-md5';

// Функция для создания строки авторизации
function createAuthString(password) {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
  return md5(`${password}_${timestamp}`);
}

// Функция для отправки запроса
const getITEMS = async (ids) => {
  const password = 'Valantis'; // Пароль для доступа к API
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
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getITEMS;
