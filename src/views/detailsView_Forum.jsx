
export function DetailsViewForum(props){

    //Comment
    function showComment(){
        var commentArea = document.getElementById("comment-area");
        commentArea.classList.remove("hide");
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
            <div class="details_part2">
                <button onClick={showDetailsACB} class="details_part2_abilities">Details</button>
                <button onClick={showSpeciesACB} class="details_part2_abilities">Species</button>
                <button onClick={showForumACB} class="details_part2_abilities">Forum</button>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine3"></div>
            </div>
            <div class="details_forum">
                <ul>
                    <li>
                        <div class="forum_card">
                            {/* <!--Another Comment With replies--> */}
                            <div class="comments-container">
                                <div class="comments-body">
                                    <div class="username">User Name</div>
                                    <div class="content">
                                        Just a comment of the above random topic.
                                        <div class="comment">
                                            <button onclick={showReply}>Reply</button>
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
                                        <div class="username">User Name2</div>
                                        {/* <div>Role</div> */}
                                        {/* <img src="https://cdn.pixabay.com/photo/2015/11/06/13/27/ninja-1027877_960_720.jpg" alt=""/> */}
                                        {/* <div>Posts: <u>455</u></div>
                                        <div>Points: <u>4586</u></div> */}
                                    </div>
                                    <div class="content">
                                        Just a comment of the above random topic2.
                                        <div class="comment">
                                            <button onclick={showReply}>Reply</button>
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