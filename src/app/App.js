import React, { createContext, useState, useEffect } from 'react';
import Login from "../components/Login";
import {createGlobalStyle} from "styled-components";
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from 'history';
import Player from "../components/Player";
import {Circle2} from "react-preloaders";
import {Provider, inject, observer} from "mobx-react";
import UserStore from "../stores/UserStore";
import {me} from "../api/User";
import PlayerStore from "../stores/PlayerStore";
import UploadFormStore from "../stores/UploadFormStore";
import UploadForm from "../components/UploadForm";
import Recorder from "../components/Recorder";
import MediaRecorderService from "../stores/MediaRecorderService";
import 'vanta.globe';
import 'three.min';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #121016;
        font-family: "Noto Sans";
        color: white;
    }
    h1 {
        font-family: Tomorrow;
    }
`;

export const SetLoggedContext = createContext();
export const history = createBrowserHistory();


const store = {
    userStore: new UserStore(),
    playerStore: new PlayerStore(),
    ufStore: new UploadFormStore(),
    mrService: new MediaRecorderService()
}

const App = observer(() => {
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        me().then(resp => {
            if (resp) {
                store.userStore.setIsLogged(true);
                store.userStore.setUser(resp);
                setReady(true);
            }
            else {
                store.userStore.setIsLogged(false);
                setReady(true);
            }
        });
    },[]);
    if (!isReady) return <>
        <Circle2 color={'#ffffff'} background={'#121016'}/>
    </>
    else return (
        <>
            <GlobalStyle/>
            <Provider {...store}>
                <Router history={history}>
                    {!store.userStore.isLogged && <Switch>
                        <Route component={Login} path={'/'}/>
                    </Switch>}
                    {store.userStore.isLogged && <Switch>
                        <Route exact path={'/upload'} component={UploadForm} />
                        <Route exact path={'/recorder'} component={Recorder} />
                        <Route path={'/:id'} component={Player} />
                        <Route path={'/'} component={Player} />
                    </Switch>}
                </Router>
            </Provider>
        </>
    );
});

export default App;
