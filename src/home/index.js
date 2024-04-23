import MainComponent from "./main";
import {useSelector} from "react-redux";
import HomeWatchListTable from "./home-watchlist-table"

import React from "react";


function Home() {
    const {currentUser} = useSelector((state)=> state.users)

    return (
            <div className="container">
                <div className={"row pt-3"}> <h2 className={"text-center"}>Welcome to CoinChat</h2></div>
                <div className={"row pt-3"}> <h2 className={"text-center "}>Explore the Cryptoeconomy</h2></div>
                {
                    currentUser &&
                    <h3>Hi {currentUser.firstName}!
                    </h3>
                }
                {
                    currentUser &&
                    <h5>You have been watching the following coins:</h5>
                }
                {
                    currentUser &&
                    <HomeWatchListTable uid={currentUser?._id} />
                }

                <div className={"row pt-3"}>
                    <div className={"col-3"}> <h3> Trending Now! </h3></div>
                </div>
                <div className="row">
                    <MainComponent/>
                </div>
           </div>
    );
}

export default Home;