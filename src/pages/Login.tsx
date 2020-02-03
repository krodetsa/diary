import React from 'react';
import { IonContent,IonInput,IonApp, IonAlert, IonButton, IonText, IonGrid, IonItem, IonLabel, IonPage} from '@ionic/react';
import '../theme/login.css';
import axios from 'axios';
import i18next from "i18next";
interface IMyComponentProps {
  showAuth: any,

}
interface IMyComponentState {
    showAlert1: boolean,
    showAlert2: boolean,
};
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        showAlert1: false,
        showAlert2: false,
      };
    };
    setShowAlert1 = () => {
      this.setState({ showAlert1: !this.state.showAlert1 });
    };
    setShowAlert2 = () => {
      this.setState({ showAlert2: !this.state.showAlert2 });
    }
    loginInput = '';
    passwordInput = '';
    login() {
      if (this.loginInput !== '' && this.passwordInput !== ''){
        axios({
          method: 'post',
          url: 'https://www.log.school/web/controllers/data.php',
          data: {
            aksi: "login",
            login: this.loginInput,
            password: this.passwordInput
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.success === true) {
            this.props.showAuth(res.data.success, res.data.data.user_id, res.data.data.type, res.data.data.name, res.data.data.key);
          } else {
            this.props.showAuth(false);
            this.setShowAlert1();
          }
        })
      } else {
        this.setShowAlert2();
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
                  this.loginInput =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Пароль')}</IonLabel>
            <IonInput type='password' value={this.passwordInput} onIonChange={ev =>
                  this.passwordInput =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonText>
            <p className={'login-description'}>{i18next.t('Нажимая кнопку Далее вы принимаете условия Соглашения и Политику конфиденциальности')}</p>
          </IonText>
          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { this.login() }}>{i18next.t('Далее')}</IonButton>
          </IonGrid>
        </IonGrid>
        </IonContent>
        <IonAlert
            isOpen={this.state.showAlert1}
            onDidDismiss={() => this.setShowAlert1()}
            header={i18next.t('Ошибка')}
            message={i18next.t('Неверный логин или пароль.')}
            buttons={['OK']}
          />
        <IonAlert
            isOpen={this.state.showAlert2}
            onDidDismiss={() => this.setShowAlert2()}
            header={i18next.t('Ошибка')}
            message={i18next.t('Введите логин и пароль.')}
            buttons={['OK']}
          />
      </IonPage>
      </IonApp>
    );
  }

};

export default Login;
