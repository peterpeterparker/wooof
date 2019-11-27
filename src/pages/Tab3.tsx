import React, {useState} from 'react';
import {IonPage, IonContent, useIonViewWillEnter, IonRefresher, IonRefresherContent} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import Header from '../components/header/Header';

import {Plugins} from '@capacitor/core';
import Doggos from '../components/doggos/Doggos';

const {Storage} = Plugins;

const Tab3Page: React.FC = () => {

    const [dogsEven, setDogsEven] = useState<string[]>([]);
    const [dogsOdd, setDogsOdd] = useState<string[]>([]);

    const [disableNav, setDisableNav] = useState<boolean>(false);

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

    async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        await loadData();

        setTimeout(() => {
            event.detail.complete();
            setDisableNav(false);
        }, 500);
    }

    return (
        <IonPage>
            <IonContent>
                <Header title="Favorites"></Header>

                <IonRefresher slot="fixed" onIonRefresh={($event: CustomEvent<RefresherEventDetail>) => doRefresh($event)} onIonPull={() => setDisableNav(true)}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <main>
                    <Doggos routeTab='tab3' dogsEven={dogsEven} dogsOdd={dogsOdd} disableNav={disableNav}></Doggos>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Tab3Page;
