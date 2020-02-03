import React from 'react';
import '../theme/Main.css';
import '../theme/calendarsmall.css';
import i18next from "i18next";
import {
  IonItem,
  IonBadge,
  IonNote,
  IonLabel,
} from '@ionic/react';
const moment = require('moment');
interface IMyComponentProps {
  currentDate: any,
  setShowModal: any;
  attendancePerDate: any
};

interface IMyComponentState {

};

class CalendarSmall extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
 }
}
render() {
  return(
    <IonItem className="calendar-small-container">
       <IonNote onClick={() => this.props.setShowModal()} className="calendar-date" color="primary" slot="start">
        {moment(this.props.currentDate).local().format('DD.MM')}
       </IonNote>
       <IonLabel>
         <h2 className="calendar-small-h2">{i18next.t('Событий')}: <IonBadge className="calendar-small-badge" color="primary">{this.props.attendancePerDate.length}</IonBadge></h2>
         <p>{i18next.t('Последнее')}: {
           this.props.attendancePerDate.length > 0 ? this.props.attendancePerDate[this.props.attendancePerDate.length - 1].text.replace(/<\/?[^>]+>/g,'') : `${i18next.t('Нет событий')}`
         }</p>
       </IonLabel>
     </IonItem>
  )
}
}
export default CalendarSmall;
