
export function DetailsViewForum(props){
    
    function showDetailsACB(){
        props.setCurrentView("details")
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
        </div>
    );
}