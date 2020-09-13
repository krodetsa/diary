import React  from "react";
import i18next from "i18next";
import '../theme/account.css';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, withIonLifeCycle } from "@ionic/react";
import { settings } from 'ionicons/icons';
import { useHistory } from "react-router-dom";

function Account(props: any) {
  const history = useHistory();
  function goSettings() {
    history.push("/settings");
  };

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className={'bck'} defaultHref="/settings" text={i18next.t('Назад')}/>
          </IonButtons>
          <IonTitle>{i18next.t('Личный кабинет')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem className="username">
          <IonIcon slot="end" icon={settings} onClick = { () => goSettings()}/>
          <IonLabel>{props.name}</IonLabel>
        </IonItem>
        <IonList>
          <IonItem>
          {i18next.t('Баланс') + ": "}{props.balance}
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Account
