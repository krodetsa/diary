import React, { useState } from 'react';
import i18next from "i18next";
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonMenuButton, IonTitle } from '@ionic/react';

function Schedule(props: any){
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
            <IonTitle>{i18next.t('Расписание')}</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}

export default Schedule
