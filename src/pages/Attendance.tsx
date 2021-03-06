import React from 'react';
import { IonMenuToggle, IonRefresherContent, IonRefresher, IonLoading, IonContent,IonButton,IonModal, IonThumbnail, IonHeader, IonPage, IonTitle, IonToolbar,withIonLifeCycle, IonList, IonItem, IonLabel,IonButtons,IonMenuButton} from '@ionic/react';
import Calendar from './dist/entry.js';
import CalendarSmall from './CalendarSmall';
import { RefresherEventDetail } from '@ionic/core';
import '../theme/Main.css';
import '../theme/attendance.css';
import '../theme/calendar.css';
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
  showLoading: any,
  _disabledDates: any,
};

class Tab3Page extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
  super(props);
  this.state = {
    showLoading: false,
    timestamp: moment(),
    currentDate: new Date().valueOf(),
    store: [],
    attendancePerDate: [],
    disabledDates: [],
    showModal: false,
    _disabledDates: [],
  }
}
todayRefresher = (event: CustomEvent<RefresherEventDetail>) => {
this.updateToday();
  setTimeout(() => {
    event.detail.complete();
  }, 2000);
}
updateToday = () => {
  sendPost({
      "aksi":"getPass",
      "type": this.props.type,
      "first_date": this.state.timestamp.unix(),
      "range":"60",
      "user_id": this.props.user_id
  })
  .then(res => {
    console.log(res)
    var att = new Array();
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
            let arr = this.state._disabledDates;
            arr.push(new Date(localTime));
            this.setState((state) => {
              // Важно: используем state вместо this.state при обновлении для моментального рендеринга
              return {_disabledDates: arr}
            });
            // this.disabledDates.push(new Date(localTime));
          })
          this.setState(() => {
            return {disabledDates: this.state._disabledDates}
          });
  }).then(()=>{
    this.setState(() => {
      return {showLoading: !this.state.showLoading}
    });
    let date = this.state.currentDate;
    this.setState({ currentDate: date.valueOf() });
    var att = new Array();
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
      return {attendancePerDate: att, showLoading: !this.state.showLoading}
    });
  })
  .catch(function (error) {
    console.log(error);
  })
  console.log('updated')
}
disabledDates = new Array();

ionViewWillEnter() {
 this.updateToday();
}
setShowModal= () => {
  this.setState((state) => {
    return {showModal: !this.state.showModal};
  });
};
dateChanged = (e: any)  => {
  this.setState({ currentDate: e.valueOf() });
  var att = new Array();
  var dateString = moment(e).format("MM/DD/YYYY");
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
setShowLoading = () => {
  this.setState(() => {
    // Важно: используем state вместо this.state при обновлении для моментального рендеринга
    return {showLoading: !this.state.showLoading}
  });
}
  render() {
    return (
      <>
      <IonPage>
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
        <IonRefresher slot="fixed" onIonRefresh={(event) => this.todayRefresher(event)}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <CalendarSmall
        line={i18next.t('Нет событий')}
        setShowModal={this.setShowModal}
        currentDate={this.state.currentDate}
        attendancePerDate={this.state.attendancePerDate}
        />
        <IonModal isOpen={this.state.showModal}>
          <Calendar
          minDetail={"month"}
          value={new Date(this.state.timestamp)}
          view={'month'}
          onClickDay= {
            ( event: any) =>  { this.dateChanged( event)}
          }
          tileDisabled = {
            ({date, view}) =>
              (view === 'month') &&
              this.state._disabledDates.some(disabledDate =>
                moment(disabledDate).format('MM.DD.YYYY') === moment(date).format('MM.DD.YYYY')
                )

          }
          // tileDisabled={
          //   ({date, view}) =>
          //   (view === 'month') && // Block day tiles only
          //   this.disabledDates.some(disabledDate =>
          //     date.getFullYear() === disabledDate.getFullYear() &&
          //     date.getMonth() === disabledDate.getMonth() &&
          //     date.getDate() === disabledDate.getDate()
          //   )
          // }
           />
          <IonButton className='calendarButton' expand="full" onClick={() => this.setShowModal()}>{i18next.t('Закрыть')}</IonButton>
        </IonModal>
        <IonLoading
            isOpen={this.state.showLoading}
            onDidDismiss={() => this.setShowLoading()}
            message={i18next.t('Загрузка')}
          />
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
