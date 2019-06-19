import React from 'react';
import './App.sass';
import Login from './component/login';
import Main from './component/main';
import Registration from './component/registration';

import {TimelineMax} from 'gsap';

class App extends React.Component{

    state = {
        id: undefined,
        name: undefined,
        password:undefined,
        error: undefined,
        goLogin: true,
        goReg: false,
        goMain: false,
        post: undefined,
        postInfo: undefined,
    };

    // АВТОРИЗАЦЫЯ НАЧАЛО РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    login = async (e) => {
        e.preventDefault();

        let userName = e.target.elements.myLogin.value;
        let userPass = e.target.elements.myPass.value;

        if (userName === '' && userPass === ''){
            this.setState({
                error: 'Поля имя и пароль не могут быть пустыми',
            });
        }

        else {
            const API_URL = await fetch(`http://localhost:4200/user`);
            const data = await API_URL.json();

            for (let i = 0; i < data.length; i++){

                if (data[i].name === userName && data[i].password === userPass) {

                    this.state = {
                        id: i,
                        name: data[i].name,
                        password: data[i].password,
                        error: undefined,
                        goLogin: false,
                        goReg: false,
                        goMain: true,
                    };

                    let tl = new TimelineMax();
                    tl.fromTo('.App_Login',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});
                    tl.fromTo('.app_Main',0.5,{opacity:0,zIndex: 0},{opacity:1,zIndex: 1},0.5);
                    tl.to('.App_Login',0,{width: 0},0.5);
                    tl.to('.App_Reg',0,{width: 0},0.5);
                    break
                }
                else  if (data[i].name === userName || data[i].password === userPass) {
                    this.state = {
                        id: undefined,
                        name: undefined,
                        password: undefined,
                        error: 'Имя или пароль введено неверно',
                        goLogin: true,
                        goReg: false,
                        goMain: false
                    };
                }
                else {
                    this.state = {
                        id: undefined,
                        name: undefined,
                        password: undefined,
                        error: 'Такого пользователя не существует',
                        goLogin: true,
                        goReg: false,
                        goMain: false
                    };
                }
            }

