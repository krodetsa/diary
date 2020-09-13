import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonMenuButton,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  withIonLifeCycle,
  IonLoading
} from '@ionic/react';
// const moment = require('moment');
import sendPost from '../axios.js'
import i18next from "i18next";
import React from 'react';
import '../theme/Main.css';
import { RefresherEventDetail } from '@ionic/core';
interface IMyComponentState {
  name: string,
  messages: any,
  showLoading: boolean
};
interface IMyComponentProps {
  name: string,
  type: any,
}
const moment = require('moment');
class Tab1 extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        name: this.props.name,
        messages: [],
        showLoading: false
      };
    }
    getMessages = () => {
      if(this.state.messages.length === 0) {
        this.setState({showLoading: true});
      }

      sendPost({
          "aksi":"getMessages",
          "first_date": moment().unix().toString(),
          "range":"100",
          "is_global": true
      })

      .then(res => {
        if (res.data.status === 0) {
          this.setState({messages: res.data.data.messages.reverse(), showLoading: false});
        } else {
            this.setState({showLoading: false});
          alert("Error. Try again.");
        }
      })
    }
    ionViewWillEnter() {
      this.getMessages();
    }
    doRefresh(event: CustomEvent<RefresherEventDetail>) {
    this.getMessages();
      setTimeout(() => {
        event.detail.complete();
      }, 2000);
    }
  render() {
  return (
    <IonPage>
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
      <IonRefresher slot="fixed" onIonRefresh={(event) => this.doRefresh(event)}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle color={"primary"}>{moment().local().format('DD.MM')} | {moment().local().format('HH:mm')}</IonCardSubtitle>
          <IonCardTitle >{i18next.t('Добро_пожаловать') + " " + this.props.name}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
      <IonLoading
        isOpen={this.state.showLoading}
        onDidDismiss={() => this.setState({showLoading: false})}
        message={'Please wait...'}
        duration={5000}
      />
      {
        this.state.messages.length > 0 ? (
          this.state.messages.map((el, i) => {
            return(
              <IonCard key = {i}>
                <IonCardHeader>
                  <IonCardSubtitle color={"primary"}>{moment(el.dtime_create).local().format('DD.MM')} | {moment(el.dtime_create).local().format('HH:mm')}</IonCardSubtitle>
                  <IonCardTitle>{el.name_sender}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                  <div dangerouslySetInnerHTML={{__html: el.message_text}}>
                  </div>
                </IonCardContent>
              </IonCard>
            )

          })
        ) :   (
          <IonItem className={'padding'}>
          {i18next.t('Нет новых уведомлений')}
          </IonItem>
        )
      }

      </IonContent>
    </IonPage>
  );
}
};

export default withIonLifeCycle(Tab1);
