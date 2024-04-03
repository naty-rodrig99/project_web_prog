import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"

export function NavbarView(props){
    return (
    <html>
        <body>
            <nav class='navbar'>
                <ul>
                    <li class="float_right"><a href="#/main"><i class="fa-solid fa-user"></i></a></li>
                    <li class="float_right"><a href="#/main">Map</a></li>
                    <li class="float_right"><a href="#/details">Details</a></li>
                    <li class="float_right"><a href="#/main">Home</a></li>
                    <li class="float_left"><img alt="picture of pokemon" src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"></img></li>
                </ul>
            </nav>
        </body>
    </html>
    )
}