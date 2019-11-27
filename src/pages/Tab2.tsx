import React, {useEffect, useState, useRef} from 'react';
import {IonContent, IonPage, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react';
import {Dogs} from '../models/dog';
import {pickerController} from '@ionic/core';

import Header from '../components/header/Header';
import {BreedsService} from '../services/breeds/breeds.service';
import {PickerColumnOption} from '@ionic/core/dist/types/components/picker/picker-interface';
import Doggos from '../components/doggos/Doggos';

const Tab2: React.FC = () => {

    const refContent = useRef(null);

    const [hasError, setErrors] = useState(false);

    const [dogsEven, setDogsEven] = useState<string[]>([]);
    const [dogsOdd, setDogsOdd] = useState<string[]>([]);

    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

    const [breed, setBreed] = useState<string | undefined>(undefined);

    async function fetchData(reset: boolean) {
        const even: string[] = reset ? [] : dogsEven;
        const odd: string[] = reset ? [] : dogsOdd;

        const url: string = breed ? `https://dog.ceo/api/breed/${breed.split(' ').join('/')}/images/random/50` : 'https://dog.ceo/api/breeds/image/random/50';

        const res: Response = await fetch(url);
        res
            .json()
            .then(async (res) => {
                const dogs: Dogs = res;

                if (dogs && dogs.message && dogs.message.length > 0) {
                    setDogsEven([...even, ...dogs.message.filter((_a, i) => i % 2)]);
                    setDogsOdd([...odd, ...dogs.message.filter((_a, i) => !(i % 2))]);

                    setDisableInfiniteScroll(dogs.message.length < 50);
                } else {
                    setDisableInfiniteScroll(true);
                }

                // Hack to scroll top
                setTimeout(async () => {
                    await autoScrollToTop();
                }, 100);
            })
            .catch(err => setErrors(err));
    }

    useEffect( () => {
        fetchData(true);
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

    function autoScrollToTop(): Promise<void> {
            return new Promise<void>(async (resolve) => {
                if (refContent && refContent.current) {
                    (refContent.current as any).scrollToTop();
                }

                resolve();
            });
    }

    return (
        <IonPage>
            <Header filter={true} filterAction={filterDogs}></Header>

            <IonContent ref={refContent}>
                <main>
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
};

export default Tab2;
