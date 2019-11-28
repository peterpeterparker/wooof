import React from 'react';
import {IonButton, IonIcon, IonLabel, IonToolbar, IonHeader} from '@ionic/react';
import {options} from 'ionicons/icons';

type HeaderProps = {
    title: string;
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
        return <main>
            <IonHeader><IonToolbar><h1 className="ion-padding-start ion-padding-end">{this.props.title}</h1></IonToolbar></IonHeader>
            {this.renderFilter()}
        </main>
    }

    private renderFilter() {
        if (!this.props || !this.props.filter) {
            return undefined;
        }

        return <IonButton color="primary" onClick={() => this.onFilterClick()} expand="full" shape="round" className="ion-padding" style={{'marginBottom': '24px'}}>
            <IonIcon icon={options} slot="start"/>
            <IonLabel>Filter</IonLabel>
        </IonButton>
    }
}

export default ({ title, filter= false, filterAction }: {title: string, filter?: boolean, filterAction?: Function | undefined}) => (
    <Header title={title} filter={filter} filterAction={filterAction}>
    </Header>
)
