import React, {useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import ICONS from "../Icons";
import {Auth} from "../api/Auth";
import Cookies from 'js-cookie';
import {inject, observer} from "mobx-react";

const Login = inject("userStore")(observer(({userStore}) => {
    const bg = useRef(null);
    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    useEffect(() => {
        VANTA.GLOBE({
            el: bg.current,
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3f8eff,
            size: 1.60,
            backgroundColor: 0x121016
        })
    },[]);

    const formSubmitHandler = e => {
        e.preventDefault();

        const login = loginInput.current.value;
        const pass = passwordInput.current.value;
        Auth(login, pass).then(a => {
            if (a.jwt) {
                Cookies.set('jwt',a.jwt);
                userStore.setIsLogged(true);
            }
        })
    }

    return (
        <>
            <Background ref={bg} />
            <Content>
                <LoginForm onSubmit={formSubmitHandler}>
                    <Title>C.L.E.A.R.</Title>
                    <Field>
                        {ICONS.user}
                        <input type="text" ref={loginInput}/>
                    </Field>
                    <Field>
                        {ICONS.password}
                        <input type="password" ref={passwordInput}/>
                    </Field>
                    <Submit>Sign In</Submit>
                </LoginForm>
            </Content>
        </>
    )
}));

export default Login;

const Background = styled.div`
    height: 100vh;
    width: 100vw;
    z-index: 1;
`;

const Content = styled.div`
    height: 100vh;
    width: 100vw;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    top: 0;
    left: 0;
`;

const LoginForm = styled.form`
    display: grid;
    width: 350px;
    padding: 0 50px 50px 50px;
    background: rgba(12,13,13,0.85);
    justify-self: center;
    align-self: center;
    color: white;
    text-align: center;
    border-radius: 10px;
    font-size: 2em;
    grid-gap: 40px;
`;

const Field = styled.div`
    position: relative;
    display: grid;
    svg {
        position: absolute;
        height: 30px;
        fill: white;
        align-self: center;
        left: 8px;
    }

    input {
        height: 40px;
        border: 2px #ccc solid;
        border-radius: 5px;
        background: transparent;
        font-size: 24px;
        font-family: Tomorrow;
        color: white;
        width: calc(100% - 50px);
        padding-left: 46px;
        cursor: text;
        &:hover {
            background: rgba(34,34,34,0.75);
        }
    }
`;

const Title = styled.h1`
    margin: 40px 0 0 0 ;
    text-transform: uppercase;
`;

const Submit = styled.button`
    height: 40px;
    border: 2px #ccc solid;
    border-radius: 5px;
    background: rgba(159,255,114,0.31);
    font-size: 24px;
    font-family: Tomorrow;
    color: white;
    width: 100%;
    cursor: pointer;
    &:hover {
        filter: saturate(2);
    }
`;
