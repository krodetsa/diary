import React from 'react';
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
// import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
interface IMyComponentState {
    auth: any,
    user_id: any,
    type: any,
    name: any
    skey: any,
    notifications: any,
    token: string,
};
interface IMyComponentProps {
}
// const { PushNotifications } = Plugins;
class App extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
      super(props);
      this.state = {
        auth: false,
        user_id: "",
        type: "",
        name: "",
        skey: "",
        notifications: [],
        token: ''
      };
    }
    componentDidMount() {
      // this.push();
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
  //   push() {
  //   // Register with Apple / Google to receive push via APNS/FCM
  //   PushNotifications.register();
  //
  //   // On succcess, we should be able to receive notifications
  //   PushNotifications.addListener('registration',
  //     (token: PushNotificationToken) => {
  //       // alert('Push registration success, token: ' + token.value);
  //       this.setState({token: token.value})
  //     }
  //   );
  //
  //   // Some issue with your setup and push will not work
  //   PushNotifications.addListener('registrationError',
  //     (error: any) => {
  //       alert('Error on registration: ' + JSON.stringify(error));
  //     }
  //   );
  //
  //   // Show us the notification payload if the app is open on our device
  //   PushNotifications.addListener('pushNotificationReceived',
  //     (notification: PushNotification) => {
  //       let notif = this.state.notifications;
  //       notif.push({ id: notification.id, title: notification.title, body: notification.body })
  //       this.setState({
  //         notifications: notif
  //       })
  //       alert(this.state.notifications)
  //     }
  //   );
  // }
    showAuth = (itm: any, id: any, type: any, name: any, key: any) => {
      localStorage.setItem("auth", itm);
      localStorage.setItem("user_id", id);
      localStorage.setItem("type", type);
      localStorage.setItem("name", name);
      localStorage.setItem("key", key);
      localStorage.setItem("lan", "ru");
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
      <>
        {this.state.auth === false ? (
          <Login showAuth={this.showAuth} ></Login>
        ) : (
          <Routing token={this.state.token} skey={this.state.skey} name={this.state.name} user_id={this.state.user_id} type={this.state.type}/>
        )}
      </>
    )
  }
}
export default App;
