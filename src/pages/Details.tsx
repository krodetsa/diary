import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Details: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/forteacher" text="Назад"/>
          </IonButtons>
          <IonTitle>Подробности</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Подробности</p>
      </IonContent>
    </IonPage>
  );
};

export default Details;
