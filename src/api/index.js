// import axios from 'axios';

// const http = axios.create({
// baseURL: process.env.VUE_APP_API_BASE_URL, // указывать не стал т.к. это фейковое апи
// });

/**
 * @param {function} cb
 * @returns {Promise<AxiosResponse<any>>}
 */
// в реальности было бы что-то в это духе
// const postCryptoOperation = (payload) => http.post('/url', payload);
// но так как у нас заглушка
const postCryptoOperation = (cb) => new Promise((resolve) => {
  setTimeout(() => resolve(cb()), 1000);
});

export default postCryptoOperation;
