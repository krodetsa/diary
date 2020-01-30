import axios from 'axios';
const uuidv4 = require('uuid/v4');
const moment = require('moment');
var apiVersion = "1.0";
var now = moment().unix();
var info =
    {
        "apiVersion" : apiVersion,
        "uuid" : uuidv4(),
        // "deviceId" : "kjhkjhjkh",
        "timestamp" : now.toString(),
        // "lang" : "ru/en/zh" => не обязательно
        "session" : localStorage.getItem("session") || ''
    };

const url = 'https://www.log.school/web/controllers/data.php';
const sendPost = (data = {}) => {
  var body = { info: info, ...data };
  return axios.post(url, body);
}
// axios.interceptors.request.use(request => {
//        console.log(request);
//
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
