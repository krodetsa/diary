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
  IonTextarea,
  IonIcon,
  IonFooter
 } from '@ionic/react';
 const moment = require('moment');
interface IMyComponentProps {
  allSchool: any,
  newMessageModal: any,
  showNewMessageModal: any,
  single: any,
  multi: any,
  studentsInClass: any,
  closeMessageModal: any,
  classes: any,
  clearData: any,
  user_id: any
}
interface IMyComponentState {
toastShow: boolean,
toAll: boolean
};
class NewMessage extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      toastShow: false,
      toAll: false,
    }
  }
  messageInput = '';
  showNewMessageModal = () => {
    this.props.clearData();
    this.props.showNewMessageModal();
  }
  groupTypeId = 1;
  sendMessage = () => {
    // 1 personal
    // 2 class
    // 3 course
    // 4 school
    if (this.props.multi.length > 0 ) {
      this.groupTypeId = 2;
    } if (this.props.single.length > 0) {
        this.groupTypeId = 1;
    } if (this.props.allSchool === true) {
        this.groupTypeId = 4;
    }
    sendPost({
      "aksi" : "sendMessage",
      // "user_id": this.props.user_id,
      "recipients": this.props.single.length > 0 ? this.props.single : this.props.multi,
      // "group_message": this.props.multi.length > 0 ? true : false,
      "group_type_id": this.groupTypeId,
      "message_text": this.messageInput,
      "message_time":  moment().unix(),
      // "group": this.props.multi.length > 0 ? 1 : 0
    })
    .then(res => {
      this.props.closeMessageModal();
      this.props.clearData();
      this.messageInput = ''
    })

  }
  render() {
    return(
      <IonModal isOpen={this.props.newMessageModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{i18next.t('Новое сообщение')}</IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={()=> this.showNewMessageModal()}>{i18next.t('Закрыть')}</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className={'container-new-message'}>

        <IonGrid className={'with-margin-top'}>
          <IonRow>
          {/*Сообщение всей школе*/
            this.props.allSchool === true &&
            <div className={'names-container'}>
            <IonTitle>{i18next.t('Сообщение_всей_школе')}</IonTitle>
        </div>
          }
          {/*Сообщение одному пользователю*/

            this.props.single.length === 1  &&
            <div className={'names-container'}>
            <IonTitle>{i18next.t('Имя ученика')}</IonTitle>
          <IonTitle className={"new-message-name"}>{this.props.studentsInClass.map(el => {
            if(el.id === this.props.single[0]) {
              return (el.name)
            }
            return (null)
          })}</IonTitle>
          <IonTitle>{i18next.t('Родители')}:</IonTitle>
        <IonTitle className={"new-message-name"}>{this.props.studentsInClass.map(el => {
          if(el.id === this.props.single[0]) {
            return (el.parents)
          }
          return (null)
        })}</IonTitle>
        </div>
      }
        {/*Сообщение нескольким пользователям*/

          this.props.single.length > 1  &&
          <div className={'names-container'}>
          <IonTitle>{i18next.t('Получатели')}</IonTitle>
        <IonTitle className={"new-message-name"}>{this.props.studentsInClass.map(el => {

          for (let i = 0; i < this.props.single.length; i++) {
              if(this.props.single[i] === el.id) {
                return (<p key={el.name}>{el.name}</p>)
              }
          }

        })}

        </IonTitle>

      </div>
    }
    {/*Сообщение нескольким пользователям*/

      this.props.multi.length > 0  &&
      <div className={'names-container'}>
      <IonTitle>{i18next.t('Получатели')}</IonTitle>
    <IonTitle className={"new-message-name"}>{this.props.classes.map(el => {

      for (let i = 0; i < this.props.multi.length; i++) {
          if(this.props.multi[i] === el.id) {
            return (<p key={el.class_info}>{el.class_info}</p>)
          }
      }

    })}

    </IonTitle>

  </div>
}
        </IonRow>
        </IonGrid>
        <IonFooter>
        <IonGrid className={'write-message'}>
          <IonItem>
          <IonRow className={'full-width'}>
            <IonTextarea
              className={'textarea-main'}
              placeholder={i18next.t('Введите сообщение')}
              value={this.messageInput}
              onIonChange={ev =>
                    this.messageInput = (ev.target as any).value
                  }
              ></IonTextarea>
            <IonButton onClick={this.sendMessage} className={'message-button'}>
              <IonIcon icon={send}/>
            </IonButton>
            </IonRow>
          </IonItem>
        </IonGrid>
        </IonFooter>


      </IonContent>
    </IonModal>
    )
  }
}
export default NewMessage
