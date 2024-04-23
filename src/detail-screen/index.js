import React, {useEffect} from "react";
import LineChartArea from "./line-chart-area";
import CommentArea from "./comment-area";
import HeadArea from "./head-area";
import {useSearchParams} from "react-router-dom";
import {CoinDataThunk} from "../services/detail-thunks";
import {useDispatch} from "react-redux";
import AboutArea from "./about-area";
import BlogArea from "./blog-area";

const Detail = () => {
    let [searchParams] = useSearchParams();
    const coinID = searchParams.get("coinID");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CoinDataThunk(searchParams.get("coinID")));
    }, [dispatch, searchParams])

    if (coinID === null || coinID.length === 0) {
        return (
            <h1>This is an Easter Egg!</h1>
        )
    }

    return (

        <div className="d-xxl-flex d-xl-flex d-lg-flex">
            <div className={"col-xxl-9 col-xl-8 col-lg-8 col-12 px-xxl-4 px-xl-2 px-lg-1 border-end d-flex justify-content-center"}>
                <div className={"col-xxl-10 col-xl-10 col-lg-11 col-md-10 col-sm-11 col-12"}>
                    <HeadArea/>
                    <LineChartArea/>
                    <AboutArea/>
                    <BlogArea/>
                </div>


            </div>
            <div className={"col-xxl-3 col-xl-4 col-lg-4 col-12 d-flex justify-content-center"}>
                <div className={"col-lg-12 col-md-7 col-sm-8 col-10 mt-3"}>
                    <CommentArea objectType={"Coin"}/>
                </div>
            </div>
        </div>

    );
}
export default Detail;