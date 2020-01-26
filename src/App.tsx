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
import Tab2 from './pages/Messages';
import Tab3 from './pages/Attendance';
import TabForTeacher from './pages/ForTeacher';
import Details from './pages/Details';
import Login from './pages/Login';

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
    auth: boolean,
};
interface IMyComponentProps {
}
class App extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        auth: false,
      };
    }
    showAuth = (itm: boolean) => {
      this.setState({
        auth: itm,
      });
    }
  render() {
    return (
      <IonApp>
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/login" component={ Login } />
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab2/details" component={Details} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/forteacher" component={TabForTeacher} />
          <Route path="/" render={() =>  this.state.auth ? <Tab1 /> : <Login showAuth={this.showAuth} /> }  />
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
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={time} />
              <IonLabel>Посещаемость</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/forteacher">
              <IonIcon icon={person} />
              <IonLabel>Для учителя</IonLabel>
            </IonTabButton>
          </IonTabBar>
      </IonTabs>
      </IonReactRouter>
    </IonApp>
    )
  }
}
export default App;
