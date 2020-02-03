import React from 'react';
import i18next from "i18next";
import {
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonListHeader,
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
interface IMyComponentProps {
};

interface IMyComponentState {
lang: string
};

class Settings extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
  }
  changeLanguage(lan) {
    i18next.changeLanguage(lan).then(() => {
    i18next.options.lng = lan;
    localStorage.setItem("lan", lan);
    window.location.href="/settings"
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
          <IonRadioGroup onIonChange={e => this.changeLanguage(e.detail.value)} value={localStorage.getItem('lan')}>
            <IonListHeader>{i18next.t('Выберите язык')}</IonListHeader>
            <IonItem>
              <IonLabel>Русский</IonLabel>
              <IonRadio value="ru" />
            </IonItem>
            <IonItem>
              <IonLabel>Кыргыз тили</IonLabel>
              <IonRadio  value="kg" />
            </IonItem>
          </IonRadioGroup>
        </IonContent>
        </IonPage>
    )
  }
}

export default Settings
