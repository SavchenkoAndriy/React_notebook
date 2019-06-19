import React from 'react';
import Post from './post';

import './sass/main.sass';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state.postInfo = this.props.postInfo;
    }

    state = {
        error: undefined,
    };


    getPost = async  (e) => {
        e.preventDefault();
        const API_URL = await fetch(`http://localhost:4200/user/${this.props.id}`);
        const data = await API_URL.json();
        this.setState({
            postInfo: data.post,
        });
    };

    submitCommit = async  (e) => {
        e.preventDefault();

        let id = this.props.id;

        let userTitle = e.target.elements.commitTitle.value;
        let userText = e.target.elements.commitText.value;

        if (userTitle === '' || userText === ''){
            return(
                this.setState({
                    error: 'Поля ввода не могут быть пустыми'
                })
            )
        } else {
            const API_URL = await fetch(`http://localhost:4200/user/${id}`);
            const data = await API_URL.json();
            const allPost = await data.post;

            let somePost = await {
                title: userTitle,
                text: userText,
                id: allPost.length
            };

            allPost.push(somePost);

            this.setState({
                name: this.props.name,
                password: this.props.password,
                id: this.props.id,
                post: allPost,
                error: undefined
            });

            let user = JSON.stringify({
                name:this.state.name,
                password:this.state.password,
                id:this.state.id,
                post:this.state.post
            });

            let request = await new XMLHttpRequest();
            request.open("PATCH", `http://localhost:4200/user/${this.state.id}/`, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(user);

            await document.getElementById("myForm").reset();

            this.setState({
                postInfo: data.post,
                errorPost: undefined
            });
        }
    };

    del = async  (event) => {
        event.preventDefault();

        let postId = event.target.name;


        const API_URL = await fetch(`http://localhost:4200/user/${this.props.id}`);
        const data = await API_URL.json();


        data.post.splice(postId,1);

        for (let i=0; i < data.post.length; i++){
            data.post[i].id = i;
        }


        let user = JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            id: this.state.id,
            post: data.post,
        });

        let request = await new XMLHttpRequest();
        request.open("PATCH", `http://localhost:4200/user/${this.props.id}/`, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(user);

        this.setState({
            postInfo: data.post,
        });

        if(data.post.length === 0){
            this.setState({
                errorPost: 'У вас пока нету постов',
            });
        }
    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            postInfo: nextProps.postInfo,
        });
    }




    render() {
        return (
            <div className="app_Main">
                {this.props.goMain &&
                    <div className={'container'}>
                        <div className={'main__wrap'}>
                            <div className={'main__exit'}>
                                <button id={'delete'} onClick={this.props.delete} className={'delete'}>Удалить позьлователя</button>
                            </div>
                            <div className={'main__exit'}>
                                <button id={'exit'} onClick={this.props.exit} className={'exit'}>Выход</button>
                            </div>
                            <form id={'myForm'} onSubmit={this.submitCommit}>
                                <p id={'form__header'}>Приветствую {this.props.name}</p>
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
                                    {this.state.postInfo &&
                                        <Post
                                            del={this.del}
                                            postInfo={this.state.postInfo}
                                            id = {this.props.id}
                                            name={this.props.name}
                                            password={this.props.password}
                                            errorPost = {this.state.errorPost}
                                        />
                                    }
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