import React from 'react';
import i18next from "i18next";
import {
  IonLabel,
  IonContent,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonMenuButton,
  IonTitle,
  IonPage,
  IonSelect,
  IonSelectOption
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

  changeLanguage(lan) {
    i18next.changeLanguage(lan).then(() => {
    i18next.options.lng = lan;
    localStorage.setItem("lan", lan);
  })
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
          <IonItem className={'padding-left'}>
            <IonLabel>{i18next.t('Выберите язык')}</IonLabel>
            <IonSelect value={localStorage.getItem('lan')} placeholder="Select One" onIonChange={e => this.changeLanguage(e.detail.value)}>
              <IonSelectOption value="ru">Русский</IonSelectOption>
              <IonSelectOption value="kg">Кыргыз тили</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem  routerLink="/details">
            <IonLabel>  {i18next.t('Смена пароля')}</IonLabel>
          </IonItem>
        </IonContent>
        </IonPage>
    )
  }
}

export default Settings
