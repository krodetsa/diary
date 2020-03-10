import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonMenuButton
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import i18next from "i18next";
import { } from 'ionicons/icons';
import React from 'react';
import '../theme/Main.css';
interface IMyComponentState {
  name: string
};
interface IMyComponentProps {
  name: string,
  type: any,
}
class Tab1 extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        name: this.props.name
      };
    }
  render() {
  return (
    <IonPage>
    {
      this.props.type === "1" &&
      <Redirect exact from="/" to="/tab3" />
    }
    {
      this.props.type === "3" &&
      <Redirect exact from="/" to="/tab2" />
    }
      <IonHeader>
        <IonToolbar>
      <IonButtons slot="end">
      <IonMenuToggle>
        <IonMenuButton auto-hide={true}/>
        </IonMenuToggle>
      </IonButtons>

          <IonTitle>{i18next.t('Главная')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>


      </IonContent>
    </IonPage>
  );
}
};

export default Tab1;
