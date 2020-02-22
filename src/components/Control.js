import React from 'react';
import styled from "styled-components";
import {observer, inject} from "mobx-react";
import ICONS from "../Icons";
import {Link} from "react-router-dom";

function getVolumeIcon(volume) {
    if (volume == 0) return ICONS.sound_0;
    if (volume > 0 && volume < 0.33) return ICONS.sound_1;
    if (volume >= 0.33 && volume < 0.66) return ICONS.sound_2;
    else return ICONS.sound_3;
}

const Control = inject('playerStore')(observer(({playerStore}) => {
    return (
        <Container>
            <span />
            {playerStore.isPlaying ?
                <Icon onClick={() => {playerStore.pause()}}>{ICONS.pause}</Icon> :
            <Icon onClick={() => {playerStore.play()}}>{ICONS.play}</Icon>}
            <Icon onClick={() => playerStore.stop()}>{ICONS.stop}</Icon>
            <Time>{Math.floor(playerStore.currentTime / 60)}:{playerStore.currentTime % 60 < 9 && '0'}{playerStore.currentTime % 60}</Time>
            <Icon onClick={() => playerStore.mute()}>{playerStore.isMute ? ICONS.sound_off : getVolumeIcon(playerStore.volume)}</Icon>
            <input type="range" min={0} max={1} step={0.01} onChange={e => {playerStore.setVolume(e.target.value)}} defaultValue={0.5}/>
            <div style={{display: 'flex'}}>
                <ZoomIcon>{ICONS.zoom_out}</ZoomIcon>
                <input type="range" min={0} max={100} defaultValue={0} step={10} onChange={e => playerStore.wavesurfer.zoom(e.target.value)}/>
                <ZoomIcon>{ICONS.zoom_in}</ZoomIcon>
            </div>
            <span />
            <Icon onClick={() => playerStore.toggleMetadata()}>{ICONS.xml}</Icon>
            <StyledLink to={'/upload'}>{ICONS.upload_file}</StyledLink>
            <StyledLink to={'/recorder'}>{ICONS.microphone}</StyledLink>
        </Container>
    )
}));

export default Control;

const Container = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 50px 50px 70px 50px 150px 200px 1fr max-content max-content max-content;
    grid-gap: 20px;
    align-content: center;
    justify-content: center;
    background: #121016;
    z-index: 4;
`;

const Icon = styled.div`
    display: inline-block;
    height: 50px;
    width: 50px;
    cursor: pointer;
    svg {
        height: 50px;
        width: 50px;
        fill: #cacaca;
    }
    &:hover svg {
        fill: #fff;
    }
`;

const ZoomIcon = styled(Icon)`
    width: 20px;
    svg {
        height: 20px;
        width: 20px;
        fill: #868686;
        padding: 15px 0;
    }
    svg:hover {
        fill: #868686;
    }
`;

const Time = styled.p`
    color: white;
    font-size: 2em;
    text-align: left;
    vertical-align: center;
    margin: 0;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    height: 50px;
    width: 50px;
    cursor: pointer;
    svg {
        height: 50px;
        width: 50px;
        fill: #cacaca;
    }
    &:hover svg {
        fill: #fff;
    }
`;