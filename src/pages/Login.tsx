import React from 'react';
import { IonContent,IonInput,IonApp,IonLoading, IonAlert, IonButton, IonText, IonGrid, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonModal} from '@ionic/react';
import '../theme/login.css';
import axios from 'axios';
import i18next from "i18next";
import sendPost from '../axios.js';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;
interface IMyComponentProps {
  showAuth: any,
}
interface IMyComponentState {
    showAlert1: boolean,
    showAlert2: boolean,
    showRegistration: boolean,
    showLoading: boolean
};
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        showAlert1: false,
        showAlert2: false,
        showRegistration: false,
        showLoading: false
      };
    };
    push() {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        localStorage.setItem("token", token.value);
        sendPost({
            aksi: "setToken",
            user_id: localStorage.getItem('user_id'),
            token: token.value
        })
        .then(res => {console.log(res)})
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
    // window.location.href="/";
  }
    setShowAlert1 = () => {
      this.setState({ showAlert1: !this.state.showAlert1 });
    };
    setShowAlert2 = () => {
      this.setState({ showAlert2: !this.state.showAlert2 });
    }
    setShowRegistration = () => {
      this.setState({ showRegistration: !this.state.showRegistration });
    }
    setShowLoading = () => {
      this.setState({ showLoading: !this.state.showLoading });
    }
    loginInput = '';
    passwordInput = '';
    activationprelogin = "";
    activationprepassword = "";
    activationLogin = '';
    activationPassword = "";
    activationPasswordRepeat = "";
    activationEmail = '';
    activationName = "";
    activate() {
      if( this.activationprelogin != "" &&
          this.activationprepassword != "" &&
          this.activationLogin != '' &&
          this.activationPassword != "" &&
          this.activationPasswordRepeat != "" &&
          this.activationEmail != '' &&
          this.activationName != ""
        ){
          /*проверка пароля*/
          let check = /^(?=.*[0-9])(?=\S+$).{5,}$/;
          if (check.test(this.activationPassword)) {
            // корректная проверка регуляркой
            if(this.activationPassword === this.activationPasswordRepeat) {
              this.setShowLoading();
              sendPost({
                  aksi: "inituser",
                  pre_login: this.activationprelogin,
                  pre_password: this.activationprepassword,
                  login : this.activationLogin,
                  password : this.activationPassword,
                  email : this.activationEmail,
                  name : this.activationName
              })
              .then(res => {
                if (res.data.status === 0) {
                  alert(i18next.t("Check email"));
                  this.activationprelogin = "";
                  this.activationprepassword = "";
                  this.activationLogin = '';
                  this.activationPassword = "";
                  this.activationPasswordRepeat = "";
                  this.activationEmail = '';
                  this.activationName = "";
                  this.setShowRegistration();
                } else if (res.data.status === 1) {
                  alert(i18next.t(res.data.error.replace(/\./g, '')));
                }
                this.setState((state) => {
                  // Важно: используем state вместо this.state при обновлении для моментального рендеринга
                  return {showLoading: false}
                });
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
    login() {
      try {
      if (this.loginInput !== '' && this.passwordInput !== ''){
        this.setShowLoading();
        axios({
          method: 'post',
          url: 'https://smektep.ficom-it.info/api/request.php',
          data: {
            aksi: "login",
            login: this.loginInput,
            password: this.passwordInput
          }
        })
        .then(res => {
          if (res.data.status === 0) {
            localStorage.setItem("key", res.data.data.session);
            this.props.showAuth(true, res.data.data.id, res.data.data.type, res.data.data.name, res.data.data.session);
            this.push();
          } else if (res.data.status === 1){
            this.props.showAuth(false);
            alert(i18next.t(res.data.message).replace(/\./g, ''));
          }
          this.setState((state) => {
            // Важно: используем state вместо this.state при обновлении для моментального рендеринга
            return {showLoading: false}
          });
        }
      )
      } else {
        /*Пустое поле логина/пароля*/
        this.setShowAlert2();
      }
    } catch(e) {
      console.log(e)
    }
    };
  render(){
    return (
      <IonApp>
      <IonPage>
        <IonContent>
        <IonGrid className={'login-page'}>
          <IonGrid className={'login-image'}/>
          <IonText>
            <h5 className={'login-title'}>{i18next.t('Введите логин и пароль')}</h5>
          </IonText>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Логин')}</IonLabel>
            <IonInput value={this.loginInput} onIonChange={ev =>
                  this.loginInput = (ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Пароль')}</IonLabel>
            <IonInput type='password' value={this.passwordInput} onIonChange={ev =>
                  this.passwordInput = (ev.target as any).value
                }></IonInput>
          </IonItem>

          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { this.login() }}>{i18next.t('Далее')}</IonButton>
          </IonGrid>
          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button nomrgn-top'} onClick={() => { this.setShowRegistration() }}>{i18next.t('Активация_аккаунта')}</IonButton>
          </IonGrid>
          <IonText>
            <p className={'login-description'}>{i18next.t('Нажимая кнопку Далее вы принимаете условия Соглашения и Политику конфиденциальности')}</p>
          </IonText>
        </IonGrid>
        </IonContent>
        <IonAlert
            isOpen={this.state.showAlert1}
            onDidDismiss={() => this.setShowAlert1()}
            header={i18next.t('Ошибка')}
            message={i18next.t('Неверный логин или пароль')}
            buttons={['OK']}
          />
        <IonAlert
            isOpen={this.state.showAlert2}
            onDidDismiss={() => this.setShowAlert2()}
            header={i18next.t('Ошибка')}
            message={i18next.t('Введите логин и пароль')}
            buttons={['OK']}
          />
          <IonModal isOpen={this.state.showRegistration}>
          <IonLoading
              isOpen={this.state.showLoading}
              message={i18next.t('Пожалуйста_подождите')}
            />
            <IonHeader>
              <IonToolbar>
                <IonTitle>{i18next.t('Активация_аккаунта')}</IonTitle>
                <IonButtons slot="end">
                  <IonButton fill="clear" onClick={()=> this.setShowRegistration()}>{i18next.t('Закрыть')}</IonButton>
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
                <IonInput value={this.activationprelogin} onIonChange={ev =>
                      this.activationprelogin = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Полученный_пароль')}</IonLabel>
                <IonInput value={this.activationprepassword} onIonChange={ev =>
                      this.activationprepassword = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonText className={'register-text'}>
                <p>{i18next.t('registration_info2')}</p>
              </IonText>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Новый_логин')}</IonLabel>
                <IonInput value={this.activationLogin} onIonChange={ev =>
                      this.activationLogin = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Новый пароль')}</IonLabel>
                <IonInput value={this.activationPassword} onIonChange={ev =>
                      this.activationPassword = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Повторите новый пароль')}</IonLabel>
                <IonInput value={this.activationPasswordRepeat} onIonChange={ev =>
                      this.activationPasswordRepeat = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('Имя')}</IonLabel>
                <IonInput value={this.activationName} onIonChange={ev =>
                      this.activationName = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">{i18next.t('e-mail')}</IonLabel>
                <IonInput value={this.activationEmail} onIonChange={ev =>
                      this.activationEmail = (ev.target as any).value
                    }>
                </IonInput>
              </IonItem>
              <IonText className={'register-text'}>
                <p>{i18next.t('Убедитесь_в_почте')}</p>
              </IonText>
              <IonGrid className={'login-button-container full-width'}>
                <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { this.activate() }}>{i18next.t('Далее')}</IonButton>
              </IonGrid>
            </div>

            </IonContent>
        </IonModal>
      </IonPage>
      </IonApp>
    );
  }

};

export default Login;
