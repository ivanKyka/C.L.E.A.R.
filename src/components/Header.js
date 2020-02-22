import React from 'react';
import styled from 'styled-components';
import {inject, observer} from "mobx-react";
import Cookies from 'js-cookie';
import ICONS from "../Icons";
import {Link} from "react-router-dom";

const Header = inject('userStore', 'playerStore')(observer(({userStore, playerStore}) => {
    return(
        <Container>
            <Logo to={'/'}>C.L.E.A.R.</Logo>
            <Role>{userStore.user && userStore.user.role && userStore.user.role.name}</Role>
            <UserInfo>
                <span>{userStore.user && userStore.user.username}</span>
                <span>{userStore.user && userStore.user.email}</span>
            </UserInfo>
            <Image src={`${STRAPI_URL}${Cookies.get('icon')}`}/>
            <Logout onClick={() => {
                Cookies.remove('jwt');
                userStore.setIsLogged(false);
            }}>{ICONS.logout}</Logout>
        </Container>
    )
}));

export default Header;

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr 250px 50px 50px;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: Tomorrow;
    padding: 0 10px 0 10px;
    height: 50px;
    background: #121016;
    z-index: 5;
`;

const Role = styled.span`
    text-align: center;
    font-size: 28px;
`;

const Logo = styled(Link)`
    padding: 0 0 0 30px;
    margin: 0;
    font-family: Tomorrow;
    text-decoration: none;
    font-weight: bold;
    font-size: 2em;
    vertical-align: center;
    color: white;
`;

const UserInfo = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    grid-gap: 5px;
`;

const Image = styled.img`
    height: 50px;
    max-width: 50px;
    overflow: hidden;
    border-radius: 50%;
`;

const Logout = styled.div`
    display: block;
    height: 50px;
    width: 50px;
    cursor: pointer;
    svg {
        height: 30px;
        width: 30px;
        margin: 10px;
        fill: white;
    }
    &:hover svg {
        fill: gray;
    }
`;
