import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Calendar from 'react-calendar';
import '../theme/Main.css';
import '../theme/attendance.css';
interface IMyComponentProps {

};
interface IMyComponentState {
  currentDate: any,
};
class Tab3Page extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
   currentDate: new Date(),

 }
}
dateChanged = date => {
  this.setState({ currentDate: date });
  console.log(this.state.currentDate);
}
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Посещаемость</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Calendar onChange={this.dateChanged} view={'month'} value={this.state.currentDate}/>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3Page;
