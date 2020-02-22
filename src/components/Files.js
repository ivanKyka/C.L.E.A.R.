import React from 'react';
import styled from "styled-components";
import {inject, observer} from 'mobx-react';
import {Link} from "react-router-dom";

const Files = inject('playerStore')(observer(({playerStore}) => {

    return (
        <div style={{borderRight: '1px solid rgba(162,162,162,0.2)'}}>
            <Title>Shared data</Title>
            <List>
                {playerStore.files.map(el =>
                    <ListItem
                        isActive={playerStore.currentTrack && playerStore.currentTrack.media.id === el.media.id}
                        to={'/' + el.id}
                    >{el.media.name}</ListItem>)}
            </List>
        </div>
    )
}));

export default Files;

const List = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    max-height: calc(100vh - 422px);
    overflow: auto;
`;

const ListItem = styled(Link)`
    list-style: none;
    height: 40px;
    line-height: 40px;
    vertical-align: center;
    padding-left: 10px;
    cursor: pointer;
    background: ${props => props.isActive ? '#444':'transparent'};
    color: #c8c8c8;
    &:hover {
        color: white;
        background: #323232;
    }
    &:active {
        color: white;
    }
    &:visited {
        color: #c8c8c8;
    }
    &:first-child {
        //border-top: 1px solid rgba(162,162,162,0.5);
    }
`;

const Title = styled.h1`
    text-align: center;
`;