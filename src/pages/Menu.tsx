import React from 'react';
import '../theme/Main.css';
import '../theme/calendarsmall.css';
import i18next from "i18next";
import {
  IonContent,
  IonItem,
  IonMenu,
  IonList,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonAlert
} from '@ionic/react';
import { exit, people } from 'ionicons/icons';
interface IMyComponentProps {
};

interface IMyComponentState {
showAlert: boolean
};

class Menu extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
    showAlert: false
 }
}
setShowAlert() {
  this.setState({showAlert: !this.state.showAlert})
}
logOut() {
  localStorage.clear();
  window.location.href="/login"
}
render() {
  return(
    <>
      <IonMenu type="overlay" side="start" contentId="custom" className={'float-menu'}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>{i18next.t('Меню')}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem >
                <IonIcon slot="start" icon={exit}/>
                <IonLabel onClick={() => this.setShowAlert()}>{i18next.t('Выход')}</IonLabel>
              </IonItem>
              <IonItem href="/contacts">
                <IonIcon slot="start" icon={people}/>
                <IonLabel>{i18next.t('Контакты')}</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="custom"/>
        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => this.setShowAlert()}
          header={i18next.t('Предупреждение')}
          message={i18next.t('Вы действительно хотите выйти из аккаунта?')}
          buttons={[
            {
              text: i18next.t('Отмена'),
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: i18next.t('Выйти'),
              handler: () => {
                this.logOut();
              }
            }
          ]}
        />
      </>
  )
}
}
export default Menu