            this.setState({
                id: this.state.id,
                name: this.state.name,
                password: this.state.password,
                error: this.state.error,
                goLogin: this.state.goLogin,
                goReg: this.state.goReg,
                goMain: this.state.goMain,
            });

        }
    };


    // АВТОРИЗАЦЫЯ КОНЕЦ РАБОТАЕТ !!!!!!!!!!!!!!!!!!!
    // РЕГИСТРАЦЫЯ НАЧАЛО РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    registration = async  (e) => {

        this.setState({
            error: undefined,
            name: undefined,
            password: undefined
        });


        e.preventDefault();

        let userName = e.target.elements.name.value;
        let userPass = e.target.elements.password.value;

        const API_URL = await fetch(`http://localhost:4200/user`);
        const data = await API_URL.json();

        if (userName === '' && userPass === ''){
            return(
                this.setState({
                    error: 'Имя или пароль введено неверно',
                    name: undefined,
                    password: undefined
                })
            )
        }else {
            for (let i=0; i<data.length; i++) {
                if (data[i].name === userName) {
                    this.setState({
                        error: 'Такой пользователь уже есть'
                    });
                }
            }
            if (this.state.error) {
                return (
                    this.setState({
                        error: this.state.error
                    })
                )
            }else {
                let tl = new TimelineMax();
                tl.fromTo('.App_Reg',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});

                let post = [{
                    id: 0,
                    title: "Welcome",
                    text: "Its your first post"
                }];

                setTimeout(function () {
                    this.setState({
                        id: data.length,
                        name: userName,
                        password: userPass,
                        error: undefined,
                        goLogin: false,
                        goReg: false,
                        goMain: true,
                        post: post,
                    });

                    let user = JSON.stringify({
                        name: userName,
                        password: userPass,
                        post: post
                    });
                    let request = new XMLHttpRequest();
                    request.open("POST", "http://localhost:4200/user", true);
                    request.setRequestHeader("Content-Type", "application/json");
                    request.send(user);

                    tl.fromTo('.app_Main',0.5,{opacity:0,zIndex: 0},{opacity:1,zIndex: 1});
                }.bind(this), 500);

                tl.to('.App_Login',0,{width: 0},0.5);
                tl.to('.App_Reg',0,{width: 0},0.5);
            }
        }
    };

    // РЕГИСТРАЦЫЯ КОНЕЦ РАБОТАЕТ !!!!!!!!!!!!!!!!!!!
    // ПЕРЕХОД НА РЕГИСТРАЦЫЮ НАЧАЛО РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    goRegistration = () => {
        let tl = new TimelineMax();
        tl.fromTo('.App_Login',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});

        setTimeout(function () {
            this.setState({
                goLogin: false,
                goReg: true,
                error: undefined
            });
            tl.fromTo('.App_Reg',0.5,{opacity:0,zIndex: 0},{opacity:1,zIndex: 1});
        }.bind(this), 500);
        tl.to('.App_Reg',0,{width: '100vw'},0.5);
    };

    // ПЕРЕХОД НА РЕГИСТРАЦЫЮ КОНЕЦ РАБОТАЕТ !!!!!!!!!!!!!!!!!!!
    // ПЕРЕХОД НА ЛОГИНИЗАЦЫЮ НАЧАЛО РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    goLog = () => {
        let tl = new TimelineMax();
        tl.fromTo('.App_Reg',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});

        setTimeout(function () {

            this.setState({
                goLogin: true,
                goReg: false,
                error: undefined
            });
            tl.fromTo('.App_Login',0.5,{opacity:0,zIndex: 0},{opacity:1,zIndex: 1});
        }.bind(this), 500);
        tl.to('.App_Login',0,{width: '100vw'},0.5);
    };

    // ПЕРЕХОД НА ЛОГИНИЗАЦЫЮ КОНЕЦ РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    exit = () => {
        this.setState({
            postInfo: false,
        });

        let tl = new TimelineMax();
        tl.fromTo('.app_Main',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});
        setTimeout(function () {
            this.setState({
                goLogin: true,
                goReg: false,
                error: undefined,
                goMain: false,
            });
            tl.fromTo('.App_Login',0.5,{opacity:0, zIndex: 0},{opacity:1,zIndex: 1});
        }.bind(this), 500);
        tl.to('.App_Login',0,{width: '100vw'},0.5);
    };


    delete = async () => {

        let isAdmin = window.confirm("Вы - уверенны?");

        if (isAdmin) {

            let id = this.state.id;

            const API_URL = await fetch(`http://localhost:4200/user/${id}/`);
            const data = await API_URL.json();

            let user =  JSON.stringify({
                name: '',
                password: '',
                id: data.id,
                post: data.post,
            });

            let request = await new XMLHttpRequest();
            request.open("PATCH", `http://localhost:4200/user/${id}/`, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(user);


            let tl = new TimelineMax();
            tl.fromTo('.app_Main',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});
            setTimeout(function () {
                this.setState({
                    goLogin: true,
                    goReg: false,
                    error: undefined,
                    goMain: false,
                });
                tl.fromTo('.App_Login',0.5,{opacity:0, zIndex: 0},{opacity:1,zIndex: 1});
            }.bind(this), 500);
            tl.to('.App_Login',0,{width: '100vw'},0.5);
        }


        // let id = this.state.id;
        //
        // const API_URL = await fetch(`http://localhost:4200/user/${id}/`);
        // const data = await API_URL.json();
        //
        // let user =  JSON.stringify({
        //     name: '',
        //     password: '',
        //     id: data.id,
        //     post: data.post,
        // });
        //
        // let request = await new XMLHttpRequest();
        // request.open("PATCH", `http://localhost:4200/user/${id}/`, true);
        // request.setRequestHeader("Content-Type", "application/json");
        // request.send(user);


        // let id = this.state.id;
        // let request = await new XMLHttpRequest();
        // request.open("DELETE", `http://localhost:4200/user/${id}/`, true);
        // request.send();
        // const API_URL = await fetch(`http://localhost:4200/user/`);
        // const data = await API_URL.json();

        // for (let i = id + 1; i < data.length; i++){
        //     setTimeout(async function () {
        //         const NAPI_URL = await fetch(`http://localhost:4200/user/${i}/`);
        //         const Ndata = await NAPI_URL.json();
        //         let sid = i-1;
        //         let user =  JSON.stringify({
        //             name: Ndata.name,
        //             password: Ndata.password,
        //             id: sid,
        //             post: Ndata.post,
        //         });
        //         let request = await new XMLHttpRequest();
        //         request.open("PATCH", `http://localhost:4200/user/${i}/`, true);
        //         request.setRequestHeader("Content-Type", "application/json");
        //         request.send(user);
        //     },0.2);
        // }



        // let tl = new TimelineMax();
        // tl.fromTo('.app_Main',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});
        // setTimeout(function () {
        //     this.setState({
        //         goLogin: true,
        //         goReg: false,
        //         error: undefined,
        //         goMain: false,
        //     });
        //     tl.fromTo('.App_Login',0.5,{opacity:0, zIndex: 0},{opacity:1,zIndex: 1});
        // }.bind(this), 500);
        // tl.to('.App_Login',0,{width: '100vw'},0.5);
    };



    render(){
        return (
            <div className="App">
                <Login
                    login={this.login}
                    goRegistration = {this.goRegistration}
                    goLogin = {this.state.goLogin}
                    error = {this.state.error}
                />
                <Registration
                    registration={this.registration}
                    goLog = {this.goLog}
                    goReg = {this.state.goReg}
                    error = {this.state.error}
                />
                <Main
                    id = {this.state.id}
                    password = {this.state.password}
                    name = {this.state.name}
                    goMain = {this.state.goMain}
                    postInfo = {this.state.postInfo}
                    exit = {this.exit}
                    delete = {this.delete}
                />
            </div>
        );
    }
}

export default App;
