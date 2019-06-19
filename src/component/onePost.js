import React from 'react';

class OnePost extends React.Component {
    state = {
        showPost: true,
        showRedact: false,
        postTitle: this.props.postTitle,
        postText: this.props.postText,
    };

    redact = ()=>{
        this.setState({
            showPost: false,
            showRedact: true
        })
    };

    Cancel = () => {
        this.setState({
            showPost: true,
            showRedact: false
        });
    };




    goRedact = async (e) => {

        e.preventDefault();

        let aaa = 'newTitle'+this.props.postId;
        let bbb = 'newText'+this.props.postId;


        // let newPostTitle = document.getElementsByName(aaa)[0].value;
        // let newPostText = document.getElementsByName(bbb)[0].value;

        let newPostTitle = document.getElementsByName(aaa)[0].value;
        let newPostText = document.getElementsByName(bbb)[0].value;



        let Arr = this.props.post;
        let f = this.props.postId;
        let newPost = {
            id: f,
            title: newPostTitle,
            text: newPostText,
        };


        Arr.forEach(function(item, i) {
            if (item === Arr[f])
                Arr[i] = newPost;
        });


        let user = JSON.stringify({
            name: this.props.name,
            password: this.props.password,
            id: this.props.id,
            post: Arr,
        });

        let request = await new XMLHttpRequest();
        request.open("PATCH", `http://localhost:4200/user/${this.props.id}/`, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(user);

        this.setState({
            showPost: true,
            showRedact: false,
            postTitle: newPostTitle,
            postText: newPostText,
        });

    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            postTitle: nextProps.postTitle,
            postText: nextProps.postText,
        });
    }

    render(){
        // console.log(this.state.postTitle);
        // console.log(this.state.postText);
        return(
            <div>
                {this.state.showPost &&
                <div>
                    <p>{this.state.postTitle}</p>
                    <p>{this.state.postText}</p>
                    <button onClick={this.redact}>Redact</button>
                </div>
                }
                {this.state.showRedact &&
                <div>
                    <input placeholder={"Новый заголовок"} name={'newTitle'+this.props.postId} type={'text'}/>
                    <input placeholder={"Новый текст"} name={'newText'+this.props.postId} type={'text'}/>
                    <button onClick={this.goRedact}>Go Redact</button>
                    <button onClick={this.Cancel}>Cancel</button>
                </div>
                }
            </div>
        )
    }
}

export default OnePost;