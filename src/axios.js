import axios from 'axios';

// const uuidv4 = require('uuid/v4');

// const url = 'https://smektep.ficom-it.info/api/request.php';
const url = 'https://api.thelog.online/api/request.php';
var sendPost = (data = {}) => {
  var body = {
    info: {
    // "apiVersion" : apiVersion,
    // "appVersion" : appVersion,
    // "uuid" : uuidv4(),
    // "timestamp" : now.toString(),
    "key" : localStorage.getItem("key"),
    },
    ...data };
  return axios.post(url, body);
}

axios.interceptors.response.use(response => {
  if (response.data.error == "No Session." || response.error == "No Session.") {
    alert("Пожалуйста, выполните повторный вход в аккаунт.")
    setTimeout(() => {
      localStorage.clear();
      window.location.href="/login";
    }, 2000);
  }
  return response;
}, function (error, response) {
   return Promise.reject(error);
 });
// axios.interceptors.request.use(request => {
//   console.log(request);
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
