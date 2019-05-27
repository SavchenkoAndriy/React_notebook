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
        goMain: false
    };

    // АВТОРИЗАЦЫЯ НАЧАЛО РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    gettingName = async (e) => {
        e.preventDefault();

        let userName = e.target.elements.myLogin.value;
        let userPass = e.target.elements.myPass.value;
        const API_URL = await fetch(`http://localhost:4200/user`);
        const data = await API_URL.json();

        console.log(data);

        for (let i = 0; i < data.length; i++){
            if (data[i].name === userName && data[i].password === userPass ) {

                this.state = {
                    id: i+1,
                    name: data[i].name,
                    password: data[i].password,
                    error: undefined,
                    goLogin: false,
                    goReg: false,
                    goMain: true
                };


                let tl = new TimelineMax();

                tl.fromTo('.App_Login',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});

                tl.fromTo('.app_Main',0.5,{opacity:0,zIndex: 0},{opacity:1,zIndex: 1},0.5);

                tl.to('.App_Login',0,{width: 0},0.5);
                tl.to('.App_Reg',0,{width: 0},0.5);

                break
            }
            else {
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
        }



        this.setState({
            id: this.state.id,
            name: this.state.name,
            password: this.state.password,
            error: this.state.error,
            goLogin: this.state.goLogin,
            goReg: this.state.goReg,
            goMain: this.state.goMain
        });

    };


    // АВТОРИЗАЦЫЯ КОНЕЦ РАБОТАЕТ !!!!!!!!!!!!!!!!!!!
    // РЕГИСТРАЦЫЯ НАЧАЛО РАБОТАЕТ !!!!!!!!!!!!!!!!!!!

    postUser = async  (e) => {


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


                setTimeout(function () {

                    this.setState({
                        id: data.length+1,
                        name: userName,
                        password: userPass,
                        error: undefined,
                        goLogin: false,
                        goReg: false,
                        goMain: true,
                        post:[{
                            id:1,
                            title: "Welcome",
                            text: "Its your first post"
                        }]
                    });

                    let user = JSON.stringify({name: userName, password: userPass, post:this.state.post});
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


    goRegg = () => {


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


    exit = (e) => {
        e.preventDefault();


        let tl = new TimelineMax();

        tl.fromTo('.app_Main',0.5,{opacity:1,zIndex: 1},{opacity:0,zIndex: 0});


        setTimeout(function () {

            this.setState({
                goLogin: true,
                goReg: false,
                error: undefined,
                goMain: false
            });

            tl.fromTo('.App_Login',0.5,{opacity:0, zIndex: 0},{opacity:1,zIndex: 1});
        }.bind(this), 500);

        tl.to('.App_Login',0,{width: '100vw'},0.5);

    };



    render(){
        return (
            <div className="App">
                <Login
                    nameMethod={this.gettingName}
                    gogoReg = {this.goRegg}
                    goLogin = {this.state.goLogin}
                    error = {this.state.error}
                />
                <Registration
                    postMethod={this.postUser}
                    gogoLog = {this.goLog}
                    goReg = {this.state.goReg}
                    error = {this.state.error}
                />
                <Main
                    UserId = {this.state.id}
                    UserPass = {this.state.password}
                    goMain = {this.state.goMain}
                    ThisName = {this.state.name}
                    exit = {this.exit}
                />
            </div>
        );
    }

}

export default App;
