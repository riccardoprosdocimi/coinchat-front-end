import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {COINGECKO_API_BASE_URL} from "../util/global-variables"


const BlogListItem = ({blog}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [coin, setCoin] = useState(null);
    useEffect(() => {
        fetch(`${COINGECKO_API_BASE_URL}/${blog.coinID}`)
            .then(res => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    setCoin(result);
                },
                (error) => {
                    setIsLoaded(true);
                    console.log(error)
                }
            )
    }, [blog.coinID])

    if (!isLoaded) {
        return (
            <h6>Loading...</h6>
        )
    }
    return (
        <Link to={{ pathname: '../blog',
            search: "blogID="+blog._id}}
              className="list-group-item list-group-item-action card mb-2">
            <div className="card-header d-flex">
                <h5>
                    {blog.title}
                </h5>
                <img className={"ms-auto me-1"} src={coin.image.large} width={"25px"} height={"25px"} alt={"The icon of this coin"}/>
                {coin.symbol.toUpperCase()}
            </div>
            <div className="card-body d-flex">
                <h6 className="card-text text-secondary">{blog.content.substring(0, 220)} {blog.content.length > 220?"...":""}</h6>

            </div>
            <div className="card-footer d-flex">
                <Link to={`/profile/${blog.authorID._id}`} className={""}>
                    <img className="wd-rounded-image" width={"25px"} height={"25px"} src={`/images/p${blog.authorID.avatar}.jpg`}
                                  alt="avatar" />
                </Link>
                <div className="mt-1 ms-2">
                    <h6 className="">{blog.authorID.firstName} {blog.authorID.lastName}</h6>
                </div>
            </div>
        </Link>

    )
}

export default BlogListItem;