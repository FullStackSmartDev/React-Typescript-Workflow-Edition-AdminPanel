import React from "react";
import { Button } from '@material-ui/core';
import justin from "../../../../../../../assets/icons/commented-person.svg";
import ryan from "../../../../../../../assets/icons/ryan.svg";
import rao from "../../../../../../../assets/icons/rao.svg";

import "./Note.scss";

export default class Note extends React.Component<any, any> {

    state = {
        input: "",
        comment: "",
        commentList: [
            {
                photo: ryan,
                name: "Ryan Tait",
                date: "01/02/2021",
                comment: "Look, Ma! Another note being added..."
            },
            {
                photo: justin,
                name: "Justin Sckena",
                date: "01/02/2021",
                comment: "Member no longer has a transplant scheduled. Post-dated attribute term."
            },
            {
                photo: rao,
                name: "Raghu Rao",
                date: "01/02/2021",
                comment: "Added new attribute; member has a transplant scheduled."
            }
        ]
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    commentList () {
        let commentList = this.state.commentList.map((res,index) => {
            return(
                <div className="comment-wrapper">
                    <div className="name-date-img">
                        <div className="photo-icon">
                            <img src={res.photo} />
                        </div>
                        <div className="date-comment">
                        <span>{res.name}</span>
                        <span className="dated">{res.date}</span>
                        <p>{res.comment}</p>
                        </div>
                    </div>
                </div>
            )
        })
        return commentList
    }

    addComment(e) {
        if(this.state.input.length > 0){
            e.preventDefault();
            const {commentList} = this.state
            const newCommnet = {
                photo: justin,
                name: "Justin",
                date: "01/02/2021",
                comment: this.state.input
            }
            this.setState({commentList: [newCommnet, ...this.state.commentList]})
            this.setState({input: ""})
        }
    }
    render() {
        let commentList = this.commentList();
        return (
            <div className="note-container">
                <form onSubmit={(e) => this.addComment(e)}>
                    <div className="write-comment">
                        <span>Comment</span>
                        <input type="text" value={this.state.input} onChange={(e) => this.handleChange(e) } />
                        <div className="btn">
                            <Button type="submit">Add</Button>
                        </div>
                    </div>
                </form>
                <div className="comment-list">
                    {commentList}
                </div>
            </div>
        )
    }
}