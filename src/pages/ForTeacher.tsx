import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard,IonCardContent,IonCardSubtitle,IonCardHeader,IonCardTitle } from '@ionic/react';

const TabForTeacher: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Для учителя</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard className="welcome-card">
        <img src="/assets/shapes.svg" alt="" />
        <IonCardHeader>
          <IonCardSubtitle>Get Started</IonCardSubtitle>
          <IonCardTitle>Welcome to Ionic</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            Now that yosadur app has been created, you'll want to start building out features and
            components. Check out some of the resources below for next steps.
          </p>
        </IonCardContent>
      </IonCard></IonContent>
    </IonPage>
  );
};

export default TabForTeacher;
