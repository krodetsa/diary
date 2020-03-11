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
  IonAlert
} from '@ionic/react';
import { exit, settings } from 'ionicons/icons';
import sendPost from '../axios.js'
interface IMyComponentProps {
  user_id: any
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
  sendPost({
    "aksi": "logout",
    "id": this.props.user_id,
  })
  .then((res)=> {
    localStorage.clear();
    window.location.href="/login"
  })
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
              <IonItem routerLink="/settings">
                <IonIcon slot="start" icon={settings}/>
                <IonLabel>{i18next.t('Настройки')}</IonLabel>
              </IonItem>
              <IonItem >
                <IonIcon slot="start" icon={exit}/>
                <IonLabel onClick={() => this.setShowAlert()}>{i18next.t('Выход')}</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

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
