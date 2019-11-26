import React from 'react';
import {IonHeader, IonTitle, IonToolbar} from '@ionic/react';

class Header extends React.Component {

    render() {
        return <IonHeader>
            <IonToolbar>
                <IonTitle className="ion-text-uppercase">Wooof</IonTitle>
            </IonToolbar>
        </IonHeader>
    }
}

export default () => (
    <Header/>
)
