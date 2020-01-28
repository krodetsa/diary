import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonCard, IonToolbar,withIonLifeCycle, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
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
  attendancePerDate: any
};
class Tab3Page extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
   currentDate: new Date().valueOf(),
   store: [],
   attendancePerDate: [],
 }
}
ionViewDidEnter() {

  jsonp( "https://m.log.school/web/clnd.php?"+this.props.user_id+"=ng_jsonp_callback_0", {  name: 'ng_jsonp_callback_0' }, (error, data) => {
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
  console.log(date.getDate());
  var att = new Array;
  this.state.store.forEach(el => {
    var newDate = new Date(el.start);
    if(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).valueOf() === date.valueOf()) {
      att.push(el)
    }
  })
  this.setState((state) => {
    // Важно: используем `state` вместо `this.state` при обновлении.
    return {attendancePerDate: att}
  });

  // this.setState({ attendancePerDate: att });
  console.log(this.state.attendancePerDate)
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
          <Calendar onClickDay={e => { this.dateChanged(e)}} view={'month'} value={new Date(this.state.currentDate)}/>
            <IonCard>
            <IonList>
          {
            this.state.attendancePerDate.length > 0 ?
            (this.state.attendancePerDate.map((el, i) => {
              var text = el.text;
              var date = new Date(el.start).getDate();
              console.log(date)
              console.log(text)
              return (
                <IonItem key={i}>
                  <IonLabel slot="start">
                    {date}
                  </IonLabel>
                  <IonLabel>
                  {text.replace(/<\/?[^>]+>/g,'')}
                  </IonLabel>
                </IonItem>)
            })) : (

                <IonLabel>
                Нет событий
                </IonLabel>

            )
          }
          </IonList>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Tab3Page);
