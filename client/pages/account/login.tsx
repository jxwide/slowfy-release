import React, {useState} from 'react';
import Link from "next/link";
import Header from '../../components/Header';
import axios from "axios";
import surl from "../../components/surl";
import {setjwt} from "../../components/getjwt";
import {useRouter} from "next/router";

const Login = () => {
    let router = useRouter();
    let [errorString, setErrorString] = useState('');
    let [emailInput, setEmailInput] = useState('');
    let [passwordInput, setPasswordInput] = useState('');

    const nextAction = () => {
        var bodyFormData = new FormData();
        bodyFormData.append('Email', emailInput);
        bodyFormData.append('Password', passwordInput);
        let res = axios({
            method: 'post',
            url: surl + 'users/login',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(resp => {
                setjwt(resp.data);
                // redirect to home
                router.push("/home");
            })
            .catch(e => setErrorString(e.response.data))
    }

    return (
        <div>
            <Header selected="account"/>
            <div className="cont">
                <div className="singup_main main">
                    <h2>Войдите в свой аккаунт</h2>

                    <div className="forms">
                        <input type="email" placeholder="Email" className="singupinput"
                        value={emailInput} onChange={(p) => setEmailInput(p.target.value)}/>
                        <input type="password" placeholder="Пароль" className="singupinput"
                        value={passwordInput} onChange={(p) => setPasswordInput(p.target.value)}/>

                        <div className="singupbtns">

                            <div className="nextbtn" onClick={() => nextAction()}>Далее</div>
                            <Link href="/account" legacyBehavior>
                                <a href="/my-app/pages" className="simple_a alreadyhav">Нет аккаунта?</a>
                            </Link>

                        </div>

                        <div className={errorString == '' ? "errorbtn hidden" : "errorbtn"}>{errorString}</div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;