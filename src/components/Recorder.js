import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import ICONS from "../Icons";
import Header from "./Header";

const Recorder = inject('mrService')(observer(({mrService}) => {
    return <div>
        <Header/>
        <Container>
            <Icon onClick={ mrService.isRecording ? mrService.stop : mrService.start}>
                {mrService.isRecording ? ICONS.microphone_slash : ICONS.microphone}
            </Icon>
            <Label>Recording: {mrService.isRecording ? ' ON' : 'OFF'}</Label>
            <List>
                {mrService.messages.reverse().map(el => <li>{el}</li>)}
            </List>
        </Container>
    </div>
}));

export default Recorder;

const Container = styled.div`
    display: grid;
    justify-content: center;
    width: 100vw;
`;

const Icon = styled.div`
    display: grid;
    justify-content: center;
    height: 100px;
    cursor: pointer;
    svg {
        height: 100px;
        fill: #cacaca;
    }
    &:hover svg {
        fill: #fff;
    }
`;
const Label = styled.p`
    font-size: 2em;
    font-family: Tomorrow;
    display: block;
`;

const List = styled.ul`
    padding: 0;
    margin: 0;
    height: calc(100vh - 300px);
    overflow: auto;
    
    li {
        list-style: none;
        height: 30px;
        font-size: 1.3em;
        padding-right: 10px;
    }
`;