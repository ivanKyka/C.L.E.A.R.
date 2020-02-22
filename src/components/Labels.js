import React from 'react';
import styled from "styled-components";
import {inject, observer} from 'mobx-react';

const Labels = inject('playerStore')(observer(({playerStore}) => {

    return (
        <div>
            <Title>Security labels</Title>
            <List>
                {playerStore.labels.
                map(el => <ListItem
                    isActive={playerStore.currentRegion === el.id}
                    onClick={() => playerStore.play(el.st, el.end)}
                >
                    <span>{el.label}</span>
                    <span>{Math.floor(el.st / 60)}:{el.st % 60 < 9 && '0'}{el.st % 60}</span>
                    <span>{Math.floor(el.end / 60)}:{el.end % 60 < 9 && '0'}{el.end % 60}</span>
                </ListItem>)}
            </List>
        </div>
    )
}));

export default Labels;

const List = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    height: calc(100vh - 422px);
    overflow: auto;
`;

const ListItem = styled.div`
    height: 40px;
    vertical-align: center;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 1fr max-content max-content;
    grid-gap: 10px;
    //border-bottom: 1px solid rgba(162,162,162,0.5);
    cursor: pointer;
    color: #c8c8c8;
    margin: 0;
    padding-right: 10px;
    line-height: 40px;
    vertical-align: center;
    background: ${props => props.isActive ? '#444':'transparent'};
    &:hover {
        color: white;
        background: #323232;
    }
`;

const Title = styled.h1`
    text-align: center;
`;