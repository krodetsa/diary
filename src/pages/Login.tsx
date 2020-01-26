import React from 'react';
import { IonContent,IonInput, IonAlert, IonButton, IonText, IonGrid, IonItem, IonLabel, IonPage} from '@ionic/react';
import '../theme/login.css';
import axios from 'axios';
interface IMyComponentProps {
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
          url: 'https://m.log.school/web/proses-api.php',
          data: {
            aksi: "login",
            username: this.loginInput,
            password: this.passwordInput
          }
        })
        .then(res => {
          if (res.data.success === true) {
            console.log(res.data);
          } else {
            this.setShowAlert1();
          }
        })
      } else {
        this.setShowAlert2();
      }
    };
  render(){
    return (
      <IonPage>
        <IonContent>
        <IonGrid className={'login-page'}>
          <IonGrid className={'login-image'}/>
          <IonText>
            <h5 className={'login-title'}>Введите логин и пароль</h5>
          </IonText>
          <IonItem>
            <IonLabel position="floating">Логин</IonLabel>
            <IonInput value={this.loginInput} onIonChange={ev =>
                  this.loginInput =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Пароль</IonLabel>
            <IonInput type='password' value={this.passwordInput} onIonChange={ev =>
                  this.passwordInput =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonText>
            <p className={'login-description'}>Нажимая кнопку Далее вы принимаете условия <br/>Соглашения и Политику конфиденциальности</p>
          </IonText>
          <IonGrid className={'login-button-container'}>
            <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { this.login() }}>Далее</IonButton>
          </IonGrid>
        </IonGrid>
        </IonContent>
        <IonAlert
            isOpen={this.state.showAlert1}
            onDidDismiss={() => this.setShowAlert1()}
            header={'Ошибка'}
            message={'Неверный логин или пароль.'}
            buttons={['OK']}
          />
        <IonAlert
            isOpen={this.state.showAlert2}
            onDidDismiss={() => this.setShowAlert2()}
            header={'Ошибка'}
            message={'Введите логин и пароль.'}
            buttons={['OK']}
          />
      </IonPage>
    );
  }

};

export default Login;
