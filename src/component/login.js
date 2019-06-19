import React from 'react';
import './sass/login.sass';


class Login extends React.Component{

    render (){
        return (
            <div className="App_Login">
                {this.props.goLogin &&
                    <div className={'container_log'}>
                        <div className={'login__wrap'}>
                            <form className={'login__form'} onSubmit={this.props.login}>
                                <div className={'header'}>
                                    <p>Страница логинизацыи</p>
                                </div>
                                <input placeholder={"Имя"} id={'loginMe'} name={'myLogin'} type={'text'}/>
                                <input placeholder={"Пароль"} id={'pas'} name={'myPass'} type={'password'}/>
                                <button id={'login_butt'}>Ввойти</button>
                                {this.props.error &&
                                <div className={'form__footer'}>
                                    <p>{this.props.error}</p>
                                </div>
                                }
                            </form>
                            <div className={'button__wrap'}>
                                <p>Нет аккаунта?</p>
                                <button className={'go__regg'} onClick={this.props.goRegistration}>Зарегестрироватся </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Login;