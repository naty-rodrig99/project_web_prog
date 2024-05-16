import React, { useState, useEffect } from 'react';

export function DetailsViewForum(props) {
    const [commentText, setCommentText] = useState('');

    function handleCommentChange(event) {
        setCommentText(event.target.value);
    }
   
    function commentsCB(pokemon){
        function addCommentViewACB(evt){
            props.addComment(commentText, props.pokemon.id, timestamp)
        }
        return <div key={pokemon.id} className="team_carouselItem">
                    <div className="team_resultCard">
                        <ul>
                            <li className="team_resultCardName">{pokemon.name}</li>
                            <li><button className="team_cardButtonLearnMore" onClick={changeToDetails}>Learn More</button></li>
                        </ul>
                    </div>

                </div>;
    }

    return (
        <div>
            <div className="details_forum">
                <ul>
                    {props.comments.map((comment, index) => (
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
                                <button onClick={addCommentViewACB}>Add comment</button>
                            </div>
                            <div className="team_carousel">
                                {props.commentList.map(commentsCB)}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
