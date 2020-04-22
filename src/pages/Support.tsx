import React, { useState } from 'react';
import i18next from "i18next";
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonMenuButton, IonTitle, IonIcon, IonGrid, IonItem, IonRow, IonTextarea, IonButton, IonToast, IonBackButton } from '@ionic/react';
import {  send } from 'ionicons/icons';
import '../theme/support.css';
import sendPost from '../axios.js';
 const moment = require('moment');
function Support(props: any){
  const [toastShow, toastShowToggle] = useState(false);
  var messageInput = "";
  var sendMessage = () => {
    if(messageInput !== "") {
      sendPost({
          "aksi":"sendSupport",
          "date": moment().unix(),
          "text": messageInput
      })

      .then(res => {
        if (res.data.status === 0) {
            toastShowToggle(!toastShow);
        } else {
            console.log(res);
        }
      })
    }
  }
  return(
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/main" text="Назад"/>
            </IonButtons>
            <IonButtons slot="end">
            <IonMenuToggle>
              <IonMenuButton auto-hide={true}/>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>{i18next.t('Поддержка')}</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonGrid className={'write-message'}>
            <div className={'support-help'}>
              <p className={'nosupport text-centered'}>{i18next.t('Здесь Вы можете задать любой вопрос о работе приложения')}</p>
            </div>
            <IonItem className={'input-area'}>
              <IonRow className={'full-width'}>
                <IonTextarea
                  className={'textarea-main'}
                  placeholder={i18next.t('Введите сообщение')}
                  value={messageInput}
                  onIonChange={ev =>
                        messageInput = (ev.target as any).value
                      }
                  ></IonTextarea>
                <IonButton onClick={sendMessage} className={'message-button'}>
                  <IonIcon icon={send}/>
                </IonButton>
              </IonRow>
            </IonItem>
          </IonGrid>
        <IonToast
          isOpen={toastShow}
          onDidDismiss={() => toastShowToggle}
          message={i18next.t('Сообщение в поддержку отправлено')}
          position="bottom"
          duration={3000}
          buttons={[
            {
              text: `${i18next.t('Закрыть')}`,
              role: 'cancel',
              handler: () => {
                toastShowToggle(!toastShow)
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>

  )
}
export default Support
