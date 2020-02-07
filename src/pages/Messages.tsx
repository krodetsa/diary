import React from 'react';
import Calendar from 'react-calendar';
import i18next from "i18next";
import {
  IonList,
  IonContent,
  IonButtons,
  IonModal,
  IonHeader,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonFabButton,
  IonPage,
  IonCheckbox,
  IonCol,
  IonTitle,
  IonLabel,
  IonItem,
  IonToolbar,
  IonSelect,
  IonMenuToggle,
  IonMenuButton,
  IonSelectOption,
  withIonLifeCycle,
  IonCard,
  IonNote,
  IonCardContent,
  IonRow,
  IonCardHeader,
  IonCardSubtitle,
IonCardTitle
 } from '@ionic/react';
// import axios from 'axios';
import sendPost from '../axios.js'
import { add, arrowDropdown } from 'ionicons/icons';
import '../theme/messages.css';
import { RefresherEventDetail } from '@ionic/core';
import CalendarSmall from './CalendarSmall';
interface IMyComponentProps {
  user_id: string,
  type: string,
}
interface IMyComponentState {
  showAlert1:boolean,
  classesCount: any,
  classesClear: any,
  showСalendar: any,
  showСlasslist: any,
  totalClasses: any,
  currentClass: any,
  classesMulti: any,
  studentsInClass: any,
  classSingleSelected: any,
};
class Messages extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      showAlert1: false,
      currentClass: '',
      studentsInClass: [],
      showСlasslist: false,
      classesCount: [],
      totalClasses: [],
      classesClear: [],
      classesMulti: [],
      showСalendar: false,
      classSingleSelected: [],
    }
  }
  ionViewWillEnter() {
  }
  doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
}
  newMessageModal = () => {
    this.setState({ showAlert1: !this.state.showAlert1 });
    //запрос списка классов
    if(this.state.showAlert1 !== true) {
      sendPost({
          "aksi": "getClasses",
          "user_id": this.props.user_id.toString(),
      })
      .then(res => {
        if(res.data.success === true) {
          this.setState({ totalClasses: res.data.data })
        }
      })
    }

  };
  showСalendar = () => {
    this.setState((state) => {
      return {showСalendar: !this.state.showСalendar}
    });
  };
  openSingle = () => {
    if(this.state.classesCount.length > 0){
      let arr = this.state.classesClear;
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {classesCount: arr}
    });
  } else {
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {classesCount: this.state.totalClasses}
    });
    }
  }
  openMulti = () => {
    if(this.state.classesMulti.length > 0){
      let arr = this.state.classesClear;
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {classesMulti: arr}
    });
  } else {
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {classesMulti: this.state.totalClasses}
    });
    }
  }
  showСlasslist = () => {
    this.setState(() => {
      // Важно: используем state вместо this.state при обновлении для моментального рендеринга
      return {showСlasslist: !this.state.showСlasslist}
    });
  }
  getClassList = (id,title) => {
    sendPost({
        "aksi": "getClassList",
        "user_id": this.props.user_id.toString(),
        "class_id": id.toString()
    })
    .then(res => {
      this.setState(() => {
        // Важно: используем state вместо this.state при обновлении для моментального рендеринга
        return {studentsInClass: res.data.data, currentClass: title, showСlasslist: !this.state.showСlasslist}
      });
      // this.showСlasslist();
    })
  }
  studentsMultiSelected = new Array();
  classMultiSelected = (id) => {
    var newArr = this.studentsMultiSelected;
    if (newArr.indexOf( id ) === -1) {
      newArr.push(id)
    } else {
      newArr.splice(newArr.indexOf( id ), 1);
    }
    this.studentsMultiSelected = newArr;
    console.log(this.studentsMultiSelected)
  }
  studentsSingleSelected = new Array();
  classSingleSelected = (id) => {
    var newArr = this.studentsSingleSelected;
    if (newArr.indexOf( id ) === -1) {
      newArr.push(id)
    } else {
      newArr.splice(newArr.indexOf( id ), 1);
    }
    this.studentsSingleSelected = newArr;
    console.log(this.studentsSingleSelected)
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
            <IonTitle>Сообщения</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <CalendarSmall
          line={'сообщений'}
          setShowModal={this.showСalendar}
          currentDate={[]}
          attendancePerDate={[]}
          />
          <IonCard>
            <IonCardHeader className={'message-header'}>
              <div className={'message-header-container'}>
                <IonCardSubtitle>20.01.20 | 18:03</IonCardSubtitle>
                <IonCardSubtitle>РАССЫЛКА</IonCardSubtitle>
              </div>
              <IonCardTitle className={'teacher-name'}>Имя преподавателя</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className={'message-content'}>
              Keep close to Nature's heart... and break clear away, once in awhile,
              and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader className={'message-header'}>
              <IonCardSubtitle>20.01.20 | 18:03</IonCardSubtitle>
              <IonCardTitle className={'teacher-name'}>Имя преподавателя</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className={'message-content'}>
            Маленькое сообщение.
            </IonCardContent>
          </IonCard>

        {/* модальное окно "личное/групповое сообщение */}
        </IonContent>
        <IonModal isOpen={this.state.showAlert1}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Создать сообщение</IonTitle>
              <IonButtons slot="end">
                <IonButton fill="clear" onClick={()=> this.newMessageModal()}>Закрыть</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem onClick={this.openSingle}>
                <IonLabel>Личное сообщение</IonLabel>
                <IonIcon slot={'end'} icon={add}></IonIcon>
              </IonItem>
              { this.state.classesCount.map(el=> { return (
                <IonItem className={'with-padding'} onClick={() => this.getClassList(el.class_id, el.class_info)} key={ ++this.state.classesCount.length}>
                  <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                  <IonIcon slot={'end'} icon={arrowDropdown}></IonIcon>
                </IonItem>
              ) }) }
              <IonItem onClick={this.openMulti}>
                <IonLabel>Групповое сообщение</IonLabel>
                <IonIcon slot={'end'} icon={add}></IonIcon>
              </IonItem>
              { this.state.classesMulti.map(el=> { return (
                <IonItem className={'with-padding'} key={ ++this.state.classesMulti.length}>
                  <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                  <IonCheckbox onClick={() => this.classMultiSelected(el.class_id)} slot="end" value={el.class_id} />
                </IonItem>
              ) }) }
            </IonList>
          </IonContent>
        </IonModal>
        {/* модальное окно "выбор учеников*/}
        <IonModal isOpen={this.state.showСlasslist}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{this.state.currentClass}</IonTitle>
              <IonButtons slot="end">
                <IonButton fill="clear" onClick={()=> this.showСlasslist()}>Закрыть</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          {
            this.state.studentsInClass.map(
              el => { return(
            <IonItem key={++this.state.studentsInClass.length}>
              <IonLabel>{el.name}</IonLabel>
              <IonCheckbox onClick={() => this.classSingleSelected(el.id)} slot="end" value={el.name} />
              </IonItem>
                )}
              )
          }
        </IonContent>
      </IonModal>
        {/*календарь*/}
        <IonModal isOpen={this.state.showСalendar}>
          <Calendar
                  minDetail={"month"}
          value={new Date()}
          view={'month'}
           />
          <IonButton expand="full" onClick={() => this.showСalendar()}>{i18next.t('Закрыть')}</IonButton>
        </IonModal>

        { this.props.type === "3" &&
        <IonFabButton color="primary" onClick={this.newMessageModal} className="add-message-button">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        }
      </IonPage>
    );
  }
};

export default withIonLifeCycle(Messages);
