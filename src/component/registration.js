import React from 'react';
import './sass/registration.sass';

class Registration extends React.Component{

    render () {
        return (
            <div className="App_Reg">
                { this.props.goReg &&
                    <div className={'container_reg'}>
                        <div className={'regis__wrap'}>
                            <div className={'regis__header'}>
                                <p>Страница регистрацыи</p>
                            </div>
                            <form className={'regis__form'} onSubmit={this.props.registration}>
                                <input placeholder={'Имя'} id={'form__name'} name={'name'}/>
                                <input placeholder={'Пароль'} id={'form__password'} name={'password'} type={'password'}/>
                                <button id={'form__button'}>Зарегестрироватся</button>
                                {this.props.error &&
                                <div className={'form__footer'}>
                                    <p>{this.props.error}</p>
                                </div>
                                }
                            </form>
                            <div className={'regis__footer'}>
                                <div className={'footer__text'}>
                                    <p>Есть аккаунт?</p>
                                </div>
                                <div className={'footer__button'}>
                                    <button id={'regis__button'} onClick={this.props.goLog}>Ввойти</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Registration;