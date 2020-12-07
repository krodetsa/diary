import React from 'react';
import Calendar from './dist/entry.js';
import i18next from "i18next";
import {
  IonList,
  IonContent,
  IonButtons,
  IonModal,
  IonHeader,
  IonButton,
  IonToast,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonFabButton,
  IonPage,
  IonCheckbox,
  IonTitle,
  IonLabel,
  IonItem,
  IonToolbar,
  IonMenuToggle,
  IonMenuButton,
  withIonLifeCycle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
IonCardTitle,
IonInput
 } from '@ionic/react';
// import axios from 'axios';
import sendPost from '../axios.js'
import { add, chevronDown, people, time} from 'ionicons/icons';
import '../theme/messages.css';
import '../theme/calendar.css';
import '../theme/Main.css';
import { RefresherEventDetail } from '@ionic/core';
import CalendarSmall from './CalendarSmall';
import NewMessage from './NewMessage';
const moment = require('moment');
interface IMyComponentProps {
  user_id: string,
  type: string,
}
interface IMyComponentState {
  toastShow: boolean,
  showAlert1:boolean,
  timestamp: any,
  classesCount: any,
  classesClear: any,
  showСalendar: any,
  showСlasslist: any,
  totalClasses: any,
  currentClass: any,
  classesMulti: any,
  studentsInClass: any,
  nextButton: any,
  studentsSingleSelected: any,
  studentsMultiSelected: any,
  newMessageModal: boolean,
  currentDate: any,
  store: any,
  showModal: boolean,
  attendancePerDate: any,
  disabledDates: any,
  searchArr: any,
  allSchool: boolean,
  recent: any,
  parentsHide: boolean
};
class Messages extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      toastShow: false,
      timestamp: moment(),
      showAlert1: false,
      currentDate: new Date().valueOf(),
      currentClass: '',
      studentsInClass: [],
      showСlasslist: false,
      classesCount: [],
      totalClasses: [],
      classesClear: [],
      classesMulti: [],
      showСalendar: false,
      nextButton: false,
      studentsSingleSelected: [],
      studentsMultiSelected: [],
      newMessageModal: false,
      store: [],
      showModal: false,
      attendancePerDate: [],
      disabledDates: [],
      searchArr: [],
      recent:[],
      allSchool: false,
      parentsHide: false
    }
  }

  searchValue = '';
  dateChanged = date => {
    this.setState({ currentDate: date.valueOf() });
    var att = new Array();
    var dateString = moment(date).format("MM/DD/YYYY");
    this.state.store.forEach(el => {
      var stillUtc = moment.unix(el.start).toDate();
      var localTime = moment(stillUtc).local().format('MM/DD/YYYY');
      if(moment(dateString).isSame(localTime, 'day')) {
        att.push({
          start: el.start,
          message_id: el.message_id,
          text: el.message_text,
          message_sender: el.message_sender,
          recipients_names: el.recipients_names,
          group_type_id: el.group_type_id,
          group_message: el.group_message,
          group_name: el.group_name,
          name: el.name,
          recipients: el.recipients
        })
      }
    })
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return { attendancePerDate: att.reverse() }
    });
    this.showСalendar();
  }
  disabledDates = new Array();
  getMessages = () => {
    let aksi = ""
    if(this.props.type === '3'){
      aksi = "getTeacherMessages"
    } else {
      aksi = "getMessages"
    }
      sendPost({
          "aksi":aksi,
          "first_date": moment().unix().toString(),
          "range":"100",
          "is_global": false
      })

      .then(res => {
        var att = new Array();
              res.data.data.messages.forEach(el => {
                let id;
                let name;
                if (el.group_type_id === 1 && this.props.type === '3') {
                  id = el.recipients.replace(/^(.*?):.*$/, '$1');
                  id = id.replace(/["{}]/g, '');
                  name = el.recipients.split(':')[1].split(',')[0];
                  name = name.replace(/["{}]/g, '');
                  // let str = el.recipients.replace(/\s:\.([\d\w\W]*)/g, '');
                  // console.log(el.recipients.replace(/["{}]/g, '').split(","))
                }
                att.push({
                  start: el.message_time,
                  message_id: el.id,
                  message_text: el.message_text,
                  message_sender: el.name_sender,
                  group_message: el.is_global,
                  recipients_names: el.recipients_names,
                  group_type_id: el.group_type_id,
                  group_name: el.group_name,
                  id: el.recipients === null ? null: id,
                  nameRes: el.recipients === null ? null: name,
                  name: el.name,
                  recipients: el.recipients
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
      }).then(()=> {

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
              message_id: el.message_id,
              text: el.message_text,
              message_sender: el.message_sender,
              group_message: el.group_message,
              recipients_names: el.recipients_names,
              group_type_id: el.group_type_id,
              group_name: el.group_name,
              name: el.name,
              recipients: el.recipients
            })
          }
        })
        this.setState(() => {
          return {attendancePerDate: att.reverse()}
        });
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  ionViewWillEnter() {
    this.getMessages();
  }
  doRefresh(event: CustomEvent<RefresherEventDetail>) {
  this.getMessages();
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }
  clearData = () => {
    this.setState(() => {
      return {
        studentsSingleSelected: [],
        studentsMultiSelected: [],
      }
    });
    this.getMessages();
  }
  closeMessageModal = () => {
      this.setState(
        {
          studentsMultiSelected: [],
          studentsSingleSelected: [],
          newMessageModal: false,
          showСlasslist: false,
          showAlert1: false,
          searchArr: [],
          toastShow: true,
          allSchool: false
        }
      )
  }
  newMessageModal = () => {
    if(this.state.studentsMultiSelected.length > 0) {
      this.setState({studentsMultiSelected: []})
    }
    this.setState({ showAlert1: !this.state.showAlert1 });
    this.setState({ searchArr: [] });
    //запрос списка классов
    if(this.state.showAlert1 !== true) {
      sendPost({
          "aksi": "getClasses",
      })
      .then(res => {
        if(res.data.status === 0) {
          this.setState({ totalClasses: res.data.data.class });
        }
      })
    }

  };
  showСalendar = () => {
    this.setState((state) => {
      return {showСalendar: !this.state.showСalendar}
    });
  };
  openRecent = () => {
    let arr = this.state.store;
    let ar = new Array;

    arr.forEach((el,i) => {
      if (el.id !== null && i < 7) {
        if (ar.length === 0) {
            ar.push({ id: +el.id, name: el.nameRes });
        } else {
          let found = ar.find( ({ id }) => id == +el.id );
          if (found === undefined) {
              ar.push({ id: +el.id, name: el.nameRes });
              this.setState({parentsHide: true})
          }
        }
      };
    });
    this.setState({studentsInClass: ar});
    this.showСlasslist();
  }
  openSingle = () => {
    this.setState({parentsHide: false});
    if(this.state.classesCount.length > 0){
      let arr = this.state.classesClear;

    this.setState(() => {
      return {classesCount: arr}
    });
  } else {
    this.setState(() => {
      return {classesCount: this.state.totalClasses}
    });
    }
  }
  openMulti = () => {
    if(this.state.classesMulti.length > 0){
      let arr = this.state.classesClear;
    this.setState(() => {
      return {classesMulti: arr}
    });
  } else {
    this.setState(() => {
      return {classesMulti: this.state.totalClasses}
    });
    }
  }
  showСlasslist = () => {
    if(this.state.studentsSingleSelected.length > 0) {
      this.setState({studentsSingleSelected: []})
    }
    this.setState(() => {
      return {showСlasslist: !this.state.showСlasslist}
    });
  }
  getClassList = (id,title) => {
    sendPost({
        "aksi": "getClassList",
        // "user_id": this.props.user_id.toString(),
        "class_id": id.toString()
    })
    .then(res => {
      this.setState(() => {
        // Важно: используем state вместо this.state при обновлении для моментального рендеринга
        return {studentsInClass: res.data.data.students, currentClass: title, showСlasslist: !this.state.showСlasslist}
      });
      // this.showСlasslist();
    })
  }

  classMultiSelected = (id) => {

    var newArr = this.state.studentsMultiSelected;
    if (newArr.indexOf( id ) === -1) {
      newArr.push(id)
    } else {
      newArr.splice(newArr.indexOf( id ), 1);
    }
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {studentsMultiSelected : newArr}
    });
  }
  classSingleSelected = (id) => {
    var newArr = this.state.studentsSingleSelected;
    if (newArr.indexOf( id ) === -1) {
      newArr.push(id);
    } else {
      newArr.splice(newArr.indexOf( id ), 1);
    }

    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {studentsSingleSelected : newArr}
    });
  }
  showNewMessageModal = () => {
    if(this.state.studentsSingleSelected.length > 0 && this.state.newMessageModal === true) {
      this.setState({
        studentsSingleSelected: [],
        showAlert1: !this.state.showAlert1,
        showСlasslist: !this.state.showСlasslist,
        classesCount: [],
      })
    }
    if(this.state.studentsMultiSelected.length > 0 && this.state.newMessageModal === true) {
      this.setState({
        studentsMultiSelected: [],
        showAlert1: !this.state.showAlert1,
        classesCount: [],
        classesMulti: [],
      })
    }
    this.setState({newMessageModal: !this.state.newMessageModal})
  }
  inputSearch = (ev) => {
    let arr = this.state.totalClasses;
    arr.forEach(el => {
      var arr = new Array;
      if(ev != "" && el.class_info.includes(ev.toUpperCase())){
        arr.push(el);
        this.setState(() => {
          // Важно: используем state вместо this.state при обновлении для моментального рендеринга
          return {searchArr: arr}
        });
      } else if (ev === "") {
        this.setState(() => {
          // Важно: используем state вместо this.state при обновлении для моментального рендеринга
          return {searchArr: []}
        });
      }
    });
  }
  messageToAll = () => {
    this.showNewMessageModal();
    this.setState({allSchool: true})
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuToggle>
                <IonMenuButton auto-hide={true}/>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>{i18next.t("Сообщения")}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(event) => this.doRefresh(event)}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <CalendarSmall
          line={i18next.t('Нет сообщений')}
          setShowModal={this.showСalendar}
          currentDate={this.state.currentDate}
          attendancePerDate={this.state.attendancePerDate}
          />
          {
              this.state.attendancePerDate.length > 0 ?
              (this.state.attendancePerDate.map((el, i) => {
                var stillUtc = moment.unix(el.start).toDate();
                var localTime = moment(stillUtc).local().format('HH:mm');
                var localDate = moment(stillUtc).local().format('DD.MM.YY');
                var whom = "";
                if(el.group_type_id === 4) {
                  whom = i18next.t('Все_ученики');
                } else if (el.group_type_id === 2) {
                  whom = el.group_name;
                } else if (el.recipients !== undefined) {
                  //let check = /^(?=.*[0-9])(?=\S+$).{5,}$/;
                  let str = el.recipients.replace(/["{}:0-9]/g, '');
                  str = str.replace(/,/g, ',  ')
                  whom = str;
                } else {
                  whom = el.name;
                }
                return (
                  <IonCard key={i}>
                    <IonCardHeader className={'message-header'}>
                      <div className={'message-header-container'}>
                        <IonCardSubtitle color={"primary"}>{localDate} | {localTime}</IonCardSubtitle>
                      </div>
                      <IonCardTitle className={'teacher-name'}>{this.props.type != '3' && el.message_sender}</IonCardTitle>
                      <p className={'recipients'}>{i18next.t('Получатели')}: { whom }</p>
                    </IonCardHeader>
                    <IonCardContent className={'message-content'}>
                      {el.text}
                    </IonCardContent>
                  </IonCard>
                )
              })) : (
                  <IonItem className={'padding'}>
                  {i18next.t('Нет сообщений')}
                  </IonItem>
              )
          }


        {/* модальное окно "личное/групповое сообщение */}
        </IonContent>
        <IonModal isOpen={this.state.showAlert1}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{i18next.t('Создать сообщение')}</IonTitle>
              <IonButtons slot="end">
                <IonButton fill="clear" onClick={()=> this.newMessageModal()}>{i18next.t('Закрыть')}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
            <IonItem>
              <IonInput
                placeholder={i18next.t('Поиск по классам')}
                onIonChange={ev =>
                              this.inputSearch((ev.target as any).value)
                            }>
              </IonInput>
            </IonItem>
            { this.state.searchArr.map((el , i)=> { return (

              <IonItem className={'with-padding'} onClick={() => this.getClassList(el.id, el.class_info)} key={ ++i}>
                <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                <IonIcon slot={'end'} icon={chevronDown}></IonIcon>
              </IonItem>
            ) }) }
              <IonItem onClick={this.openSingle}>
                <IonLabel>{i18next.t('Личное сообщение')}</IonLabel>
                <IonIcon slot={'end'} icon={add}></IonIcon>
              </IonItem>
              {this.state.classesCount.length > 0 &&
                <IonItem onClick={this.openRecent}>
                  <IonLabel>{i18next.t('Недавние')}</IonLabel>
                  <IonIcon slot={'end'} icon={time}></IonIcon>
                </IonItem>
              }
              { this.state.recent.map((el , i)=> { return (

                <IonItem className={'with-padding'} onClick={() => this.getClassList(el.id, el.class_info)} key={ el.id}>
                  <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                  <IonIcon slot={'end'} icon={chevronDown}></IonIcon>
                </IonItem>
              ) }) }
              { this.state.classesCount.map((el , i)=> { return (

                <IonItem className={'with-padding'} onClick={() => this.getClassList(el.id, el.class_info)} key={ ++i}>
                  <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                  <IonIcon slot={'end'} icon={chevronDown}></IonIcon>
                </IonItem>
              ) }) }
              <IonItem onClick={this.openMulti}>
                <IonLabel>{i18next.t('Групповое сообщение')}</IonLabel>
                <IonIcon slot={'end'} icon={add}></IonIcon>
              </IonItem>
              { this.state.classesMulti.map(el=> { return (
                <IonItem className={'with-padding'} key={el.class_info}>
                  <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                  <IonCheckbox onClick={() => this.classMultiSelected(el.id)} slot="end" value={el.id} />
                </IonItem>
              ) }) }
              <IonItem onClick={this.messageToAll}>
                <IonLabel>{i18next.t('Сообщение_школе')}</IonLabel>
                <IonIcon slot={'end'} icon={people}></IonIcon>
              </IonItem>
            </IonList>
            { this.state.studentsMultiSelected.length > 0 &&
            <IonFabButton onClick={this.showNewMessageModal} color="primary" className="new-message-button">
              {i18next.t('Далее')}
            </IonFabButton>
            }
          </IonContent>
        </IonModal>
        {/* модальное окно "выбор учеников*/}
        <IonModal isOpen={this.state.showСlasslist}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{this.state.currentClass}</IonTitle>
              <IonButtons slot="end">
                <IonButton fill="clear" onClick={()=> this.showСlasslist()}>{i18next.t('Закрыть')}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          {
            this.state.studentsInClass.map(
              el => { return(
            <IonItem key={el.name}>
              <IonLabel>{el.name}</IonLabel>
              <IonCheckbox onClick={() => this.classSingleSelected(el.id)} slot="end" value={el.name} />
              </IonItem>
                )}
              )
          }
          { this.state.studentsSingleSelected.length > 0 &&
          <IonFabButton onClick={this.showNewMessageModal} color="primary" className="new-message-button">
            {i18next.t('Далее')}
          </IonFabButton>
          }
        </IonContent>
      </IonModal>
        {/*календарь*/}
        <IonModal isOpen={this.state.showСalendar}>
          <Calendar
          minDetail={"month"}
          value={new Date(this.state.timestamp)}
          onClickDay={e => { this.dateChanged(e)}}
          view={'month'}
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
          <IonButton className='calendarButton' expand="full" onClick={() => this.showСalendar()}>{i18next.t('Закрыть')}</IonButton>
        </IonModal>
        {/*новое сообщение*/}
        <NewMessage align-self-end
          parentsHide={this.state.parentsHide}
          allSchool ={this.state.allSchool}
          user_id={this.props.user_id}
          clearData={this.clearData}
          classes={this.state.classesMulti}
          closeMessageModal={this.closeMessageModal}
          single={this.state.studentsSingleSelected}
          multi={this.state.studentsMultiSelected}
          newMessageModal={this.state.newMessageModal}
          showNewMessageModal={this.showNewMessageModal}
          studentsInClass={this.state.studentsInClass}/>
        { this.props.type == "3" &&
        <IonFabButton color="primary" onClick={this.newMessageModal} className="add-message-button">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        }
        <IonToast
        isOpen={this.state.toastShow}
        onDidDismiss={() => this.setState({toastShow: !this.state.toastShow})}
        message={i18next.t('Сообщение отправлено')}
        position="bottom"
        duration={3000}
        buttons={[
          {
            text: `${i18next.t('Закрыть')}`,
            role: 'cancel',
            handler: () => {
              this.setState({toastShow: !this.state.toastShow})
            }
          }
        ]}
      />
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Messages);
