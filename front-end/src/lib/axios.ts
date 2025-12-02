import axios from 'axios';

export const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/api',
        withCredentials: true,
        headers: {
                'Content-Type': 'application/json',
        }
    });

export default axiosInstance;



// export const axios = {
//     get: () => {
//         return {
//             data: [],
//             status: 200,
//             statusText: 'OK',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//             },
//             config: {
//                 method: 'get',
//                 url: '/api/v1/users',
//                 data: {},
//                 headers: {},
//                 baseURL: 'http://localhost:3000/api/v1/',
//                 transformRequest: [function (data, headers) {
//                     return data;
//                 }],
//                 transformResponse: [function (data) {
//                     return data;
//                 }],
//                 timeout: 0,
//                 xsrfCookieName: 'XSRF-TOKEN',
//                 xsrfHeaderName: 'X-XSRF-TOKEN',
//                 maxContentLength: -1,
//                 maxBodyLength: -1,
//                 validateStatus: function (status) { return status >= 200 && status < 300; },
//                 params: {
//                     page: 1,
//                     limit: 10,
//                     sort: 'createdAt',
//                     order: 'DESC',
//                     search: '',
//                     populate: '',
//                     select: '',
//                     exclude: '',
//                     offset: 0,
//                     cache: true,
//                     ttl: 60000,
//                     paginate: true,
//                     lean: false,
//                     maxLimit: 50,
//                     allowCount: true
//                 },
//             },
//         }
//     },
//     post: () => {},
//     put: () => {},
// }