import React, {useEffect, useState} from 'react';
import {IonContent, IonPage, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonLabel} from '@ionic/react';
import {Dogs} from '../models/dog';
import {pickerController} from '@ionic/core';
import {close} from 'ionicons/icons';

import './Tab2.css';

import Header from '../components/header/Header';
import {BreedsService} from '../services/breeds/breeds.service';
import {PickerColumnOption} from '@ionic/core/dist/types/components/picker/picker-interface';
import Doggos from '../components/doggos/Doggos';

const Tab2: React.FC = () => {

    const [hasError, setErrors] = useState(false);

    const [dogsEven, setDogsEven] = useState<string[]>([]);
    const [dogsOdd, setDogsOdd] = useState<string[]>([]);

    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

    const [breed, setBreed] = useState<string | undefined>(undefined);

    async function fetchData(reset: boolean) {
        const even: string[] = reset ? [] : dogsEven;
        const odd: string[] = reset ? [] : dogsOdd;

        const url: string = breed ? `https://dog.ceo/api/breed/${breed.split(' ').join('/')}/images/random/20` : 'https://dog.ceo/api/breeds/image/random/20';

        const res: Response = await fetch(url);
        res
            .json()
            .then(async (res) => {
                const dogs: Dogs = res;

                if (dogs && dogs.message && dogs.message.length > 0) {
                    setDogsEven([...even, ...dogs.message.filter((_a, i) => i % 2)]);
                    setDogsOdd([...odd, ...dogs.message.filter((_a, i) => !(i % 2))]);

                    setDisableInfiniteScroll(dogs.message.length < 20);
                } else {
                    setDisableInfiniteScroll(true);
                }
            })
            .catch(err => setErrors(err));
    }

    useEffect( () => {
        fetchData(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breed]);

    async function searchNext(e: CustomEvent<void>) {
        await fetchData(false);

        (e.target as HTMLIonInfiniteScrollElement).complete();
    }

    async function filterDogs() {

        const breeds: string[] | undefined = await BreedsService.getInstance().getBreeds();

        if (breeds && breeds.length > 0) {
            const picker: HTMLIonPickerElement = await pickerController.create({
                columns: [{
                    name: 'breed',
                    options: ['no filter', ...breeds].map((breed: string) => {
                        return {
                            text: breed,
                            value: breed
                        } as PickerColumnOption
                    })
                }],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        handler: (selectedValue) => {
                            setBreed(selectedValue && selectedValue.breed.value !== 'no filter' ? selectedValue.breed.value : undefined);
                        }
                    }
                ]
            });

            await picker.present();
        }
    }

    return (
        <IonPage>
            <IonContent>
                <Header title="Doggos" filter={true} filterAction={filterDogs}></Header>

                <main>
                    {renderBreed()}

                    {renderDogs()}

                    <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                                       onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                        <IonInfiniteScrollContent
                            loadingText="Loading more good doggos...">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </main>
            </IonContent>
        </IonPage>
    );

    function renderDogs() {
        if (hasError) {
            return undefined;
        }

        return <Doggos routeTab='tab2' dogsEven={dogsEven} dogsOdd={dogsOdd}></Doggos>;
    }

    function renderBreed() {
        if (!breed) {
            return undefined;
        }

        return <div className="chips ion-margin">
            <button onClick={() => setBreed(undefined)}>
                <IonIcon icon={close}></IonIcon>
            </button>

            <IonLabel>{breed}</IonLabel>
        </div>
    }
};

export default Tab2;
