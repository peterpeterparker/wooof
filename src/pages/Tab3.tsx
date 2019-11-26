import React, {useState} from 'react';
import {IonPage, IonContent, useIonViewWillEnter} from '@ionic/react';
import Header from '../components/header/header';

import {Plugins} from '@capacitor/core';
import Doggos from '../components/doggos/Doggos';

const {Storage} = Plugins;

const Tab3Page: React.FC = () => {

    const [dogsEven, setDogsEven] = useState<string[]>([]);
    const [dogsOdd, setDogsOdd] = useState<string[]>([]);

    async function loadData() {
        const keys = await Storage.keys();

        if (keys && keys.keys && keys.keys.length > 0) {
            const dogs: string[] = keys.keys.map((key) => {
                return `https://images.dog.ceo/breeds/${key.replace(/-([^-]*)$/, `/$1`)}`;
            });

            if (dogs && dogs.length > 0) {
                setDogsEven([...dogs.filter((_a, i) => i % 2)]);
                setDogsOdd([...dogs.filter((_a, i) => !(i % 2))]);
            }
        }
    }

    useIonViewWillEnter(async () => {
        await loadData();
    });

    return (
        <IonPage>
            <Header></Header>
            <IonContent>
                <Doggos routeTab='tab3' dogsEven={dogsEven} dogsOdd={dogsOdd}></Doggos>
            </IonContent>
        </IonPage>
    );
};

export default Tab3Page;
