// Utility function to format location names
function formatLocationName(name) {
    return name
        .split('-')          // Split the string by hyphens
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
        .join(' ');          // Join the words with spaces
}

export function DetailsViewLocation(props) {
    
const locationAreas = props.locations?.length ? (
        props.locations.map((location, index) => (
            <li key={index} className="location-item">
                {location.location_area && formatLocationName(location.location_area.name)}
            </li>
        ))
    ) : (
        <li>Sorry, this Pokémon cannot be found in any locations. Try searching for another Pokémon!</li>
    );

    return (
        <div className="details-container">
            <div>
                <div className="details_part2_div1">
                    <span className="details_part2_headline2">Locations:</span>
                    <ul className="location-list">
                        {locationAreas}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DetailsViewLocation;
