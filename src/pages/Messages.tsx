import React from 'react';
import { IonContent, IonHeader,  IonPage, IonTitle, IonToolbar,withIonLifeCycle } from '@ionic/react';
import axios from 'axios';
interface IMyComponentProps {
  user_id: string,
  type: string,
}
interface IMyComponentState {
};
class Messages extends React.Component<IMyComponentProps, IMyComponentState> {
  ionViewWillEnter() {
    axios({
      method: 'post',
      url: 'https://m.log.school/web/proses-api.php',
      data: {
        aksi: "getmsg",
        user_id: this.props.user_id,
        type: this.props.type
      }
    })
    .then(res => {console.log(res)})
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Сообщения</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Messages);
