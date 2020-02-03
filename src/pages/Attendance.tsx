import React from 'react';
import { IonRouterOutlet,IonMenuToggle, IonContent,IonButton,IonModal, IonThumbnail, IonHeader, IonPage, IonTitle, IonToolbar,withIonLifeCycle, IonList, IonItem, IonLabel,IonButtons,IonMenuButton} from '@ionic/react';
import Calendar from 'react-calendar';
import CalendarSmall from './CalendarSmall';
import '../theme/Main.css';
import '../theme/attendance.css';
import Menu from './Menu'
import i18next from "i18next";

// import axios from 'axios';
// const jsonp = require('jsonp');
import sendPost from '../axios.js'
const moment = require('moment');

interface IMyComponentProps {
user_id: string,
type: string,
skey: string,
};

interface IMyComponentState {
  currentDate: any,
  store: any,
  attendancePerDate: any,
  disabledDates: any,
  showModal: boolean,
  timestamp: any,
};

class Tab3Page extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
    timestamp: moment(),
    currentDate: new Date().valueOf(),
    store: [],
    attendancePerDate: [],
    disabledDates: [],
    showModal: false,
  }
}

disabledDates = new Array;
ionViewWillEnter() {
  sendPost({
    // method: 'post',
    // url: 'https://www.log.school/web/controllers/data.php',
      "aksi":"getpass",
      "type": this.props.type,
      "first_date": this.state.timestamp.unix(),
      "range":"60",
      "user_id": parseInt(this.props.user_id, 10),
      "key": this.props.skey

  })
  .then(res => {
    var att = new Array;
          res.data.data.forEach(el => {
            att.push({
              start: el.time,
              text: el.text,
              name: el.name,
              color: el.color,
            })
          })
          this.setState({store : att});
          this.state.store.forEach(el => {
            var stillUtc = moment.unix(el.start).toDate();
            var localTime = moment(stillUtc).local().format('YYYY, MM, DD');
            this.disabledDates.push(new Date(localTime));
          })
          this.setState(() => {
            // Важно: используем state вместо this.state при обновлении для моментального рендеринга
            return {disabledDates: this.disabledDates}
          });
  })
  .catch(function (error) {
    console.log(error);
  })
}
setShowModal=() => {
  this.setState((state) => {
    return {showModal: !this.state.showModal}
  });
};
dateChanged = date => {
  this.setState({ currentDate: date.valueOf() });
  var att = new Array;
  var dateString = moment(date).format("MM/DD/YYYY");
  this.state.store.forEach(el => {
    var stillUtc = moment.unix(el.start).toDate();
    var localTime = moment(stillUtc).local().format('MM/DD/YYYY');
    if(moment(dateString).isSame(localTime, 'day')) {
      att.push({
        start: el.start,
        text: el.text,
        name: el.name,
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
      <>
      <IonPage>
      <Menu/>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
            <IonMenuToggle>
              <IonMenuButton auto-hide={true}/>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>{i18next.t('Посещаемость')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <CalendarSmall
        setShowModal={this.setShowModal}
        currentDate={this.state.currentDate}
        attendancePerDate={this.state.attendancePerDate}
        />
        <IonModal isOpen={this.state.showModal}>
          <Calendar
                  minDetail={"month"}
          value={new Date(this.state.timestamp)}
          view={'month'}
          onClickDay={e => { this.dateChanged(e)}}
          tileDisabled={
            ({date, view}) =>
            (view === 'month') && // Block day tiles only
            this.disabledDates.some(disabledDate =>
              date.getFullYear() === disabledDate.getFullYear() &&
              date.getMonth() === disabledDate.getMonth() &&
              date.getDate() === disabledDate.getDate()
            )
          }
           />
          <IonButton expand="full" onClick={() => this.setShowModal()}>{i18next.t('Закрыть')}</IonButton>
        </IonModal>

            <IonList>
          {
            this.state.attendancePerDate.length > 0 ?
            (this.state.attendancePerDate.map((el, i) => {
              var text = el.text;
              var name = el.name;
              var nameColor = {
                color: el.color,
              };
              var stillUtc = moment.unix(el.start).toDate();
              var localTime = moment(stillUtc).local().format('HH:mm');
              return (
                <IonItem key={i}>
                  <IonThumbnail slot="start">
                    <div className="dateStamp">
                      <p className="datestamp-timestamp">{localTime}</p>
                      <p>{text}</p>
                    </div>
                  </IonThumbnail>
                  <IonLabel style={nameColor}>
                    {name}
                  </IonLabel>
                </IonItem>)
            })) : (

                <IonItem>
                {i18next.t('Нет событий')}
                </IonItem>

            )
          }
          </IonList>
        </IonContent>
      </IonPage>


      </>
    );
  }
};

export default withIonLifeCycle(Tab3Page);
