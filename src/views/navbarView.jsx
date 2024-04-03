import "../style.css"
export function NavbarView(props){
    return (
    <html>
        <body>
            <nav class='navbar'>
                <ul>
                    <li class="float_right"><a href="#/main">ProfilePicture</a></li>
                    <li class="float_right"><a href="#/main">Donate</a></li>
                    <li class="float_right"><a href="#/main">Map</a></li>
                    <li class="float_right"><a href="#/main">Home</a></li>
                    <li class="float_left"><a href="#/main">Endangered Atlas</a></li>
                </ul>
            </nav>
        </body>
    </html>
    )
}