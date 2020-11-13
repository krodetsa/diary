import React, { useState } from 'react';
import { useHistory,Redirect } from "react-router-dom";
import { IonContent,IonInput,IonApp,IonLoading, IonAlert, IonButton, IonText, IonGrid, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonModal} from '@ionic/react';
import '../theme/login.css';
import axios from 'axios';
import i18next from "i18next";
import sendPost from '../axios.js';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

function Login(props) {
  let history = useHistory();
  const [showAlert1, setShowAlert1] = useState(false);
  const [token, setToken] = useState('');
  const [showAlert2, setShowAlert2] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  function push() {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            localStorage.setItem("token", token.value);
            setToken(token.value)
            sendPost({
                aksi: "setToken",
                token: token.value
            })
            .then(res => {
            });
            localStorage.setItem("token", token.value);
          }
        );
        // Some issue with your setup and push will not work
        PushNotifications.addListener('registrationError',
          (error: any) => {
            console.log('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            let notif;
            notif.push({ id: notification.id, title: notification.title, body: notification.body })
            alert(notif)
          }
        );
  }
  var loginInput = '';
  var passwordInput = '';
  var activationprelogin = "";
  var restoreEmail = "";
  var activationprepassword = "";
  var activationLogin = '';
  var activationPassword = "";
  var activationPasswordRepeat = "";
  var activationEmail = '';
  var activationName = "";
  function activate() {
      if( activationprelogin != "" &&
          activationprepassword != "" &&
          activationLogin != '' &&
          activationPassword != "" &&
          activationPasswordRepeat != "" &&
          activationEmail != '' &&
          activationName != ""
        ){
          /*проверка пароля*/
          let check = /^(?=.*[0-9])(?=\S+$).{5,}$/;
          if (check.test(activationPassword)) {
            // корректная проверка регуляркой
            if(activationPassword === activationPasswordRepeat) {
              setShowLoading(true);
              axios({
                method: 'post',
                // url: 'https://smektep.ficom-it.info/api/request.php',
                url: 'https://api.thelog.online/api/request.php',
                data: {
                  aksi: "inituser",
                  pre_login: activationprelogin,
                  pre_password: activationprepassword,
                  login : activationLogin,
                  password : activationPassword,
                  email : activationEmail,
                  name : activationName
                }
              })
              .then(res => {
                if (res.data.status === 0) {
                  alert(i18next.t("Check email"));
                  activationprelogin = "";
                  activationprepassword = "";
                  activationLogin = '';
                  activationPassword = "";
                  activationPasswordRepeat = "";
                  activationEmail = '';
                  activationName = "";
                  setShowRegistration(true);
                } else if (res.data.status === 1) {
                  alert(i18next.t(res.data.error.replace(/\./g, '')));
                }
                setShowLoading(false)
              })

            } else {
              alert(i18next.t('Проверьте правильность ввода нового пароля'));
            }
          } else {
            //несоответствие regexp
            alert(i18next.t('Пароль должен содержать не менее 6 символов латинского алфавита и цифры'));
          }
      } else {
          alert(i18next.t('Пожалуйста, заполните все поля'));
      }

    };
    var login = () => {
      try {
      if (loginInput !== '' && passwordInput !== ''){
        setShowLoading(true);
        axios({
          method: 'post',
          // url: 'https://smektep.ficom-it.info/api/request.php',
          url: 'https://api.thelog.online/api/request.php',
          data: {
            aksi: "login",
            login: loginInput,
            password: passwordInput
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.status === 0) {
            push();
            localStorage.setItem("key", res.data.data.session);
            props.showAuth(true, res.data.data.id, res.data.data.type, res.data.data.name, res.data.data.session);
          } else if (res.data.status === 1){
            props.showAuth(false);
            alert(i18next.t(res.data.message).replace(/\./g, ''));
          }
          setShowLoading(!showLoading);
          history.push("/tab1");
        }
      ).then(() => {
          // history.push("/tab1");
        })
      } else {
        /*Пустое поле логина/пароля*/
        setShowAlert2(!showAlert2);
      }
    } catch(e) {
      console.log(e)
    }
    };
    function restore(){
      if(restoreEmail !== "") {
        setShowLoading(true);
        axios({
          method: 'post',
          // url: 'https://smektep.ficom-it.info/api/request.php',
          url: 'https://api.thelog.online/api/request.php',
          data: {
            aksi: "restorePassword",
            email : restoreEmail
          }
        })
        .then(res => {
          if (res.data.status === 0) {
            restoreEmail = "";
            setShowLoading(false);
            alert(i18next.t("Check email2"));
          } else {
            setShowLoading(false);
            alert(i18next.t("Ошибка"));
          }

        })
      }
    }
    return (
      <IonApp>
      {props.auth !== false && <Redirect to="/tab1" />}
      <IonPage>
        <IonContent>
        <IonGrid className={'login-page'}>
          <IonGrid className={'login-image'}/>
          <IonText>
            <h5 className={'login-title'}>{i18next.t('Введите логин и пароль')}</h5>
          </IonText>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Логин')}</IonLabel>
            <IonInput value={loginInput} onIonChange={ev =>
                  loginInput = (ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Пароль')}</IonLabel>
            <IonInput type='password' value={passwordInput} onIonChange={ev =>
                  passwordInput = (ev.target as any).value
                }></IonInput>
          </IonItem>

          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { login() }}>{i18next.t('Далее')}</IonButton>
          </IonGrid>
          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button nomrgn-top'} onClick={() => { setShowRegistration(!showRegistration) }}>{i18next.t('Активация_аккаунта')}</IonButton>
          </IonGrid>
          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button nomrgn-top'} onClick={() => { setShowRestore(!showRestore)}}>{i18next.t('Восстановление пароля')}</IonButton>
          </IonGrid>


          <IonText>
            <p className={'login-description'}>{i18next.t('Нажимая кнопку Далее вы принимаете условия Соглашения и Политику конфиденциальности')}</p>
          </IonText>
        </IonGrid>
        </IonContent>
        <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(!showAlert1)}
            header={i18next.t('Ошибка')}
            message={i18next.t('Неверный логин или пароль')}
            buttons={['OK']}
          />
        <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(!showAlert2)}
            header={i18next.t('Ошибка')}
            message={i18next.t('Введите логин и пароль')}
            buttons={['OK']}
          />
          <IonModal isOpen={showRestore}>
          <IonLoading
              isOpen={showLoading}
              message={i18next.t('Пожалуйста_подождите')}
            />
            <IonHeader>
              <IonToolbar>
                <IonTitle>{i18next.t('Восстановление пароля')}</IonTitle>
                <IonButtons slot="end">
                  <IonButton fill="clear" onClick={() => { setShowRestore(!showRestore) }}>{i18next.t('Закрыть')}</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <div className={'centered'}>
                <IonText className={'register-text'}>
                  <p>{i18next.t('Для восстановления')}</p>
                </IonText>
                <IonItem>
                  <IonLabel position="floating">{i18next.t('введите E-mail')}</IonLabel>
                  <IonInput  value={restoreEmail} onIonChange={ev =>
                        restoreEmail = (ev.target as any).value
                      }>
                  </IonInput>
                </IonItem>
                <IonGrid className={'login-button-container full-width'}>
                  <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { restore() }}>{i18next.t('Далее')}</IonButton>
                </IonGrid>
              </div>
            </IonContent>
          </IonModal>

          <IonModal isOpen={showRegistration}>
          <IonLoading
              isOpen={showLoading}
              message={i18next.t('Пожалуйста_подождите')}
            />
            <IonHeader>
              <IonToolbar>
                <IonTitle>{i18next.t('Активация_аккаунта')}</IonTitle>
                <IonButtons slot="end">
                  <IonButton fill="clear" onClick={()=> setShowRegistration(!showRegistration)}>{i18next.t('Закрыть')}</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className={'register-container'}>
            <div className={'centered'}>
              <IonText className={'register-text'}>
                <p>{i18next.t('registration_info')}</p>
              </IonText>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Полученный_логин')}</IonLabel>
                <IonInput value={activationprelogin} onIonChange={ev =>
                      activationprelogin = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Полученный_пароль')}</IonLabel>
                <IonInput value={activationprepassword} onIonChange={ev =>
                      activationprepassword = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonText className={'register-text'}>
                <p>{i18next.t('registration_info2')}</p>
              </IonText>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Новый_логин')}</IonLabel>
                <IonInput value={activationLogin} onIonChange={ev =>
                      activationLogin = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Новый пароль')}</IonLabel>
                <IonInput value={activationPassword} onIonChange={ev =>
                      activationPassword = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Повторите новый пароль')}</IonLabel>
                <IonInput value={activationPasswordRepeat} onIonChange={ev =>
                      activationPasswordRepeat = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Имя')}</IonLabel>
                <IonInput value={activationName} onIonChange={ev =>
                      activationName = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('e-mail')}</IonLabel>
                <IonInput value={activationEmail} onIonChange={ev =>
                      activationEmail = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonText className={'register-text'}>
                <p>{i18next.t('Убедитесь_в_почте')}</p>
              </IonText>
              <IonGrid className={'login-button-container full-width'}>
                <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { activate() }}>{i18next.t('Далее')}</IonButton>
              </IonGrid>
            </div>

            </IonContent>
        </IonModal>
      </IonPage>
      </IonApp>
    );


};

export default Login;
