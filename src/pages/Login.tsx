import React, { useState } from 'react';
import { IonContent,IonInput, IonAlert, IonButton, IonText, IonGrid, IonItem, IonLabel, IonPage} from '@ionic/react';
import '../theme/login.css';
import axios from 'axios';

const Login: React.FC = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false)
  let loginInput = '';
  let passwordInput = '';
  function login() {
    if (loginInput !== '' && passwordInput !== ''){
      axios({
        method: 'post',
        url: 'https://m.log.school/web/proses-api.php',
        data: {
          aksi: "login",
          username: loginInput,
          password: '123456789'
        }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data);
        } else {
          setShowAlert1(true);
        }
      })
    } else {
      setShowAlert2(true);
    }
  };
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
          <IonInput value={passwordInput} onIonChange={ev =>
                passwordInput =(ev.target as any).value
              }></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Пароль</IonLabel>
          <IonInput type='password' value={loginInput} onIonChange={ev =>
                loginInput =(ev.target as any).value
              }></IonInput>
        </IonItem>
        <IonText>
          <p className={'login-description'}>Нажимая кнопку Далее вы принимаете условия <br/>Соглашения и Политику конфиденциальности</p>
        </IonText>
        <IonGrid className={'login-button-container'}>
          <IonButton fill="clear" color="dark" className={'login-button'} onClick={() => { login() }}>Далее</IonButton>
        </IonGrid>
      </IonGrid>
      </IonContent>
      <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={'Ошибка'}
          message={'Неверный логин или пароль.'}
          buttons={['OK']}
        />
      <IonAlert
          isOpen={showAlert2}
          onDidDismiss={() => setShowAlert2(false)}
          header={'Ошибка'}
          message={'Введите логин и пароль.'}
          buttons={['OK']}
        />
    </IonPage>
  );
};

export default Login;
