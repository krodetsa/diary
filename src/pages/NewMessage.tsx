import React from 'react';
import i18next from "i18next";
import sendPost from '../axios.js';
import '../theme/messages.css';
import { send } from 'ionicons/icons';
import {
  IonContent,
  IonButtons,
  IonModal,
  IonHeader,
  IonButton,
  IonTitle,
  IonGrid,
  IonRow,
  IonToolbar,
  IonItem,
  IonToast,
  IonTextarea,
  IonIcon,
 } from '@ionic/react';
interface IMyComponentProps {
  newMessageModal: any,
  showNewMessageModal: any,
  single: any,
  multi: any,
  studentsInClass: any,

}
interface IMyComponentState {
toastShow: boolean,
};
class NewMessage extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      toastShow: false
    }
  }
  showNewMessageModal = () => {
    this.props.newMessageModal();
  }
  sendMessage = () => {
    this.setState({toastShow: !this.state.toastShow});
  }
  ionViewWillEnter() {}
  render() {
    console.log(this.props.studentsInClass);
    console.log(this.props.single)
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

          <IonGrid className={'with-margin-top'}>
            <IonRow>
            {/*Сообщение одному пользователю*/

              this.props.single.length==1  &&
              <>
              <IonTitle>Имя ученика</IonTitle>
            <IonTitle className={"new-message-name"}>{this.props.studentsInClass.map(el => {
              if(el.id == this.props.single[0]) {
                return (el.name)
              }
            })}</IonTitle>
            <IonTitle>Родители:</IonTitle>
          <IonTitle className={"new-message-name"}>{this.props.studentsInClass.map(el => {
            if(el.id == this.props.single[0]) {
              return (el.parents)
            }
          })}</IonTitle>
          </>}
          </IonRow>
          </IonGrid>
          <IonGrid className={'write-message'}>
            <IonItem>
            <IonRow className={'full-width'}>
              <IonTextarea className={'textarea-main'} placeholder="Введите сообщение"></IonTextarea>
              <IonButton onClick={this.sendMessage} className={'message-button'}>
                <IonIcon icon={send}/>
              </IonButton>
              </IonRow>
            </IonItem>
          </IonGrid>

          <IonToast
      isOpen={this.state.toastShow}
      onDidDismiss={() => this.setState({toastShow: !this.state.toastShow})}
      message="Сообщение отправлено"
      position="bottom"
      duration={3000}
      buttons={[
        {
          text: 'Закрыть',
          role: 'cancel',
          handler: () => {
            this.setState({toastShow: !this.state.toastShow})
          }
        }
      ]}
    />
      </IonContent>
    </IonModal>
    )
  }
}
export default NewMessage
