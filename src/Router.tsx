import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import i18next from "i18next";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonPage,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { time, mail,  home, calendar } from 'ionicons/icons';
import Tab1 from './pages/Main';
import Messages from './pages/Messages';
import Tab3Page from './pages/Attendance';
import TabForTeacher from './pages/ForTeacher';
import AddStudent from './pages/AddStudent';
import Details from './pages/Details';
import Contacts from './pages/Contacts';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Account from './pages/Account';
import Menu from './pages/Menu'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
function Routing(props){
    return (
      <IonApp>
      <IonPage>
      <IonReactRouter>
      <Menu type={props.type} user_id={props.user_id}/>
      <IonTabs>
        <IonRouterOutlet id="custom">
          <Route path="/login" render={ () =>  <Login auth={props.auth} showAuth={props.showAuth}/> }/>
          <Route path="/settings" render={() =>  <Settings type={props.type} user_id={props.user_id}/>  } />
          <Route path="/addStudent" render={ () =>  <AddStudent/> }/>
          <Route path="/account" render={ () =>  <Account balance={props.balance} name={props.name}/> }/>
          <Route path="/support" render={ () =>  <Support/> }/>
          <Route path="/schedule" render={ () =>  <Schedule/> }/>
          <Route path="/contacts" render={() =>  <Contacts />  } />
          <Route path="/tab1"  render={() =>  <Tab1 name={props.name} type={props.type}/>  } />
          <Route path="/tab2" render={() => <Messages type={props.type} user_id={props.user_id} />}  />
          {  props.type === "3" ?  <Redirect exact from="/" to="/tab1" /> :  <Redirect exact from="/" to="/1" />
          }
          <Route path="/details" render={() =>  <Details user_id={props.user_id}/>  } />
          <Route path="/tab3" render={() => <Tab3Page skey={props.skey} type={props.type} user_id={props.user_id} /> } />
          {  props.type === "1" ?  <Redirect from="/" to="/tab1" /> : <Redirect exact from="/" to="/tab1" />
          }
          <Route path="/forteacher" component={TabForTeacher} />
          {//<Route path="/" render={() =>  <Tab1 name={props.name} type={props.type}/> }  />
        }
        </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>{i18next.t('Главная')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={mail} />
              <IonLabel>{i18next.t('Сообщения')}</IonLabel>
            </IonTabButton>
            {/*
              props.type === "1" &&
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={time} />
                <IonLabel>{i18next.t('Посещаемость')}</IonLabel>
              </IonTabButton>
              */
            }
            {/*
              props.type === "3" &&
                <IonTabButton disabled tab="tab4" href="/forteacher">
                  <IonIcon icon={person} />
                  <IonLabel>{i18next.t('Для учителя')}</IonLabel>
                </IonTabButton>
                */
            }
            {/*
              props.type === "1" &&
                <IonTabButton tab="tab5" href="/schedule">
                  <IonIcon icon={calendar} />
                  <IonLabel>{i18next.t('Расписание')}</IonLabel>
                </IonTabButton>
                */
            }

          </IonTabBar>
          </IonTabs>
      </IonReactRouter>
      </IonPage>
    </IonApp>
    )
}
export default Routing;
