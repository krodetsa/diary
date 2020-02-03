import React from 'react';
import {
  IonApp,
} from '@ionic/react';
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
    auth: any,
    user_id: any,
    type: any,
    name: any
    skey: any,
};
interface IMyComponentProps {
}
class App extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        auth: false,
        user_id: "",
        type: "",
        name: "",
        skey: ""
      };
    }
    componentDidMount() {
      console.log(this)
      const rememberMe = localStorage.getItem('auth') === 'true';
      const lsAuth = rememberMe ? localStorage.getItem('auth') : false;
      const lsUser_id = rememberMe ? localStorage.getItem('user_id') : "";
      const lsType = rememberMe ? localStorage.getItem('type') : "";
      const lsName = rememberMe ? localStorage.getItem('name') : "";
      const lsKey = rememberMe ? localStorage.getItem('key') : "";
      this.setState({
        auth: lsAuth,
        user_id: lsUser_id,
        type: lsType,
        name: lsName,
        skey: lsKey
      });
    }
    showAuth = (itm: any, id: any, type: any, name: any, key: any) => {
      localStorage.setItem("auth", itm);
      localStorage.setItem("user_id", id);
      localStorage.setItem("type", type);
      localStorage.setItem("name", name);
      localStorage.setItem("key", key);
      this.setState({
        auth: itm,
        user_id: id,
        type: type,
        name: name,
        skey:key
      });
    }
  render() {
    return (
      <IonApp>
        {this.state.auth === false ? (
          <Login showAuth={this.showAuth} ></Login>
        ) : (
          <Routing skey={this.state.skey} name={this.state.name} user_id={this.state.user_id} type={this.state.type}/>
        )}
      </IonApp>
    )
  }
}
export default App;
