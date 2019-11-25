import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {book, build, colorFill, grid} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Tab1.css';
import {Dog} from '../models/dog';

const Tab1: React.FC = () => {

    const [hasError, setErrors] = useState(false);
    const [dogs, setDogs] = useState<Dog | undefined>(undefined);

    async function fetchData() {
        const res: Response = await fetch('https://dog.ceo/api/breeds/image/random');
        res
            .json()
            .then((res) => {
                console.log(res);
                setDogs(res)
            })
            .catch(err => setErrors(err));
    }

    useEffect( () => {
        fetchData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Doggos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="welcome-card">
                    <div className="welcome-card-container">
                        <img src={dogs ? dogs.message : '/assets/shapes.svg'} alt=""/>
                    </div>
                    <IonCardHeader>
                        <IonCardSubtitle>Wooof</IonCardSubtitle>
                        <IonCardTitle>Welcome to Wooof</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Now that your app has been created, you'll want to start building out features and
                            components. Check out some of the resources below for next steps.
                        </p>
                    </IonCardContent>
                </IonCard>

                <IonList lines="none">
                    <IonListHeader>
                        <IonLabel>Resources</IonLabel>
                    </IonListHeader>
                    <IonItem href="https://ionicframework.com/docs/" target="_blank">
                        <IonIcon slot="start" color="medium" icon={book}/>
                        <IonLabel>Ionic Documentation</IonLabel>
                    </IonItem>
                    <IonItem href="https://ionicframework.com/docs/building/scaffolding" target="_blank">
                        <IonIcon slot="start" color="medium" icon={build}/>
                        <IonLabel>Scaffold Out Your App</IonLabel>
                    </IonItem>
                    <IonItem href="https://ionicframework.com/docs/layout/structure" target="_blank">
                        <IonIcon slot="start" color="medium" icon={grid}/>
                        <IonLabel>Change Your App Layout</IonLabel>
                    </IonItem>
                    <IonItem href="https://ionicframework.com/docs/theming/basics" target="_blank">
                        <IonIcon slot="start" color="medium" icon={colorFill}/>
                        <IonLabel>Theme Your App</IonLabel>
                    </IonItem>
                </IonList>

                {hasError}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
