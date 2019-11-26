import React, {useState} from 'react';
import {IonContent, IonCard, IonPage, IonInfiniteScroll, IonInfiniteScrollContent, useIonViewWillEnter} from '@ionic/react';
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

    async function fetchData() {
        const res: Response = await fetch('https://dog.ceo/api/breeds/image/random/50');
        res
            .json()
            .then((res) => {
                const dogs: Dogs = res;

                if (dogs && dogs.message && dogs.message.length > 0) {
                    setDogsEven([...dogsEven, ...dogs.message.filter((_a, i) => i % 2)]);
                    setDogsOdd([...dogsOdd, ...dogs.message.filter((_a, i) => !(i % 2))]);

                    setDisableInfiniteScroll(dogs.message.length < 50);

                } else {
                    setDisableInfiniteScroll(true);
                }
            })
            .catch(err => setErrors(err));
    }

    useIonViewWillEnter(async () => {
        await fetchData();
    });

    async function searchNext(e: CustomEvent<void>) {
        await fetchData();

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
                        handler: (value) => {
                            console.log(`Got Value`, value);
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
                {renderDogsColumn(dogsOdd)}
            </div>
            <div className="dogs-column">
                {renderDogsColumn(dogsEven)}
            </div>
        </div>;
    }

    function renderDogsColumn(dogs: string[]) {
        if (!dogs || dogs.length <= 0) {
            return undefined;
        }

        return dogs.map((dogImgUrl: string, i: number) => {

            const split: string[] = dogImgUrl.split('/');

            const breed: string = split && split.length >= 5 ? encodeURI(split[4]) : '';
            const image: string = split && split.length >= 6 ? encodeURI(split[5]) : '';

            return <IonCard key={i} routerLink={`/tab2/details/${breed}/${image}`}>
                <img src={dogImgUrl} alt={`A random dog with index ${i}`}/>
            </IonCard>
        });
    }
};

export default Tab2;
