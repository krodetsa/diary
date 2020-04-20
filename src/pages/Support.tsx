import React, { useState } from 'react';
import i18next from "i18next";
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonMenuButton, IonTitle, IonIcon, IonFabButton, IonGrid, IonItem, IonRow, IonTextarea, IonButton, IonModal, IonToast } from '@ionic/react';
import { add, send } from 'ionicons/icons';
import '../theme/support.css';
function Support(props: any){
  const [newTicketModal, newTicketModalToggle] = useState(false);
  const [toastShow, toastShowToggle] = useState(false);
  var messageInput = "";
  var sendMessage = () => {
    console.log(1);
    newTicketModalToggle(!newTicketModal);
    toastShowToggle(!toastShow);
  }
  return(
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
            <IonMenuToggle>
              <IonMenuButton auto-hide={true}/>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>{i18next.t('Поддержка')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className={'fullheight'}>
          <a href="https://www.youtube.com/watch?v=pJX40mP1foc">link</a>
          <p className={'nosupport'}>{i18next.t('Нет обращений в поддержку')}</p>
        </div>
        {/* модальное окно "личное/групповое сообщение */}
        <IonFabButton color="primary" onClick={() => newTicketModalToggle(!newTicketModal)} className="add-message-button">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <IonModal isOpen={newTicketModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{i18next.t('Новое сообщение в поддержку')}</IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={() => newTicketModalToggle(!newTicketModal)}>{i18next.t('Закрыть')}</IonButton>
            </IonButtons>
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
        </IonModal>
        <IonToast
          isOpen={toastShow}
          onDidDismiss={() => toastShowToggle}
          message={i18next.t('Сообщение отправлено')}
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
