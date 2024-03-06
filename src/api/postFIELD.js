// import axios from 'axios';
// import axiosRetry from 'axios-retry';
// import createAuthString from './createAuthString';

// const postFIELD = async (ids) => {
//   const password = process.env.REACT_APP_VALANTIS_PASS;
//   const url = process.env.REACT_APP_API_URL;

//   const authString = createAuthString(password);

//   const data = {
//     action: 'get_fields',
//     params: { field: 'brand', offset: 3, limit: 5 }
//   };

//   axiosRetry(axios, { retries: 5 });

//   try {
//     const response = await axios.post(url, data, {
//       headers: {
//         'X-Auth': authString
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log('postFIELD: ', error);
//     return postFIELD(ids);
//   }
// };

// export default postFIELD;
