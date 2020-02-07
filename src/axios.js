import axios from 'axios';

const uuidv4 = require('uuid/v4');
const moment = require('moment');
var apiVersion = "1.0";
var now = moment().unix();
const url = 'https://www.log.school/web/controllers/data.php';
var sendPost = (data = {}) => {
  var body = {
    info: {
    "apiVersion" : apiVersion,
    "uuid" : uuidv4(),
    "timestamp" : now.toString(),
    "key" : localStorage.getItem("key"),
    },
    ...data };
  return axios.post(url, body);
}
// axios.interceptors.request.use(request => {
//        console.log(request);
//        return request;
//    }, error => {
//        console.log(error);
//        return Promise.reject(error);
//    });

// axios.interceptors.response.use(function (response) {
//    // Any status code that lie within the range of 2xx cause this function to trigger
//    // Do something with response data
//    return response;
//  }, function (error) {
//    // Any status codes that falls outside the range of 2xx cause this function to trigger
//    // Do something with response error
//    return Promise.reject(error);
//  });

export default sendPost
