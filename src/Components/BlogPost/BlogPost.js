import React, { Component } from 'react';
import './BlogPost.css';
require('dotenv').config()

class BlogPost extends Component {
    constructor(){
        super();
        this.state = {
            post: null,
            postid: null,
            comments: [],
            content: null,
            title: null,
            date: null,
            postImage: null,
            video: null,
            members: [],
            user: null,
            commentBody: null,
            bodu: null,
        }
    }

    componentDidMount = () => {

        this.getPost();

        this.getUser();

    }

    getUser = async() => {
        if(localStorage.getItem('currentUser') === null) {
            this.setState({
                user: null,
            })
        } else {
            let userMail = localStorage.getItem('currentUser')
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/members/email/${userMail}`, {
                method: 'GET'
            });
            let myres = await response.json()

            this.setState({
                user: myres.id
            })
        }
    }

    getPost = async() => {
        let MyPost = this.props.match.params.postName

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/blogposts/${MyPost}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            post: myres,
            postid: myres.id,
            content: myres.Content,
            title: myres.Title,
            date: myres.DateOfWriting.split('T')[0],
            postImage: myres.Image ? `/photos/photoSrc/posts/${myres.Image}` : null,
            video: myres.Video
        }, () => {
            this.getComments(this.state.postid);
        })
    }

    getComments = async(postid) => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/comments/commentsbypost/${postid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            comments: myres,
        }, () => {
            this.getMembers()
        })
    }

    getNames = () => {
        let memarr = [...this.state.members]
        let commarr = [...this.state.comments]
        for (let j in commarr) {
            for(let i in memarr) {
                if(commarr[j].MemberId === memarr[i].id) {
                    commarr[j].Name = memarr[i].FirstName
                }
            }
        }

        this.setState({
            comments: commarr
        })
    }

    getMembers = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/members`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            members: myres,
        }, () => {this.getNames()})
    }

    addComment = async() => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/comments/`, {
            method: 'POST',
            headers: {
                "Accept": "multipart/form-data",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                memberId: this.state.user,
                postId: this.state.postid,
                content: this.state.commentBody,
            }),
        });

        const body = await response.text();

        this.setState({
            body: body,
        },() => {
            window.location.reload()
        })


    }

    render () {
        let commentsNum;
        if (this.state.comments) {
            commentsNum = this.state.comments.length
        } else {
            commentsNum = 0;
        }

        let textAre;
        if(this.state.user !== null) {
            textAre = <textarea className="bg-gray-300 border border-black" rows="4" cols="40" style={{resize: "none"}} onChange = {(event) => {this.setState({commentBody: event.target.value})}}/>
        } else {
            textAre = <textarea disabled className="bg-gray-300 opacity-50 border border-black" rows="4" cols="40" style={{resize: "none"}}/>
        }

        let sendBtn;
        if(this.state.user !== null && this.state.commentBody !== null && this.state.commentBody.length) {
            sendBtn = <button onClick={() => {this.addComment()}} className="text-yellow-100 bg-yellow-600 rounded text-xl py-1 px-2 mb-5 cursor-default hover:bg-yellow-200 hover:text-yellow-600 border hover:border-yellow-600">Add Comment</button>
        } else {
            sendBtn = <button className="text-yellow-100 bg-yellow-600 rounded text-xl py-1 px-2 mb-5 opacity-75 cursor-default" disabled>Add Comment</button>
        }

        return(    
            <main className="BlogPosts">
                <div className="thePost w-1/2 bg-yellow-100 mx-auto my-10 pb-5 rounded-t-lg">
                    <div className="PostBody text-2xl pb-2">
                        <div className="theHeader py-4 bg-yellow-900 px-4 rounded-t-lg">
                            <h1 className="text-yellow-50 text-5xl">{this.state.title}</h1>
                            <p className="text-yellow-200">{this.state.date}</p>
                        </div>
                        <div className="theContent pt-4 px-4 mb-3">
                            {this.state.postImage && 
                                <div>
                                    <img src={this.state.postImage} height="250px" className="float-left mr-4 my-3" alt="postImage"/>
                                </div>
                            }
                            {this.state.content && 
                                <div>
                                    {this.state.content}
                                </div>
                            }
                        </div>
                        {this.state.video && 
                            <div>
                                <iframe 
                                    width="560" 
                                    height="315" 
                                    src={this.state.video} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscree
                                    className="my-10 mx-auto"
                                    title="postVideo"
                                ></iframe>
                            </div>
                        }
                    </div>
                    <hr className="my-3"/>
                    <div className="Comments px-4">
                        <div className="addComment">
                            <h1 className="text-3xl text-yellow-800 pt-5">Add a comment!</h1>
                            <p className="text-xl">*for registered users only</p>
                            {textAre}
                            <br />
                            {sendBtn}
                        </div>
                        <hr/>
                        <div className="writtenComments">
                            <h1 className="text-4xl text-yellow-700">Comments ({commentsNum})</h1>
                            {this.state.comments && this.state.comments.map(comment => (
                                <div className="bg-yellow-700 my-5 p-2 text-2xl rounded-tl-lg rounded-tr-lg rounded-br-lg">
                                    <div className="w-1/2">
                                        <p className="float-right mr-48">{comment.DateOfWriting.split('T')[0]}</p>
                                        <p>
                                            <img src="https://via.placeholder.com/30" className="float-left mr-2" alt={comment.MemberId}/>
                                            <span>{comment.Name}</span>
                                        </p>
                                    </div>
                                    <p>{comment.Content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default BlogPost;