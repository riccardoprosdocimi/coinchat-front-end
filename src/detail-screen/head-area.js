import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addWatchlistThunk, findWatchlistThunk, removeWatchlistThunk,} from "../services/watchlist-thunks";


const HeadArea = () => {

    const {currentUser} = useSelector(state => state.users);
    const {coinData, fetching, error} = useSelector((state) => {
        return state.coinData;
    });
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
        if (wl.coinID === coinData.id) {
            watchState = true;
            watchlistID = wl._id;
        }
    }

    const addWatchlistItem = () => {
        if (!currentUser) {
            alert("Please log in to add coins to your watchlist")
            return
        }
        const watchlistItem = {
            uid: currentUser._id,
            coinID: coinData.id
        }
        dispatch(addWatchlistThunk(watchlistItem))
        setWatchStateFlag(true);
    }

    function removeWatchlistItem() {
        if (!currentUser) {
            alert("Please log in to add coins to your watchlist")
            return
        }
        dispatch(removeWatchlistThunk(watchlistID))
        setWatchStateFlag(false);
    }

    if (error) {
        return <h4>
            {error}<br/>
            Probable cause: Maximum API calls reached, please wait a minute
        </h4>;
    }

    return(
        !error && fetching?
            <h4>Loading...</h4>:
        <div className="pt-4 ">
            <div className="d-flex col-12">
                <h3 className={""}><img src={coinData.image.large} width={"36px"} alt={"The icon of this coin"}/> {coinData.name}  {coinData.symbol}</h3>
                {
                    !watchState || !currentUser ?

                        <button onClick={() => addWatchlistItem()}
                                className="btn ms-3 wd-btn-style">
                            Add to Watchlist
                        </button>
                        : <button onClick={() => removeWatchlistItem()}
                            className="btn ms-3 wd-btn-style-negative">
                        Remove from Watchlist
                        </button>
                }

            </div>
        </div>

    );
}

export default HeadArea;