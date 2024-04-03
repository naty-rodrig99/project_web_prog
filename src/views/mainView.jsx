import "../style.css"
export function MainView(props){
    function logACB(evt){
        console.log('Clicked')
        console.log(props.search("ditto"))
        console.log(evt)
    }
    return (
    <div class="mainContainer">
        <button onClick={logACB}>Click me!</button>
    </div>
    )
}