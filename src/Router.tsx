import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { time, mail, person, home } from 'ionicons/icons';
import Tab1 from './pages/Main';
import Messages from './pages/Messages';
import Tab3 from './pages/Attendance';
import TabForTeacher from './pages/ForTeacher';
import Details from './pages/Details';

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
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" render={() => <Messages type={this.props.type} user_id={this.props.user_id} />} exact={true} />
          <Route path="/forteacher/details" component={Details} />
          <Route path="/tab3" render={() => <Tab3 user_id={this.props.user_id} /> } />
          <Route path="/forteacher" component={TabForTeacher} />
          <Route path="/" render={() =>  <Tab1 />  }  />
        </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>Главная</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={mail} />
              <IonLabel>Сообщения</IonLabel>
            </IonTabButton>
            {
              this.props.type === "1" &&
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={time} />
                <IonLabel>Посещаемость</IonLabel>
              </IonTabButton>
            }
            {
              this.props.type === "3" &&
                <IonTabButton tab="tab4" href="/forteacher">
                  <IonIcon icon={person} />
                  <IonLabel>Для учителя</IonLabel>
                </IonTabButton>
            }

          </IonTabBar>
      </IonTabs>
      </IonReactRouter>
    </IonApp>
    )
  }
}
export default Routing;