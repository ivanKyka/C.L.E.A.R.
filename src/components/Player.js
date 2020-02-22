import  React from 'react';
import styled from "styled-components";
import Header from "./Header";
import Wavesufer from "./Wavesufer";
import {inject, observer} from "mobx-react";
import Control from "./Control";
import Files from "./Files";
import {useParams} from "react-router";
import {getMediadata} from "../api/MediaData";
import Labels from "./Labels";
import MetadataViewer from "./MetadataViewer";

const Player = inject('playerStore')(observer(({playerStore}) => {

    const {id} = useParams();
    if (id) {
        playerStore.setIsReady(false);
        getMediadata(id).then(resp => {
            if (resp) playerStore.setCurrentTrack(resp);
            playerStore.setIsReady(true);
        })
    }

    return (
        <Container>
            <MetadataViewer/>
            <Header/>
            <Wavesufer />
            <Panes>
                <Files/>
                <Labels/>
            </Panes>
            <Control/>
        </Container>
    )
}))

export default Player;

const Container = styled.div`
    display: grid;
    max-height: 100vh;
    grid-template-rows: 50px 220px 1fr 70px;
`;
const Panes = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    overflow: auto;
    background: #121016;
    z-index: 5;
`;