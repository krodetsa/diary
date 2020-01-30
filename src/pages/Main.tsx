import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { } from 'ionicons/icons';
import React from 'react';
import '../theme/Main.css';
interface IMyComponentState {
  name: string
};
interface IMyComponentProps {
  name: string
}
class Tab1 extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        name: this.props.name
      };
    }
  render() {
    console.log(this.props)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Главная</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle></IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

        </IonCardContent>
      </IonCard>


      </IonContent>
    </IonPage>
  );
}
};

export default Tab1;
