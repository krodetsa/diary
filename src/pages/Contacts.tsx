import React from 'react';
import {
  IonList,
} from '@ionic/react';
interface IMyComponentProps {
};

interface IMyComponentState {
showAlert: boolean
};

class Contacts extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: Readonly<IMyComponentProps>) {
    super(props);
    this.state = {
      showAlert: false
    }
  }
  render() {
    return(
      <IonList/>
    )
  }
}

export default Contacts
