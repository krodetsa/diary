import React from 'react';
import i18next from "i18next";
import sendPost from '../axios.js';
import '../theme/messages.css';
import {
  IonContent,
  IonButtons,
  IonModal,
  IonHeader,
  IonButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/react';
interface IMyComponentProps {
  newMessageModal: any,
  showNewMessageModal: any,
  single: any,
  multi: any;
  studentsInClass: any
}
interface IMyComponentState {

};
class NewMessage extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
    }
  }
  showNewMessageModal = () => {
    this.props.newMessageModal();

  }
  render() {
    // console.log(this.props.studentsInClass);
    // console.log(typeof this.props.single[0])
    return(
      <IonModal isOpen={this.props.newMessageModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Новое сообщение</IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={()=> this.props.showNewMessageModal()}>Закрыть</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        {/*Сообщение одному пользователю*/
          this.props.single.length === 1  &&
          <IonTitle className={"new-message-name"}>{this.props.studentsInClass.map(el => {
            if(el.id === this.props.single[0]) {
              return (el.name)
            }
          })}</IonTitle>
        }

      </IonContent>
    </IonModal>
    )
  }
}
export default NewMessage
