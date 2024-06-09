import React from "react";
import {useSelector} from "react-redux";


const AboutArea = () => {
    const {coinData, fetching, error} = useSelector((state) => {
        return state.coinData;
    });

    if (error) {
        return <h4>
            {error}<br/>
            Probable cause: Maximum API calls reached, please wait a minute
        </h4>;
    }

    return(
        !error && fetching?
            <h4>Loading...</h4>:
        <div className="mt-3 pb-3">
            <div id="about info" className={""}>
                <h3>About</h3>
                <div className={"wd-paragraph-fine-wrapped"} dangerouslySetInnerHTML={{ __html: coinData.description.en}} />
            </div>
        </div>
    );
}

export default AboutArea;