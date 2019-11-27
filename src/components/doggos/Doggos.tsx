import React from 'react';
import {IonCard} from '@ionic/react';
import './Doggos.css';

type DoggosProps = {
    routeTab: string;
    dogsEven: string[];
    dogsOdd: string[];
    disableNav?: boolean;
}

const Doggos: React.FC<DoggosProps> = ({routeTab, dogsEven, dogsOdd, disableNav}) => {

    return (
        <div className="doggos-container">
            {renderDogs()}
        </div>
    );

    function renderDogs() {
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

            return <IonCard key={`${key}-${i}`} routerLink={`/${routeTab}/details/${breed}/${image}`} className={disableNav ? 'disabled' : ''}>
                <deckgo-lazy-img img-src={dogImgUrl} img-alt={`A random dog ${image}`}></deckgo-lazy-img>
            </IonCard>
        });
    }
};

export default Doggos;
