
import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"

export function UserPageView(props){


    return (
        <div>
            <div class="favoriteList">
            <ul>
                <li>
                    <div className="resultCard">
                        This is img
                        <ul>
                            <li className="resultCardName">name</li>
                            <li><button>Learn More</button></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="resultCard">
                        This is img
                        <ul>
                            <li className="resultCardName">name</li>
                            <li><button>Learn More</button></li>
                        </ul>
                    </div>
                </li>
            </ul>
            </div>
            
            
        </div>
    );
}