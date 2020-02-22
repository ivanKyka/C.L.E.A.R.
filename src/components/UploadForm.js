import React, {useState} from 'react';
import styled from 'styled-components';
import {inject, observer} from "mobx-react";
import Header from "./Header";
import UserForm from "./UserForm";
import FileUploader from "./FIleUploader";
import {uploadMediadata} from "../api/MediaData";
import {Circle2} from "react-preloaders";

const UploadForm = inject('ufStore')(observer(({ufStore}) => {
    const [isLoading, setLoading] = useState(false);
    const send = () => {
        console.log(ufStore.recivers.map(el => el.id));
        console.log(ufStore.fileName);
        console.log(ufStore.file);
        let formData = new FormData();
        formData.append('data', JSON.stringify({users: ufStore.recivers.map(el => el.id)}));
        formData.append(`files.media`, ufStore.file);
            if (ufStore.fileName !== '' && ufStore.recivers.length !== 0) {
                setLoading(true);
                uploadMediadata(formData).then(() => setLoading(false));
            }
    }

    if (isLoading) return <Circle2 color={'#ffffff'} background={'#121016'}/>
    return (
        <Container>
            <Header/>
            <Title onClick={send}>Upload Data</Title>
            <UserForm/>
            <FileUploader/>
        </Container>
    )
}));

export default UploadForm;

const Title = styled.button`
    text-align: center;
    margin: 0;
    justify-self: center;
    border: 4px solid #cbcbcb;
    color: #cbcbcb;
    background: transparent;
    cursor: pointer;
    height: 40px;
    width: 200px;
    font-family: Tomorrow;
    font-size: 1.4em;
    border-radius: 5px;
    &:hover {
        border: 4px solid #fff;
        color: #fff;
    }
    &:disabled {
        border: 4px solid #777;
        color: #777;
        cursor: auto;
    }
`;

const Container = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 50px 100px 1fr 70px;
    height: 100vh;
`;