
export function DetailsViewSpecies(props){
    console.log("props in species", props);
    
    function showDetailsACB(){
        props.setCurrentView("details")
    }

    function showSpeciesACB(){
        props.setCurrentView("species")
    }

    function showForumACB(){
        props.setCurrentView("forum")
    }

    function showCaptureRate(){
        props.togglePopupCaptureRate();
    }

    function showHappiness(){
        props.togglePopupHappiness();
    }

    function showGrowthRate(){
        props.togglePopupGrowthRate();
    }

    return (
        <div>
            {/* <div class="details_part2">
                <button onClick={showDetailsACB} class="details_part2_abilities">Details</button>
                <button onClick={showSpeciesACB} class="details_part2_abilities">Species</button>
                <button onClick={showForumACB} class="details_part2_abilities">Forum</button>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine2"></div>
            </div> */}

            <div >
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Name:</span>
                    <span class="details_part2_item1">{props.species.name}</span>
                  </div>
                  <div class="details_part2_div1">
                    <span class="details_part2_headline2">Color:</span>
                    <span class="details_part2_item1">{props.species.color.name}</span>
                </div>
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Shape:</span>
                    <span class="details_part2_item1">{props.species.shape.name}</span>
                </div>
                <div class="details_part2_div1">
                    <span><button class="team_info_button" onClick={showCaptureRate}>i</button></span>
                    <span class="details_part2_headline2">Capture Rate:</span>
                    <span class="details_part2_item1">{props.species.capture_rate}</span>
                    <span class="details_part2_item_units"> out of 255</span>
                </div>
                <div class="details_part2_div1">
                    {props.showPopupCaptureRate && <div className="details_part2_popup">The base capture rate; up to 255. The higher the number, the easier the catch.</div>}
                </div>
                <div class="details_part2_div1">
                    <span><button class="team_info_button" onClick={showHappiness}>i</button></span>
                    <span class="details_part2_headline2">Base Happiness:</span>
                    <span class="details_part2_item1">{props.species.base_happiness}</span>
                    <span class="details_part2_item_units"> out of 255</span>
                </div>
                <div class="details_part2_div1">
                    {props.showPopupHappiness && <div className="details_part2_popup">The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.</div>}
                </div>
                <div class="details_part2_div1">
                    <span><button class="team_info_button" onClick={showGrowthRate}>i</button></span>
                    <span class="details_part2_headline2" >Growth Rate:</span>
                    <span class="details_part2_item1">{props.species.growth_rate.name}</span>
                </div>
                <div class="details_part2_div1">
                    {props.showPopupGrowthRate && <div className="details_part2_popup">The rate at which this Pokémon species gains levels.</div>}
                </div>
            </div>
        </div>
    );
}