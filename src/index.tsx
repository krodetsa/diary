import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios"


// import { defineCustomElements } from '@ionic/pwa-elements/loader'
import * as serviceWorker from './serviceWorker';

axios.interceptors.request.use(request => {
       console.log(request);

       return request;
   }, error => {
       console.log(error);
       return Promise.reject(error);
   });

// axios.interceptors.response.use(function (response) {
//    // Any status code that lie within the range of 2xx cause this function to trigger
//    // Do something with response data
//    return response;
//  }, function (error) {
//    // Any status codes that falls outside the range of 2xx cause this function to trigger
//    // Do something with response error
//    return Promise.reject(error);
//  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
