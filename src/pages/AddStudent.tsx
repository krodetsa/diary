import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonItem, IonInput, IonLabel, IonButton } from '@ionic/react';
import i18next from 'i18next';
import sendPost from '../axios';
import { useHistory } from "react-router-dom";

function AddStudent(props: any) {
  const history = useHistory();
  let login = "";
  let password = "";
  let addStudent = () => {
    if(login !=="" && password !==''){
      sendPost({
          "aksi": "addStudent",
          "pre_login": login,
          "pre_password": password
      })

      .then(res => {
        console.log(res);
        if (res.data.status === 0) {
          var name = '';
          res.data.data.students.forEach(el => {
            if(res.data.data.id_new_student == el.id)
            name = el.name;
          });
          alert(i18next.t('К вашему аккаунту добавлен') +" "+  name );
          login = "";
          password = "";
          history.push("/tab2");
        } else {
          alert("Error");
        }
      })
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className={'bck'} defaultHref="/settings" text="Назад"/>
          </IonButtons>
          <IonTitle>{i18next.t('Добавить ученика')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonListHeader className="padding-top">{i18next.t('Для добавления ученика введите выданные вам уникальный идентификатор ученика и пароль')}</IonListHeader>
      <IonList className="flex-column">
        <IonItem>
          <IonLabel position="floating">{i18next.t('Идентификатор')}</IonLabel>
          <IonInput value={login} onIonChange={ev =>
              login =(ev.target as any).value
              }></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">{i18next.t('Пароль')}</IonLabel>
          <IonInput value={password} onIonChange={ev =>
                password =(ev.target as any).value
              }></IonInput>
        </IonItem>
        <IonButton

          className="change-password"
          onClick={() => { addStudent() }}>
          {i18next.t('Добавить')}
        </IonButton>
      </IonList>
      </IonContent>
    </IonPage>
  );
}


export default AddStudent;
