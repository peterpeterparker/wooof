import React, {useEffect, useState} from 'react';
import {IonContent, IonCard, IonPage, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react';
import {Dogs} from '../models/dog';
import './Tab2.css';
import {pickerController} from '@ionic/core';

import Header from '../components/header/header';
import {BreedsService} from '../services/breeds/breeds.service';
import {PickerColumnOption} from '@ionic/core/dist/types/components/picker/picker-interface';

const Tab2: React.FC = () => {

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

    return (
        <IonPage>
            <Header filter={true} filterAction={filterDogs}></Header>

            <IonContent>
                <div className="doggos-container">
                    {renderDogs()}
                </div>

                <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                                     onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent
                        loadingText="Loading more good doggos...">
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );

    function renderDogs() {
        if (hasError) {
            return undefined;
        }

        if ((!dogsEven || dogsEven.length <= 0) && (!dogsOdd || dogsOdd.length <= 0)) {
            return undefined;
        }

        return <div className="dogs-container">
            <div className="dogs-column">
                {renderDogsColumn(dogsOdd, 'odd')}
            </div>
            <div className="dogs-column">
                {renderDogsColumn(dogsEven, 'even')}
            </div>
        </div>;
    }

    function renderDogsColumn(dogs: string[], key: string) {
        if (!dogs || dogs.length <= 0) {
            return undefined;
        }

        return dogs.map((dogImgUrl: string, i: number) => {

            const split: string[] = dogImgUrl.split('/');

            const breed: string = split && split.length >= 5 ? encodeURI(split[4]) : '';
            const image: string = split && split.length >= 6 ? encodeURI(split[5]) : '';

            return <IonCard key={`${key}-${i}`} routerLink={`/tab2/details/${breed}/${image}`}>
                <img src={dogImgUrl} alt={`A random dog ${image}`}/>
            </IonCard>
        });
    }
};

export default Tab2;
