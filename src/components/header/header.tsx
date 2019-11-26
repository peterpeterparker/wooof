import React from 'react';
import {IonHeader, IonTitle, IonToolbar, IonButton, IonIcon} from '@ionic/react';
import {options} from 'ionicons/icons';

type HeaderProps = {
    filter: boolean;
    filterAction: Function | undefined;
}

class Header extends React.Component<HeaderProps> {

    private onFilterClick() {
        if (this.props.filterAction !== undefined) {
            this.props.filterAction();
        }
    }

    render() {
        return <IonHeader>
            <IonToolbar>
                <IonTitle className="ion-text-uppercase">Wooof</IonTitle>

                {this.renderFilter()}
            </IonToolbar>
        </IonHeader>
    }

    private renderFilter() {
        if (!this.props || !this.props.filter) {
            return undefined;
        }

        return <IonButton slot="end" color="light" onClick={() => this.onFilterClick()}>
            <IonIcon icon={options}/>
        </IonButton>
    }
}

export default ({ filter= false, filterAction }: {filter?: boolean, filterAction?: Function | undefined}) => (
    <Header filter={filter} filterAction={filterAction} >
    </Header>
)
