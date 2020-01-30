import axios from 'axios';

var apiVersion = "1.0"
var info =
    {
        "apiVersion" : apiVersion,
        "uuid" : "00000000-0000-0000-0000-000000000000",
        // "deviceId" : "kjhkjhjkh",
        "timestamp" : "1580330000",
        // "lang" : "ru/en/zh" => не обязательно
        "session" : localStorage.getItem("session") || ''
    };
const url = 'https://www.log.school/web/controllers/data.php';
const sendPost = (data = {}) => {
  var body = {...data, info: info };
  return axios.post(url, body);
}
export default sendPost
