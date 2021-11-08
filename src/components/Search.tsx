import React from "react";
import SearchBar from "material-ui-search-bar";

const Search: React.FC = () => {
    return (
        <div className="searchbar">
            <SearchBar
            placeholder="Search"
            />
        </div>
    )
}

export default Search;