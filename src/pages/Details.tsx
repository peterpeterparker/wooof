import React from 'react';
import {IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonCard, IonFab, IonFabButton, IonIcon} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import {share} from 'ionicons/icons';
import './Details.css';

import { Plugins } from '@capacitor/core';

const { Share } = Plugins;

interface DogDetailPageProps extends RouteComponentProps<{
    breed: string;
    image: string;
}> {
}

const Details: React.FC<DogDetailPageProps> = ({match}) => {

    async function shareImage() {
        try {
            await Share.share({
                title: 'Wooof',
                text: 'Checkout the cool doggo I found with Wooof',
                url: getImgUrl(),
                dialogTitle: 'Woof Wooof'
            });
        } catch (err) {
            // Whatever
        }
    }

    function getImgUrl(): string {
        return `https://images.dog.ceo/breeds/${match.params.breed}/${match.params.image}`;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tab2"/>
                    </IonButtons>
                    <IonTitle>Detail</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {renderDog()}

                <IonFab className="details-actions">
                    <IonFabButton color="secondary" onClick={() => shareImage()} aria-label="Share">
                        <IonIcon icon={share} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );

    function renderDog() {
        if (!match || !match.params || !match.params.breed || !match.params.image) {
            return undefined;
        }

        return <IonCard>
            <div>
                <img src={getImgUrl()} alt={`Dog ${match.params.image}`}/>
            </div>
        </IonCard>
    }
};

export default Details;
