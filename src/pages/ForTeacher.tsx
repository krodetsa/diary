import React from 'react';
import { IonContent, IonHeader,IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';

const TabForTeacher: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Для учителя</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
        <IonItem routerLink="/forteacher/details">
          <IonLabel>
            <h2>Подробности</h2>
          </IonLabel>
        </IonItem>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TabForTeacher;
