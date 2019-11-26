import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage, useIonViewWillEnter
} from '@ionic/react';
import {book, build, colorFill, grid} from 'ionicons/icons';
import React, {useState} from 'react';
import './Tab1.css';
import {Dog} from '../models/dog';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Header from '../components/header/header';

const Tab1: React.FC = () => {

    const [hasError, setErrors] = useState(false);
    const [dog, setDog] = useState<Dog | undefined>(undefined);

    async function fetchData() {
        const res: Response = await fetch('https://dog.ceo/api/breeds/image/random');
        res
            .json()
            .then((res) => {
                setDog(res)
            })
            .catch(err => setErrors(err));
    }

    useIonViewWillEnter(async () => {
        await fetchData();
    });

    return (
        <IonPage>
            <Header></Header>

            <IonContent>

                <IonCard className="welcome-card">
                    <div className="welcome-card-container">
                        {renderDog()}
                    </div>
                    <IonCardHeader>
                        <IonCardSubtitle>So much doggos <FontAwesomeIcon icon={["fas", "paw"]} size="1x"/></IonCardSubtitle>
                        <IonCardTitle>Welcome to Wooof</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            An application to browse the internet's biggest collection of open source dog pictures.
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
            </IonContent>
        </IonPage>
    );

    function renderDog() {
        if (!dog || hasError) {
            return undefined;
        }

        return <img src={dog.message} alt="A random dog"/>
    }
};

export default Tab1;
