import React, { useState, useEffect } from 'react';
import { readCommentsFromFirebase } from '../firebaseModel';

export function DetailsViewForum(props) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     if (props.user && props.pokemon && props.pokemon.id) {
    //         readCommentsFromFirebase(props.user, props.pokemon.id)
    //             .then(fetchedComments => {
    //                 setComments(fetchedComments);
                    
    //             })
    //             .catch(error => {
    //                 console.error('Failed to fetch comments:', error);
    //             });
    //     }
    // }, [props.user, props.pokemon]);

    function handleCommentChange(event) {
        setCommentText(event.target.value);
    }

    function addCommentACB() {
        const timestamp = new Date().toLocaleTimeString();
        props.addComment(commentText, props.pokemon.id, timestamp);
        setComments(prevComments => [...prevComments, { comment: commentText, pokemon: props.pokemon.id, timestamp }]);
        setCommentText('');
        console.log("hello", props.comments);
    }

    return (
        <div>
            <div className="details_forum">
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <div className="forum_card">
                                <div className="comments-container">
                                    <div className="comments-body">
                                        <div className="username">{comment.username || "You"}</div>
                                        <div className="comment" type="text">{comment.comment}</div>
                                        <div className="timestamp">{comment.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    <li>
                        <div className="forum_card">
                            <div className="comments-container">
                                <input
                                    className="team_input_teamName"
                                    type="text"
                                    value={commentText}
                                    onChange={handleCommentChange}
                                    placeholder="Add a comment..."
                                />
                                <button onClick={addCommentACB}>Add comment</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
