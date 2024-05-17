export function DetailsViewForum(props) {

    function handleCommentChange(event) {
        setCommentText(event.target.value); //get specific comments for the user
    }

    function addCommentViewACB(evt){
        const inputElement = document.querySelector('.team_input_teamName');
        const timestamp = new Date().toLocaleTimeString();
        props.addComment(inputElement.value, props.pokemon.id, timestamp)
    }
   
    function commentsCB(comment){
        console.log(comment)
        return <li key={comment.pokemon}>
                    <div className="forum_card">
                        <div className="comments-container">
                            <div className="comments-body">
                                <div className="username">{/*comment.username || "You"*/}</div>
                                <div className="comment" type="text">{comment.comment}</div>
                                <div className="timestamp">{comment.timestamp}</div>
                            </div>
                        </div>
                    </div>
                </li>
    }
    console.log('commentList'+props.comments)
    return (
        <div>
            <div className="details_forum">
                <div className="forum_card">
                    <div className="comments-container">
                        <input
                            className="team_input_teamName" type="text"placeholder="Add a comment..."/>
                        <button onClick={addCommentViewACB}>Add comment</button>
                    </div>
                    <div >
                        {props.comments ? props.comments.map(commentsCB) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}