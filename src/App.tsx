import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonIcon
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Details from './pages/Details';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Custom CSS
import './theme/header.css';
import './theme/tab.css';
import './theme/content.css';

import {SplashScreen} from '@capacitor/core';

// Font Awesome
import {library, config} from '@fortawesome/fontawesome-svg-core';

import {faHome, faHeart, faDatabase} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

// https://github.com/FortAwesome/react-fontawesome/issues/134#issuecomment-471940596
import '@fortawesome/fontawesome-svg-core/styles.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

config.autoAddCss = false;

library.add(faHome);
library.add(faHeart);
library.add(faDatabase);

library.add(faGithub);

const App: React.FC = () => {

    async function hideSplashScreen() {
        await SplashScreen.hide();
    }

    useEffect(() => {
        hideSplashScreen();
    }, []);

    return <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/tab1" component={Tab1} exact={true}/>
                    <Route path="/tab2" component={Tab2} exact={true}/>
                    <Route path="/tab2/details/:breed/:image" component={Details}/>
                    <Route path="/tab3" component={Tab3} exact={true}/>
                    <Route path="/tab3/details/:breed/:image" component={Details}/>
                    <Route path="/" render={() => <Redirect to="/tab1"/>} exact={true}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tab1">
                        <div>
                            <FontAwesomeIcon icon={["fas", "home"]} size="2x"/>
                            <IonLabel>Home</IonLabel>
                        </div>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                        <div>
                            <IonIcon src="/assets/icon/wooof-paw.svg"></IonIcon>
                            <IonLabel>Doggos</IonLabel>
                        </div>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                        <div>
                            <FontAwesomeIcon icon={["fas", "heart"]} size="2x"/>
                            <IonLabel>Favorites</IonLabel>
                        </div>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
};

export default App;
