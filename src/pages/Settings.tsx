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
  IonSelectOption,
  IonBackButton
} from '@ionic/react';
import '../theme/settings.css';
interface IMyComponentProps {
  user_id: any,
  type: any
};

interface IMyComponentState {
  lang: string;
};

class Settings extends React.Component<IMyComponentProps, IMyComponentState> {

  changeLanguage(lan) {
    console.log(lan)
    i18next.changeLanguage(lan).then(() => {
      i18next.options.lng = lan;
      localStorage.setItem("lan", lan);
      document.location.reload(true);
    })
  }

  render() {
    return(
      <IonPage>
      <IonContent>
      <IonHeader>
      </IonHeader>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton className={'bck'} defaultHref="/main" text={i18next.t('Назад')}/>
              </IonButtons>
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
              <IonSelectOption value="en">English</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem  routerLink="/details">
            <IonLabel>  {i18next.t('Смена пароля')}</IonLabel>
          </IonItem>
        {  this.props.type === "1" &&
          <IonItem  routerLink="/addstudent">
            <IonLabel>  {i18next.t('Добавить ученика')}</IonLabel>
          </IonItem>}
        </IonContent>
        </IonPage>
    )
  }
}

export default Settings
