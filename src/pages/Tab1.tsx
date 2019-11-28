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
import {logoIonic} from 'ionicons/icons';
import React, {useState} from 'react';
import './Tab1.css';
import {Dog} from '../models/dog';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Header from '../components/header/Header';
import {log} from 'util';

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
            <IonContent>
                <main>
                    <Header title="Welcome"></Header>

                    <IonCard className="welcome-card">
                        <div className="welcome-card-container">
                            {renderDog()}
                        </div>
                        <IonCardHeader>
                            <IonCardSubtitle>So much doggos <IonIcon src="/assets/icon/wooof-paw.svg"></IonIcon></IonCardSubtitle>
                            <IonCardTitle>Welcome to Wooof</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>
                                An application to browse the internet's biggest collection of open source dog pictures.
                            </p>
                        </IonCardContent>
                    </IonCard>

                    <IonList lines="none" className="welcome-navigation ion-no-padding ion-padding-top">
                        <IonListHeader>
                            <IonLabel>Navigate</IonLabel>
                        </IonListHeader>
                        <IonItem routerLink="/tab2">
                            <div slot="start"><IonIcon src="/assets/icon/wooof-paw.svg"></IonIcon></div>
                            <IonLabel>Browse doggos</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/tab2">
                            <div slot="start"><FontAwesomeIcon icon={["fas", "heart"]} size="1x"/></div>
                            <IonLabel>Your favorites</IonLabel>
                        </IonItem>
                    </IonList>

                    <IonList lines="none" className="welcome-navigation ion-no-padding">
                        <IonListHeader>
                            <IonLabel>Open Source</IonLabel>
                        </IonListHeader>
                        <IonItem href="https://dog.ceo/dog-api/" target="_blank">
                            <div slot="start"><FontAwesomeIcon icon={["fas", "database"]} size="1x"/></div>
                            <IonLabel>Dog pictures API</IonLabel>
                        </IonItem>
                        <IonItem href="https://github.com/peterpeterparker/wooof" target="_blank">
                            <div slot="start"><FontAwesomeIcon icon={["fab", "github"]} size="1x"/></div>
                            <IonLabel>Application source code</IonLabel>
                        </IonItem>
                    </IonList>

                    <IonLabel className="ion-padding">Developed by <a href="https://daviddalbusco.com" target="_blank">David Dal Busco</a>.</IonLabel>
                </main>
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
