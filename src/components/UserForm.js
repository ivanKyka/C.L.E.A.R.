import React, {useEffect} from 'react';
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {getAllUsers} from "../api/User";
import {difference} from 'lodash';

const UserForm = inject('ufStore')(observer(({ufStore}) => {

    useEffect(() => {
        getAllUsers().then(data => {
            console.log(data);
            ufStore.setUserList(data);
        })
    }, []);

    return (
        <Container>
            <div>
                <UserList>
                    <tbody>
                    <tr><td colSpan={4}><Title>ALL USERS</Title></td></tr>
                    {difference(ufStore.allUsers, ufStore.recivers).map(user => <tr key={user.id}>
                        <td><Image src={`${STRAPI_URL}${user.icon.url}`} /></td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => ufStore.addReciver(user)}>Add</button></td>
                    </tr>)}
                    </tbody>
                </UserList>
            </div>
            <div>
                <UserList>
                    <tbody>
                    <tr><td colSpan={4}><Title>RECIEVERS</Title></td></tr>
                    {ufStore.recivers.map(user => <tr key={user.id}>
                        <td><Image src={`${STRAPI_URL}${user.icon.url}`} /></td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => ufStore.removeReciver(user)}>Remove</button></td>
                    </tr>)}
                    </tbody>
                </UserList>
            </div>
        </Container>
    )
}));

export default UserForm;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    div {
        width: 100%;
    }
`;

const UserList = styled.table`
    margin: 0;
    padding: 10px;
    font-size: 1.2em;
    border-collapse: collapse;
    width: 100%;
    td {
        border-bottom: 1px solid rgba(127,127,127,0.3);
    }
`;


const Image = styled.img`
    height: 50px;
    max-width: 50px;
    overflow: hidden;
    border-radius: 50%;
`;

const Title = styled.h3`
    width: 100%;
    text-align: center;
    font-family: Tomorrow;
`;