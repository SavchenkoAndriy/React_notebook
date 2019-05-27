import React from 'react';

import './sass/main.sass';

class Main extends React.Component {

    state = {
        error: undefined
    };


    getPost = async  (e) => {

        e.preventDefault();
        const API_URL = await fetch(`http://localhost:4200/user/${this.props.UserId}`);
        const data = await API_URL.json();



        this.setState({
            header: data.post
        });

        const fff = [];
        let aaa;

        for (let i = 0; i <this.state.header.length; i++) {
            aaa = (
                    <div className={'post__list'} key={this.state.header[i].id}>
                        <p>{this.state.header[i].title}</p>
                        <p>{this.state.header[i].text}</p>
                    </div>
                );
            fff.push(aaa);

        }

         let bbb = fff.reverse();

        this.setState({
            some: bbb
        });



        console.log(this.props.UserId);


    };




    submitCommit = async  (e) => {
        e.preventDefault();

        let userTitle = e.target.elements.commitTitle.value;
        let userText = e.target.elements.commitText.value;

        if (userTitle === '' || userText === ''){
            return(
                this.setState({
                    error: 'Поля ввода не могут быть пустыми'
                })
            )
        } else {
            const API_URL = await fetch(`http://localhost:4200/user/${this.props.UserId}`);
            const data = await API_URL.json();

            const allPost = data.post;



            let somePost = {
                title:userTitle,
                text:userText,
                id:data.post.length+1
            };

            allPost.push(somePost);

            this.setState({
                name: this.props.ThisName,
                password: this.props.UserPass,
                id: this.props.UserId,
                post:allPost,
                error: undefined
            });


            let user = JSON.stringify({
                name:this.state.name,
                password:this.state.password,
                id:this.state.id,
                post:this.state.post
            });


            let request = await new XMLHttpRequest();
            request.open("PATCH", `http://localhost:4200/user/${this.props.UserId}/`, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(user);


            await document.getElementById("myForm").reset();



            // придумать як замінить початок !!!!!!!!!!!!
            this.setState({
                header: data.post
            });

            const fff = [];
            let aaa;

            for (let i = 0; i <this.state.header.length; i++) {
                aaa = (
                    <div className={'post__list'} key={this.state.header[i].id}>
                        <p>{this.state.header[i].title}</p>
                        <p>{this.state.header[i].text}</p>
                    </div>
                );
                fff.push(aaa);

            }

            let bbb = fff.reverse();

            this.setState({
                some: bbb
            });
            // придумать як замінить кінець !!!!!!!!!!!!
        }

    };






    render() {
        return (
            <div className="app_Main">
                {this.props.goMain &&
                    <div className={'container'}>
                        <div className={'main__wrap'}>
                            <div className={'main__exit'}>
                                <button id={'exit'} onClick={this.props.exit} className={'exit'}>Выход</button>
                            </div>
                            <form id={'myForm'} onSubmit={this.submitCommit}>
                                <p id={'form__header'}>Приветствую {this.props.ThisName}</p>
                                <input placeholder={'Заголовок'} id={'form__title'} value={this.state.myValue} name={'commitTitle'} type={'text'}/>
                                <input placeholder={'Сообщение'} id={'form__text'} name={'commitText'} type={'text'}/>
                                <button id={'main__form__button'}>Добавить новый пост</button>
                                {this.state.error &&
                                <div className={'form__error'}>
                                    <p>{this.state.error}</p>
                                </div>
                                }
                            </form>
                            <div className={'post__wrap'}>
                                <form className={'getPost__form'} onSubmit={this.getPost}>
                                    <button>Показавать все посты</button>
                                </form>
                                <div className={'all__post'}>
                                    {this.state.some}
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default Main;