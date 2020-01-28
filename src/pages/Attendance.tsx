import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,withIonLifeCycle } from '@ionic/react';
import Calendar from 'react-calendar';
import '../theme/Main.css';
import '../theme/attendance.css';
// import axios from 'axios';
const jsonp = require('jsonp');
// var moment = require('moment');

interface IMyComponentProps {
user_id: string,
};
interface IMyComponentState {
  currentDate: any,
  store: any,
  attendancePerDate: string
};
class Tab3Page extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
   currentDate: new Date().valueOf(),
   store: [],
   attendancePerDate: '',
 }
}
ionViewDidEnter() {

  jsonp( "https://m.log.school/web/clnd.php?"+this.props.user_id+"=ng_jsonp_callback_3", {  name: 'ng_jsonp_callback_3' }, (error, data) => {
      if (error) {
          console.log(error)
      } else {
        // console.log(this.state.currentDate)
        this.setState({store : data})
      }
  });

}
dateChanged = date => {
  console.log(date)
  this.setState({ currentDate: date.valueOf() });
  console.log(date.getDate())
  this.state.store.forEach(el => {
    var newDate = new Date(el.start);
    if(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).valueOf() === this.state.currentDate) {

    console.log(el)
    }
  })
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
          <Calendar onClickDay={this.dateChanged} view={'month'} value={new Date(this.state.currentDate)}/>
        </IonContent>
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Tab3Page);
