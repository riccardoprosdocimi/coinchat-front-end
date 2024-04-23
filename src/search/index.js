import React from "react";
import SearchBar from "./search-bar";
import SearchResultPagination from "./search-result-pagination";


const Search = () => {
    return(
            <div className="container col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-sm-11 col-12 mt-5">
                <SearchBar />
                <SearchResultPagination itemsPerPage={5}/>

            </div>
    );

}

export default Search;