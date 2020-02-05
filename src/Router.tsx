import React from 'react';
import { Route } from 'react-router-dom';
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
import { time, mail, person, home } from 'ionicons/icons';
import Tab1 from './pages/Main';
import Messages from './pages/Messages';
import Tab3Page from './pages/Attendance';
import TabForTeacher from './pages/ForTeacher';
import Details from './pages/Details';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
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
interface IMyComponentState {
};
interface IMyComponentProps {
  user_id: string,
  type: string,
  name: string,
  skey: string,
  token: string,
}
class Routing extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
      };
    }
  render() {
    return (
      <IonApp>
      <IonPage>
      <Menu/>
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id="custom">
          <Route path="/settings" render={() =>  <Settings />  } />
          <Route path="/contacts" render={() =>  <Contacts />  } />
          <Route path="/tab1" render={() =>  <Tab1 name={this.props.name} />  } />
          <Route path="/tab2" render={() => <Messages type={this.props.type} user_id={this.props.user_id} />} exact={true} />
          <Route path="/forteacher/details" component={Details} />
          <Route path="/tab3" render={() => <Tab3Page skey={this.props.skey} type={this.props.type} user_id={this.props.user_id} /> } />
          <Route path="/forteacher" component={TabForTeacher} />
          <Route path="/" render={() =>  <Tab1 name={this.props.name} />  }  />
        </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton disabled tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>{i18next.t('Главная')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={mail} />
              <IonLabel>{i18next.t('Сообщения')}</IonLabel>
            </IonTabButton>
            {
              this.props.type === "1" &&
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={time} />
                <IonLabel>{i18next.t('Посещаемость')}</IonLabel>
              </IonTabButton>
            }
            {
              this.props.type === "3" &&
                <IonTabButton disabled tab="tab4" href="/forteacher">
                  <IonIcon icon={person} />
                  <IonLabel>{i18next.t('Для учителя')}</IonLabel>
                </IonTabButton>
            }

          </IonTabBar>
          </IonTabs>

      </IonReactRouter>
      </IonPage>
    </IonApp>
    )
  }
}
export default Routing;
