import React from 'react';
import packageJson from '../../package.json';
import '../theme/Main.css';
import '../theme/calendarsmall.css';
import i18next from "i18next";
import {
  IonContent,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonList,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonAlert,
} from '@ionic/react';
import { exit, settings, people, person } from 'ionicons/icons';
import sendPost from '../axios.js';
interface IMyComponentProps {
  user_id: any,
  type: any
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
      <IonMenu auto-hide side="start" contentId="custom" className={'float-menu'}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>{i18next.t('Меню')}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem className={'width'} routerLink="/settings">
                  <IonIcon slot="start" icon={settings}/>
                  <IonLabel>{i18next.t('Настройки')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            {this.props.type === "1" &&  <IonMenuToggle>
                <IonItem className={'width'} routerLink="/account">
                  <IonIcon slot="start" icon={person}/>
                  <IonLabel>{i18next.t('Личный кабинет')}</IonLabel>
                </IonItem>
              </IonMenuToggle>}
              <IonMenuToggle>
                <IonItem className={'width'} routerLink="/support">
                  <IonIcon slot="start" icon={people}/>
                  <IonLabel>{i18next.t('Поддержка')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                  <IonItem >
                    <IonIcon slot="start" icon={exit}/>
                    <IonLabel onClick={() => this.setShowAlert()}>{i18next.t('Выход')}</IonLabel>
                  </IonItem>
              </IonMenuToggle>
            </IonList>

          </IonContent>
          <IonLabel >
            <p className={'appversion'}>Версия приложения: {packageJson.version}</p>
          </IonLabel>
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
