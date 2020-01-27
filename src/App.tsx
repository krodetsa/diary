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
import Routing from './Router';

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
        {this.state.auth === false ? (
          <Login showAuth={this.showAuth} />
        ) : (
          <Routing/>
        )}
      </IonApp>
    )
  }
}
export default App;
