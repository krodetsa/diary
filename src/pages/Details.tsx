import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonItem, IonInput, IonLabel, IonButton } from '@ionic/react';
import i18next from 'i18next';
import sendPost from '../axios';
import { useHistory } from "react-router-dom";

function Details(props){
  const history = useHistory();
  var oldPassword = '';
  var newPassword = '';
  var newPasswordConfirm = '';
  var sendNewPass = () => {
      sendPost({
          "aksi": "changePassword",
          "old_password": oldPassword,
          "new_password": newPassword
      })

      .then(res => {
        console.log(res);
        if (res.data.status === 0) {
          alert("Пароль успешно изменен");
          history.push("/tab1");
        } else {
          alert("Error");
        }
      })
  }
function changePass() {
  console.log(history)
  let check = /^(?=.*[0-9])(?=\S+$).{5,}$/;
  // console.log(this.oldPassword, this.newPassword, this.newPasswordConfirm);
  if (check.test(newPassword)) {
    // корректная проверка регуляркой
    if(newPassword === newPasswordConfirm) {
      // console.log(true);
      sendNewPass();
    } else {
      alert(i18next.t('Проверьте правильность ввода нового пароля'));
    }
  } else {
    //несоответствие regexp
    alert(i18next.t('Пароль должен содержать не менее 6 символов латинского алфавита и цифры'));
  }
}
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/settings" text="Назад"/>
        </IonButtons>
        <IonTitle>{i18next.t('Смена пароля')}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <IonListHeader className="padding-top">{i18next.t('Пароль должен содержать не менее 6 символов латинского алфавита и цифры')}</IonListHeader>
    <IonList className="flex-column">
      <IonItem>
        <IonLabel position="floating">{i18next.t('Текущий пароль')}</IonLabel>
        <IonInput value={oldPassword} onIonChange={ev =>
              oldPassword =(ev.target as any).value
            }></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">{i18next.t('Новый пароль')}</IonLabel>
        <IonInput value={newPassword} onIonChange={ev =>
              newPassword =(ev.target as any).value
            }></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">{i18next.t('Повторите новый пароль')}</IonLabel>
        <IonInput value={newPasswordConfirm} onIonChange={ev =>
              newPasswordConfirm =(ev.target as any).value
            }></IonInput>
      </IonItem>
      <IonButton

        className="change-password"
        onClick={() => { changePass() }}>
        {i18next.t('Сменить пароль')}
      </IonButton>
    </IonList>
    </IonContent>
  </IonPage>
);

};

export default Details;
