import React from 'react';
import { IonContent,IonButton,IonModal, IonThumbnail, IonHeader, IonPage, IonTitle, IonToolbar,withIonLifeCycle, IonList, IonItem, IonLabel} from '@ionic/react';
import Calendar from 'react-calendar';
import CalendarSmall from './CalendarSmall';
import '../theme/Main.css';
import '../theme/attendance.css';
// import axios from 'axios';
const jsonp = require('jsonp');
const moment = require('moment');

interface IMyComponentProps {
user_id: string,
};

interface IMyComponentState {
  currentDate: any,
  store: any,
  attendancePerDate: any,
  disabledDates: any,
  showModal: boolean
};

class Tab3Page extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
   currentDate: new Date().valueOf(),
   store: [],
   attendancePerDate: [],
   disabledDates: [],
   showModal: false,
 }
}
disabledDates = new Array;
ionViewWillEnter() {
  jsonp( "https://m.log.school/web/clnd.php?"+this.props.user_id+"=ng_jsonp_callback_0", {  name: 'ng_jsonp_callback_0' }, (error, data) => {
      if (error) {
          console.log(error)
      } else {
        // console.log(this.state.currentDate)
        var att = new Array;
        data.forEach(el => {
          att.push({
            start: new Date(el.start),
            text: el.text,
            color: el.color
          })
        })
        this.setState({store : att})
        let disabledDates;
        this.state.store.forEach(el => {
          var stillUtc = moment.utc(new Date(el.start)).toDate();
          var localTime = moment(stillUtc).local().format('YYYY, MM, DD');
          this.disabledDates.push(new Date(localTime));
        })
        this.setState((state) => {
          // Важно: используем state вместо this.state при обновлении для моментального рендеринга
          return {disabledDates: disabledDates}
        });
      }
  });
}
setShowModal=() => {
  this.setState((state) => {
    return {showModal: !this.state.showModal}
  });
};
dateChanged = date => {
  this.setState({ currentDate: date.valueOf() });
  var att = new Array;
  this.state.store.forEach(el => {
    var newDate = new Date(el.start);
    if(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).valueOf() === date.valueOf()) {
      att.push({
        start: new Date(el.start),
        text: el.text,
        color: el.color
      })
    }
  })
  this.setState((state) => {
    // Важно: используем state вместо this.state при обновлении для моментального рендеринга
    return {attendancePerDate: att}
  });
  this.setShowModal();
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
        <CalendarSmall
        setShowModal={this.setShowModal}
        currentDate={this.state.currentDate}
        attendancePerDate={this.state.attendancePerDate}
        />
        <IonModal isOpen={this.state.showModal}>
          <Calendar onClickDay={e => { this.dateChanged(e)}}
          tileDisabled={({date, view}) =>
                    (view === 'month') && // Block day tiles only
                    this.disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}
           view={'month'}
           value={new Date(this.state.currentDate)}
           />
          <IonButton onClick={() => this.setShowModal()}>Закрыть</IonButton>
        </IonModal>

            <IonList>
          {
            this.state.attendancePerDate.length > 0 ?
            (this.state.attendancePerDate.map((el, i) => {
              var text = el.text;
              var stillUtc = moment.utc(el.start).toDate();
              var localTime = moment(stillUtc).local().format('HH:mm');
              return (
                <IonItem key={i}>
                  <IonThumbnail slot="start">
                    <div className="dateStamp">
                      {localTime}
                    </div>
                  </IonThumbnail>
                  <IonLabel>
                  {text.replace(/<\/?[^>]+>/g,'')}
                  </IonLabel>
                </IonItem>)
            })) : (

                <IonItem>
                Нет событий
                </IonItem>

            )
          }
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Tab3Page);
