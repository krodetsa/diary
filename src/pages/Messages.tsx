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
IonCardTitle
 } from '@ionic/react';
// import axios from 'axios';
import sendPost from '../axios.js'
import { add, arrowDropdown } from 'ionicons/icons';
import '../theme/messages.css';
import { RefresherEventDetail } from '@ionic/core';
import CalendarSmall from './CalendarSmall';
import NewMessage from './NewMessage';
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
  nextButton: any,
  studentsSingleSelected: any,
  studentsMultiSelected: any,
  newMessageModal: boolean,
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
      nextButton: false,
      studentsSingleSelected: [],
      studentsMultiSelected: [],
      newMessageModal: false,
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
    if(this.state.studentsMultiSelected.length > 0) {
      this.setState({studentsMultiSelected: []})
    }
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
    if(this.state.studentsSingleSelected.length > 0) {
      this.setState({studentsSingleSelected: []})
    }
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
    console.log(this.state.studentsMultiSelected)
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
    console.log(this.state.studentsSingleSelected)
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
      })
    }
    this.setState({newMessageModal: !this.state.newMessageModal})
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
                <IonItem className={'with-padding'} key={el.class_info}>
                  <IonLabel className={'with-padding'}>{el.class_info}</IonLabel>
                  <IonCheckbox onClick={() => this.classMultiSelected(el.class_id)} slot="end" value={el.class_id} />
                </IonItem>
              ) }) }
            </IonList>
            { this.state.studentsMultiSelected.length > 0 &&
            <IonFabButton onClick={this.showNewMessageModal} color="primary" className="new-message-button">
              Далее
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
                <IonButton fill="clear" onClick={()=> this.showСlasslist()}>Закрыть</IonButton>
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
            Далее
          </IonFabButton>
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
        {/*новое сообщение*/}
        <NewMessage
          single={this.state.studentsSingleSelected}
          multi={this.state.studentsMultiSelected}
          newMessageModal={this.state.newMessageModal}
          showNewMessageModal={this.showNewMessageModal}
          studentsInClass={this.state.studentsInClass}/>
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
