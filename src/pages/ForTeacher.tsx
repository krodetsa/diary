import React from 'react';
import i18next from "i18next";
import { IonContent, IonHeader,IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
interface IMyComponentProps {
  currentDate: any,
  setShowModal: any;
  attendancePerDate: any
};

interface IMyComponentState {

};
class TabForTeacher extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{i18next.t('Для учителя')}</IonTitle>
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
  }

};

export default TabForTeacher;
