import React from 'react';
import ReactDOM from 'react-dom';
import { Plugins } from '@capacitor/core'
import App from './App';
import './i18n';
import i18next from "i18next";
import {  initReactI18next, I18nextProvider } from 'react-i18next';
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
import * as serviceWorker from './serviceWorker';
// i18next.init({
//   lng: "kg"
// })
const i18n = i18next.use(initReactI18next);
// this.platform.registerBackButtonAction(() => {
//     appMinimize.minimize();
// });

//сворачиыаем приложение на стрелку в Android если история пролистана до конца
Plugins.App.addListener('backButton', function() {
  console.log(111);
  if (window.location.pathname == '/tab2'){
    Plugins.App.exitApp();
  }
});


ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
