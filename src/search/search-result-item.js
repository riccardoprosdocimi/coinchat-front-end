import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addWatchlistThunk, findWatchlistThunk, removeWatchlistThunk} from "../services/watchlist-thunks";

const SearchResultItem = ({result}) => {
    const {currentUser} = useSelector(state => state.users);
    const {watchlist} = useSelector(state => state.watchlist);

    const [watchStateFlag, setWatchStateFlag] = useState(false)

    const dispatch = useDispatch()
    // if user is login, get all related watchlist records
    useEffect(
        () => {
            currentUser && dispatch(findWatchlistThunk(currentUser._id))
        },
        [currentUser, dispatch, watchStateFlag]
    )

    let watchState = false;
    let watchlistID = null;

    for (const wl of watchlist) {
        if (wl.coinID === result.id) {
            watchState = true;
            watchlistID = wl._id;
        }
    }


    const addWatchlistItem = (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Please login before add to watchlist")
            return
        }
        const watchlistItem = {
            uid: currentUser._id,
            coinID: result.id
        }
        dispatch(addWatchlistThunk(watchlistItem))
        setWatchStateFlag(true);
    }

    function removeWatchlistItem(e) {
        e.preventDefault();
        if (!currentUser) {
            alert("Please login before add to watchlist")
            return
        }
        dispatch(removeWatchlistThunk(watchlistID))
        setWatchStateFlag(false);
    }

    return(
        <Link to={{ pathname: '../detail',
                    search: "coinID="+result.id}}
              className="list-group-item list-group-item-action card mb-2">
            <h5 className="card-header"><img src={result.large} width={"24px"} alt={"The icon of this coin"}/> {result.name}</h5>
            <div className="card-body d-flex">
                <h5 className="card-title">M.Cap Rank: {result.market_cap_rank}</h5>
                {
                    !watchState || !currentUser ?

                        <button onClick={(e) => addWatchlistItem(e)}
                                className="btn btn-sm ms-auto wd-btn-style">
                            Add Watchlist
                        </button>
                        : <button onClick={(e) => removeWatchlistItem(e)}
                                  className="btn btn-sm ms-auto wd-btn-style-negative">
                            Remove Watchlist
                        </button>
                }
            </div>
        </Link>

    );

}

export default SearchResultItem;