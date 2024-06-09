import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {useSelector} from "react-redux";
import SearchResultList from "./search-result-list";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
//
// function Items({ currentItems }) {
//     return (
//         <>
//             {currentItems &&
//                 currentItems.map((item) => (
//                     <div>
//                         <h3>Item #{item}</h3>
//                     </div>
//                 ))}
//         </>
//     );
// }

function SearchResultPagination({ itemsPerPage }) {
    const { resList, loading, error } = useSelector((state) => state.resList);
    const [firstLoad, setFirstLoad] = useState(true);

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    const currentItems = resList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(resList.length / itemsPerPage);

    // Invoked when user clicks to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % resList.length;
        setItemOffset(newOffset);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Handle return key press event
            setFirstLoad(false)
        }
    };
    const handleClick = () => {
        // Handle click event
        setFirstLoad(false)
    };

    useEffect(() => {
        // Add event listener for key press
        document.body.addEventListener('keydown', handleKeyPress);
        // Add event listener for search button click
        const searchButton = document.getElementById('searchButton');
        if (searchButton) {
            searchButton.addEventListener('click', handleClick);
        }
        // Clean up event listeners on component unmount
        return () => {
            document.body.removeEventListener('keydown', handleKeyPress);
            searchButton.removeEventListener('click', handleClick);
        };
    }, []);

    if (error) {
        return <h4>
            {error}<br/>
            Probable cause: Maximum API calls reached, please wait a minute
        </h4>;
    }

    if (loading) {
        return <h4>Loading...</h4>;
    }

    return (
        <>
            <SearchResultList resList={currentItems} />
            <nav aria-label="Page navigation comments">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="previous"
                    renderOnZeroPageCount={
                        () => {
                            if (firstLoad) {
                                return null
                            } else {
                                return <h4>No coins found</h4>
                            }
                        }
                    }
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                />
            </nav>
        </>
    );
}

export default SearchResultPagination;