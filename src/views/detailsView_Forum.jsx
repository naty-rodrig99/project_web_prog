
export function DetailsViewForum(props){

    //Comment
    function addCommentACB(){
        const inputElement = document.querySelector('.team_input_teamName');
        const commentArea = inputElement.value;
        //var commentArea = document.getElementById("comment-area");
        //commentArea.classList.remove("hide");
        props.addComment(commentArea, props.pokemon.id, "12:00");  
    }

    //Reply
    function showReply(){
        console.log("user wanna reply")
        replyArea.classList.remove("hide");
    }

    function showDetailsACB(){
        props.setCurrentView("details")
        //props.pokemonFunction()
    }
    function showSpeciesACB(){
        props.setCurrentView("species")
    }

    function showForumACB(){
        props.setCurrentView("forum")
    }

    
    return (
        <div>
            {/* <div class="details_part2">
                <button onClick={showDetailsACB} class="details_part2_abilities">Details</button>
                <button onClick={showSpeciesACB} class="details_part2_abilities">Species</button>
                <button onClick={showForumACB} class="details_part2_abilities">Forum</button>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine3"></div>
            </div> */}
            <div class="details_forum">
                <ul>
                    <li>
                        <div class="forum_card">
                            {/* <!--Another Comment With replies--> */}
                            <div class="comments-container">
                                <div class="comments-body">
                                    <div class="username">John</div>
                                    <div class="content">
                                    <input class="team_input_teamName" type="text" />
                                        <div class="comment">
                                            <button onClick={addCommentACB}>Add comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Reply Area--> */}
                            <div class="comment-area hide" id="reply-area">
                                <textarea name="reply" id="" placeholder="reply here ... "></textarea>
                                <input type="submit" value="submit"/>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="forum_card">
                            {/* <!--Another Comment With replies--> */}
                            <div class="comments-container">
                                <div class="comments-body">
                                    <div class="authors">
                                        <div class="username">Julie</div>
                                        <div class="comment" type="text">I love this pokemon!</div>
                                        <div class="comment">
                                            <button onClick={addCommentACB}>Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Reply Area--> */}
                            <div class="comment-area hide" id="reply-area">
                                <textarea name="reply" id="" placeholder="reply here ... "></textarea>
                                <input type="submit" value="submit"/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="forum_card">
                            {/* <!--Another Comment With replies--> */}
                            <div class="comments-container">
                                <div class="comments-body">
                                    <div class="authors">
                                        <div class="username">Bob</div>
                                        <div class="comment" type="text">Hi guys!!</div>
                                        <div class="comment">
                                            <button onClick={addCommentACB}>Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Reply Area--> */}
                            <div class="comment-area hide" id="reply-area">
                                <textarea name="reply" id="" placeholder="reply here ... "></textarea>
                                <input type="submit" value="submit"/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="forum_card">
                            {/* <!--Another Comment With replies--> */}
                            <div class="comments-container">
                                <div class="comments-body">
                                    <div class="authors">
                                        <div class="username">Robert</div>
                                        <div class="comment" type="text">It's so strong!</div>
                                        <div class="comment">
                                            <button onClick={addCommentACB}>Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Reply Area--> */}
                            <div class="comment-area hide" id="reply-area">
                                <textarea name="reply" id="" placeholder="reply here ... "></textarea>
                                <input type="submit" value="submit"/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}