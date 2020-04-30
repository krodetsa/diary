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
  attendancePerDate: any;
  line: string;
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
  let color = this.props.attendancePerDate.length > 0 ?  "success": "primary";
  return(
    <IonItem className="calendar-small-container">
       <IonNote onClick={() =>
         this.props.setShowModal()
       } className="calendar-date" color="primary" slot="start">
        {moment(this.props.currentDate).local().format('DD.MM')}
       </IonNote>
       <IonLabel>
         <h2 className="calendar-small-h2">{this.props.line}: <IonBadge className="calendar-small-badge" color={color}>{this.props.attendancePerDate.length}</IonBadge></h2>
         <p>{i18next.t('Последнее')}: {
           this.props.attendancePerDate.length > 0 ? this.props.attendancePerDate[0].text : `${'Нет '+this.props.line}`
         }</p>
       </IonLabel>
     </IonItem>
  )
}
}
export default CalendarSmall;
