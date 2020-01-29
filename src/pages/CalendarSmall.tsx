import React from 'react';
import '../theme/Main.css';
import '../theme/calendarsmall.css';
import {
  IonContent,
  IonItem,
  IonBadge,
  IonNote,
  IonAvatar,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
const moment = require('moment');
interface IMyComponentProps {
  currentDate: any,
  setShowModal: any;
  attendancePerDate: any
};

interface IMyComponentState {

};
// {
//   var stillUtc = moment.utc(new Date(el.start)).toDate();
//   var localTime = moment(stillUtc).local().format('YYYY, MM, DD');
//   this.props.currentDate}


class CalendarSmall extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
 }
}
render() {
  console.log(this.props.attendancePerDate)
  return(
    <IonItem className="calendar-small-container">
       <IonNote onClick={() => this.props.setShowModal()} className="calendar-date" color="primary" slot="start">
        {moment(this.props.currentDate).local().format('DD.MM')}
       </IonNote>
       <IonLabel>
         <h2 className="calendar-small-h2">Событий: <IonBadge className="calendar-small-badge" color="primary">{this.props.attendancePerDate.length}</IonBadge></h2>
         <p>Последнее: {
           this.props.attendancePerDate.length > 0 ? this.props.attendancePerDate[this.props.attendancePerDate.length - 1].text.replace(/<\/?[^>]+>/g,'') : "нет событий"
         }</p>
       </IonLabel>
     </IonItem>
  )
}
}
export default CalendarSmall;
