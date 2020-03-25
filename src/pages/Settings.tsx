import React from 'react';
import i18next from "i18next";
import {
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonButton,
  IonListHeader,
  IonList,
  IonInput,
  IonContent,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonMenuButton,
  IonTitle,
  IonPage
} from '@ionic/react';
import sendPost from '../axios.js'
import '../theme/settings.css';
interface IMyComponentProps {
  user_id: any
};

interface IMyComponentState {
  lang: string;
};

class Settings extends React.Component<IMyComponentProps, IMyComponentState> {
  oldPassword = '';
  newPassword = '';
  newPasswordConfirm = '';
  changeLanguage(lan) {
    i18next.changeLanguage(lan).then(() => {
    i18next.options.lng = lan;
    localStorage.setItem("lan", lan);
  })
  }
  sendNewPass = () => {
      sendPost({
          "aksi": "changePassword",
          "user_id": this.props.user_id,
          "old_password": this.oldPassword,
          "new_password": this.newPassword
      })

      .then(res => {
        console.log(res);
        if (res.data.status === true) {
          alert("Пароль успешно изменен");
        } else {
          alert(res.data.error);
        }
      })
  }
changePass = () => {
  let check = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{5,}$/;
  // console.log(this.oldPassword, this.newPassword, this.newPasswordConfirm);
  if (check.test(this.newPassword)) {
    // корректная проверка регуляркой
    if(this.newPassword === this.newPasswordConfirm) {
      // console.log(true);
      this.sendNewPass();
    } else {
      alert('Проверьте правильность ввода нового пароля');
    }
  } else {
    //несоответствие regexp
    alert('Пароль должен содержать не менее 6 символов латинского алфавита и цифры');
  }
}
  render() {
    return(
      <IonPage>
      <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
              <IonMenuToggle>
                <IonMenuButton auto-hide={true}/>
                </IonMenuToggle>
              </IonButtons>
              <IonTitle>{i18next.t('Настройки')}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonRadioGroup onIonChange={e => this.changeLanguage(e.detail.value)} value={localStorage.getItem('lan')}>
            <IonListHeader>{i18next.t('Выберите язык')}</IonListHeader>
            <IonItem className="padding-top">
              <IonLabel>Русский</IonLabel>
              <IonRadio value="ru" />
            </IonItem>
            <IonItem className="padding-top">
              <IonLabel>Кыргыз тили</IonLabel>
              <IonRadio  value="kg" />
            </IonItem>
          </IonRadioGroup>
          <IonListHeader>{i18next.t('Смена пароля')}</IonListHeader>
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
              expand="full"
              className="change-password"
              onClick={() => { this.changePass() }}>
              {i18next.t('Сменить пароль')}
            </IonButton>
          </IonList>
        </IonContent>
        </IonPage>
    )
  }
}

export default Settings
