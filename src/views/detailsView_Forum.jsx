import React, { useState, useEffect } from 'react';
import { readCommentsFromFirebase } from '../firebaseModel';

export function DetailsViewForum(props) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (props.pokemon && props.pokemon.id) {
            readCommentsFromFirebase(props.pokemon.id)
                .then(fetchedComments => {
                    setComments(fetchedComments);
                })
                .catch(error => {
                    console.error('Failed to fetch comments:', error);
                });
        }
    }, [props.pokemon]);

    function handleCommentChange(event) {
        setCommentText(event.target.value);
    }

    function addCommentACB() {
        const timestamp = new Date().toLocaleTimeString();
        props.addComment(commentText, props.pokemon.id, timestamp);
        setComments(prevComments => [...prevComments, {comment: commentText, username: "Current User", timestamp: timestamp}]);
        setCommentText('');
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
                                        <div className="username">{comment.username || "Anonymous"}</div>
                                        <div className="comment" type="text">{comment.comment}</div>
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
