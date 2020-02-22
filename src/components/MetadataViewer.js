import React from 'react';
import styled from 'styled-components';
import XMLViewer from "react-xml-viewer";
import {inject, observer} from "mobx-react";

const MetadataViewer = inject('playerStore')(observer(({playerStore}) => {
    return (
        <Container isOpen={playerStore.isMetadataOpen}>
            {playerStore.currentTrack && playerStore.currentTrack.xml && <XMLViewer
                xml={playerStore.currentTrack.xml}
                theme={{
                    attributeKeyColor: '#fff',
                    attributeValueColor: '#fff',
                    cdataColor: '#fff',
                    commentColor: '#fff',
                    separatorColor: '#fcb12f',
                    tagColor: '#fcb12f',
                    textColor: '#fff'
                }}
            />}
        </Container>
    )    
}));

export default MetadataViewer;

const Container = styled.div`
    display: grid;
    position: absolute;
    top: 50px;
    bottom: 80px;
    width: 100vw;
    left: ${props => props.isOpen ? '0':'100vw'};
    height: calc(100vh - 130px);
    background: #121016;
    z-index: 10;
    padding: 10px;
    overflow: auto;
`;