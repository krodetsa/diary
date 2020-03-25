import axios from 'axios';

const uuidv4 = require('uuid/v4');
const moment = require('moment');
var apiVersion = "1.0";
var appVersion = "1.6";
var now = moment().unix();
var d;
var startTime;
var responseTime = 0;
let errCatch = (response) => {

  if (response.status !== 200 ) {

    let data = JSON.parse(response.config.data);
    var xhr = new XMLHttpRequest();
    let json = JSON.stringify({
      aksi: "error",
      time: data.info.timestamp,
      type: data.aksi,
      status: response.status,
      data: data
    });
    xhr.open("POST", 'https://www.log.school/web/controllers/error.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(json);
  }
}
let sendStats = (response) => {
  d = new Date();
  if (responseTime == 0 ) {
    let data = JSON.parse(response.config.data);
    responseTime = d.getTime() - startTime;
    var xhr = new XMLHttpRequest();
    let json = JSON.stringify({
      aksi: "stats",
      time: responseTime,
      type: data.aksi
    });
    xhr.open("POST", 'https://www.log.school/web/controllers/data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(json);
    responseTime = 0;
 } else {
    responseTime = 0;
  }

}
const url = 'https://www.log.school/web/controllers/data.php';
var sendPost = (data = {}) => {
  var body = {
    info: {
    "apiVersion" : apiVersion,
    "appVersion" : appVersion,
    "uuid" : uuidv4(),
    "timestamp" : now.toString(),
    "key" : localStorage.getItem("key"),
    },
    ...data };
  return axios.post(url, body);
}

axios.interceptors.request.use(request => {
       d = new Date()
       startTime = d.getTime();
       return request;
   });
axios.interceptors.response.use(response => {
  sendStats(response);
  if (response.data.error == 7 || response.data.error == 99) {
    alert("Пожалуйста, выполните вход в аккаунт.")
    setTimeout(() => {
      localStorage.clear();
      window.location.href="/login";
    }, 2000);
  }
  return response;
}, function (error, response) {
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error
   errCatch(error.response);
   return Promise.reject(error);
 });
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
