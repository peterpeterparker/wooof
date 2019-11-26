import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonCard, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Dogs} from '../models/dog';
import './Tab2.css';

const Tab2: React.FC = () => {

    const [hasError, setErrors] = useState(false);
    const [dogs, setDogs] = useState<Dogs | undefined>(undefined);

    async function fetchData() {
        const res: Response = await fetch('https://dog.ceo/api/breeds/image/random/50');
        res
            .json()
            .then((res) => {
                setDogs(res);
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
                    <IonTitle>Tab Two</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="doggos-container">
                    {renderDogs()}
                </div>
            </IonContent>
        </IonPage>
    );

    function renderDogs() {
        if (!dogs || !dogs.message || dogs.message.length <= 0 || hasError) {
            return undefined;
        }

        return dogs.message.map((dogImgUrl: string, i: number) => {
            return <IonCard key={i}>
                <img src={dogImgUrl} alt={`A random dog with index ${i}`}/>
            </IonCard>
        });
    }
};

export default Tab2;
