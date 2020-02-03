import React from 'react';
import {
  IonList,
  IonContent,
  IonButtons,
  IonModal,
  IonHeader,
  IonButton,
  IonIcon,
  IonFabButton,
  IonPage,
  IonTitle,
  IonLabel,
  IonItem,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  withIonLifeCycle,
 } from '@ionic/react';
import axios from 'axios';
import { add } from 'ionicons/icons';
import '../theme/messages.css';

interface IMyComponentProps {
  user_id: string,
  type: string,
}
interface IMyComponentState {
  showAlert1:boolean,
};
class Messages extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      showAlert1: false,
    }
  }
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
  setShowModal = () => {
    this.setState({ showAlert1: !this.state.showAlert1 });
  };
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Сообщения</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        {
          this.props.type === "1" &&
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
                <IonItem>
                <IonLabel>Личное сообщение</IonLabel>
                <IonSelect multiple>
                  <IonSelectOption value="valueA">Ученик</IonSelectOption>
                  <IonSelectOption value="valueB">Преподаватель</IonSelectOption>
                </IonSelect>
                </IonItem>
                <IonItem>
                <IonLabel>Сообщение классу</IonLabel>
                <IonSelect multiple>
                  <IonSelectOption value="valueA">1"а"</IonSelectOption>
                  <IonSelectOption value="valueB">1"б"</IonSelectOption>
                </IonSelect>
              </IonItem>
              </IonList>
            </IonContent>
          </IonModal>
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Messages);
