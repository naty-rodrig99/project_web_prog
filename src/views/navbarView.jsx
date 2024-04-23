import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"

export function NavbarView(props){
    return (
    <html>
        <body>
            <nav class='navbar'>
                <ul>
                    <li class="float_left"><a href="#/main"><img alt="picture of pokemon" src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"/></a></li>
                    <li class="float_right"><a href="#/main">Home</a></li>
                    <li class="float_right"><a href="#/main">Team</a></li>
                    <li class="float_right"><a href="#/user"><i class="fa-solid fa-user"></i></a></li>
                </ul>
            </nav>
        </body>
    </html>
    )
}