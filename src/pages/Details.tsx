import React from 'react';
import {IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonCard} from '@ionic/react';
import {RouteComponentProps} from 'react-router';

interface DogDetailPageProps extends RouteComponentProps<{
    breed: string;
    image: string;
}> {
}

const Details: React.FC<DogDetailPageProps> = ({match}) => {

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
            </IonContent>
        </IonPage>
    );

    function renderDog() {
        if (!match || !match.params || !match.params.breed || !match.params.image) {
            return undefined;
        }

        return <IonCard>
            <div>
                <img src={`https://images.dog.ceo/breeds/${match.params.breed}/${match.params.image}`} alt={`Dog ${match.params.image}`}/>
            </div>
        </IonCard>
    }
};

export default Details;
