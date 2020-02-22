import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {useParams} from "react-router";
import styled from "styled-components";
import {Circle2} from "react-preloaders";



const Wavesufer = inject('playerStore')(observer(({playerStore}) => {

    useEffect(() => {
        playerStore.initializeService();
    },[]);

    const {id} = useParams();

    return (<Container>
        {playerStore.isTrackLoading && <Circle2 color={'white'} background={'#121016'}/>}
        <Error isVisible={!playerStore.currentTrack}>{id ? 'FILE NOT FOUND!' : 'NO ACTIVE FILE'}</Error>
        <div id={'waveform'}/>
        <div id={'wave-timeline'}/>
    </Container>)

}));

export default Wavesufer;

const Error = styled.h1`
    height: 220px;
    text-align: center;
    vertical-align: center;
    display: ${props => props.isVisible ? 'block':'none'};
    line-height: 220px;
    margin: 0;
`;

const Container = styled.div`
    #preloader {
        display: grid;
        position: static;
        height: 240px;
    }
    .wavesurfer-region {
        border-right: 1px solid white;
        border-left: 1px solid white;
        //cursor: pointer !important;
        z-index: 10;
        //&:hover {
        //    filter: brightness(1.2);
        //}
    }
`;