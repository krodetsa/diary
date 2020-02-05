import React from 'react';
import {
  IonList,
  IonContent,
  IonButtons,
  IonModal,
  IonHeader,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonFabButton,
  IonPage,
  IonTitle,
  IonLabel,
  IonItem,
  IonToolbar,
  IonSelect,
  IonMenuToggle,
  IonMenuButton,
  IonSelectOption,
  withIonLifeCycle,
 } from '@ionic/react';
// import axios from 'axios';
import sendPost from '../axios.js'
import { add } from 'ionicons/icons';
import '../theme/messages.css';
import { RefresherEventDetail } from '@ionic/core';

interface IMyComponentProps {
  user_id: string,
  type: string,
}
interface IMyComponentState {
  showAlert1:boolean,
  classesCount: any,
  classesClear: any,
};
class Messages extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      showAlert1: false,
      classesCount: [],
      classesClear: []
    }
  }
  ionViewWillEnter() {
  }
  doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.detail.complete();
  }, 2000);
}
  setShowModal = () => {
    this.setState({ showAlert1: !this.state.showAlert1 });
    //запрос списка классов
    sendPost({
        aksi: "getСlasses",
        user_id: this.props.user_id,

    })
    .then(res => {console.log(res)})
  };
  openSingle = () => {
    if(this.state.classesCount.length > 0){
      let arr = this.state.classesClear;
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {classesCount: arr}
    });
  } else {
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {classesCount: [1,2]}
    });
  }
    console.log(this.state.classesCount)
  }
  render() {
    return (
      <IonPage>
      <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={this.doRefresh} >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="end">
          <IonMenuToggle>
            <IonMenuButton auto-hide={true}/>
            </IonMenuToggle>
          </IonButtons>
            <IonTitle>Сообщения</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        {
          this.props.type === "3" &&
          <IonFabButton color="primary" onClick={this.setShowModal} className="add-message-button">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        }
        </IonContent>
          <IonModal isOpen={this.state.showAlert1}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Создать сообщение</IonTitle>
                <IonButtons slot="end" >
                  <IonButton fill="clear" onClick={() => this.setShowModal()}>Закрыть</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
              <IonItem onClick={this.openSingle}>
                <IonLabel>Личное сообщение</IonLabel>
              </IonItem>
              {
                this.state.classesCount.map(el=> {
                  return (
                    <IonItem key = {++this.state.classesCount.length}>
                      <IonLabel>Класс</IonLabel>
                      <IonSelect multiple>
                        <IonSelectOption value="valueA">Ученик</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  )
                })
              }


              <IonItem>
                <IonLabel>Групповое сообщение</IonLabel>
              </IonItem>
              </IonList>
            </IonContent>
          </IonModal>
          </IonContent>
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Messages);
