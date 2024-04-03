
export function DetailsView(props){

    function showDetailsACB(){
        props.pokemonFunction()
    }

    return (
        <div>
            <button onClick={showDetailsACB}>Show</button>
            <div class="details_part1">
                <img class="details_part1_img1" src={props.pokemon.sprites.front_shiny}></img>
                <div class="details_part1_name">{props.pokemon.name}</div>
                <img class="details_part1_img2" src='src\icons\empty_heart.png'></img>
            </div>
            <div class="details_part2">
                <a href="#/main" class="details_part2_abilities">Abilities</a>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine"></div>
                <div style={{width: 135, height: 35, textAlign: 'right', color: 'black', fontSize: 25, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Population</div>



            </div>
            
        </div>
    )
}