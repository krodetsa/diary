import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonItem, IonInput, IonLabel, IonButton } from '@ionic/react';
import i18next from 'i18next';
import sendPost from '../axios';
interface IMyComponentProps {
  user_id: any
};

interface IMyComponentState {
  lang: string;
};
class Details extends React.Component<IMyComponentProps, IMyComponentState> {
  oldPassword = '';
  newPassword = '';
  newPasswordConfirm = '';
  sendNewPass = () => {
      sendPost({
          "aksi": "changePassword",
          "old_password": this.oldPassword,
          "new_password": this.newPassword
      })

      .then(res => {
        console.log(res);
        if (res.data.status === 0) {
          alert("Пароль успешно изменен");
        } else {
          alert("Error");
        }
      })
  }
changePass = () => {
  let check = /^(?=.*[0-9])(?=\S+$).{5,}$/;
  // console.log(this.oldPassword, this.newPassword, this.newPasswordConfirm);
  if (check.test(this.newPassword)) {
    // корректная проверка регуляркой
    if(this.newPassword === this.newPasswordConfirm) {
      // console.log(true);
      this.sendNewPass();
    } else {
      alert(i18next.t('Проверьте правильность ввода нового пароля'));
    }
  } else {
    //несоответствие regexp
    alert(i18next.t('Пароль должен содержать не менее 6 символов латинского алфавита и цифры'));
  }
}
  render(){
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
            <IonInput value={this.oldPassword} onIonChange={ev =>
                  this.oldPassword =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Новый пароль')}</IonLabel>
            <IonInput value={this.newPassword} onIonChange={ev =>
                  this.newPassword =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{i18next.t('Повторите новый пароль')}</IonLabel>
            <IonInput value={this.newPasswordConfirm} onIonChange={ev =>
                  this.newPasswordConfirm =(ev.target as any).value
                }></IonInput>
          </IonItem>
          <IonButton

            className="change-password"
            onClick={() => { this.changePass() }}>
            {i18next.t('Сменить пароль')}
          </IonButton>
        </IonList>
        </IonContent>
      </IonPage>
    );
  }

};

export default Details;
