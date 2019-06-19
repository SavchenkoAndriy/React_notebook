import React from 'react';
import OnePost from './onePost';

class Post extends React.Component {

    state = {
        postInfo: this.props.postInfo,
        error: this.props.errorPost
    };

    constructor(props) {
        super(props);
        if(this.props.postInfo.length === 0){
            this.state.error = 'У вас пока нету постов';
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            postInfo: nextProps.postInfo,
            error: nextProps.errorPost
        });
    }

    render() {
        let postInfo = this.state.postInfo;

        let postList = [];
        let onePost;
        for (let i = 0; i <postInfo.length; i++) {
            onePost = (
                <div className={'post__list'} key={postInfo[i].id}>
                    <button name={postInfo[i].id} onClick={this.props.del}>Del</button>
                    <OnePost
                        postTitle = {postInfo[i].title}
                        postText = {postInfo[i].text}
                        postId = {postInfo[i].id}
                        id = {this.props.id}
                        name={this.props.name}
                        password={this.props.password}
                        post = {this.props.postInfo}
                    />
                </div>
            );
            postList.push(onePost);
        }
        let list = postList.reverse();



        return (
            <div>
                {this.state.error &&
                    <div>{this.state.error}</div>
                }
                {list}
            </div>
        )
    }
}

export default Post;