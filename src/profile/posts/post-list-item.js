import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import {useDispatch} from "react-redux";
import {deleteGivenCommentThunk} from "../../services/comment-thunk";
import {findBlogByBlogID} from "../../services/blog-service";
const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3/coins'

const PostListItem = ({comment, allowedToRemove}) => {
    const dispatch = useDispatch()

    const deleteComment = (commentID) =>
        dispatch(deleteGivenCommentThunk(commentID))

    // Source: https://reactjs.org/docs/faq-ajax.html
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [coin, setCoin] = useState(null);
    const [blog, setBlog] = useState(null)
    // const [previousCoin, setPreviousCoin] = useState(null)
    useEffect( () => {
        if (comment.objectType === 'Coin') {
            fetch(`${COINGECKO_API_BASE_URL}/${comment.objectID}`)
                .then(res => res.json())
                .then((result) => {
                          setIsLoaded(true);
                          setCoin(result);
                      },
                      // Note: it's important to handle errors here
                      // instead of a catch() block so that we don't swallow
                      // exceptions from actual bugs in components.
                      (error) => {
                          setIsLoaded(true);
                          setError(error);
                      }
                )
        }
        if (comment.objectType === 'Blog') {
            findBlogByBlogID(comment.objectID)
                .then((result) => {
                    setIsLoaded(true)
                    setBlog(result)
                })
        }
    }, [dispatch, comment.objectID, comment.objectType])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
    return(
        <li className='list-group-item'>
            {
                comment.objectType === 'Coin' &&
                <div className='row'>
                    <div className='col'>
                        <Link to={`/detail?coinID=${comment.objectID}`} style={{textDecoration: 'none', color: 'black'}}>
                        <span>
                            <img className={'pe-2 pb-2'}
                                 src={coin.image.thumb} alt=""/>
                        </span>
                            <span className='fs-4 pt-1 fw-bold'>
                            {coin.name}
                        </span>
                            <i className='bi bi-dot text-secondary'></i>
                            <span className='text-secondary fw-normal'>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                        </Link>
                    </div>
                    {
                        allowedToRemove &&
                        <div className='col'>
                            <button className='btn btn-sm btn-outline-danger float-end'
                                    onClick={() => deleteComment(comment._id)}>
                                <i className={'bi bi-x-lg'}></i>
                            </button>
                        </div>
                    }
                </div>
            }
            {
                comment.objectType === 'Blog' &&
                <div className='row'>
                    <div className='col-10'>
                        <Link to={`/blog?blogID=${comment.objectID}`} style={{textDecoration: 'none', color: 'black'}}>
                            <span className='fs-4 pt-1 fw-bold'>
                                {blog.title}
                            </span>
                            <i className='bi bi-dot text-secondary'></i>
                            <span className='text-secondary fw-normal'>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                        </Link>
                    </div>
                    {
                        allowedToRemove &&
                        <div className='col'>
                            <button className='btn btn-sm btn-outline-danger float-end'
                                    onClick={() => deleteComment(comment._id)}>
                                <i className={'bi bi-x-lg'}></i>
                            </button>
                        </div>
                    }
                </div>
            }
            <p className='pt-2'>
                {comment.detailContent}
            </p>
            {/*Prints price change since comment*/}
            {/*<p style={{fontSize: '3'}}>*/}
            {/*    <span className='text-secondary'>*/}
            {/*            Price Change Since Comment:*/}
            {/*        </span>*/}
            {/*    <span className='ps-2 text-secondary'>*/}
            {/*            {moneyFormat.format(*/}
            {/*                coin.market_data.current_price.usd - previousCoin.market_data.current_price.usd*/}
            {/*            )}*/}
            {/*    </span>*/}
            {/*</p>*/}
            <i className="bi bi-hand-thumbs-up-fill text-success"></i> {comment.likes.toLocaleString("en-US")}
            <i className="bi bi-hand-thumbs-down-fill text-danger ps-3"></i> {comment.dislikes.toLocaleString("en-US")}
        </li>

    )}
}
export default PostListItem