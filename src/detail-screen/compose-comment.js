import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewCommentThunk} from "../services/comment-thunk";
import {useSearchParams} from "react-router-dom";


const ComposeComment = ({objectType}) => {
    
    const {currentUser} = useSelector(state => state.users);
    let [searchParams] = useSearchParams();

    let [myComment, setMyComment] = useState('');

    const dispatch = useDispatch();
    function CommentSubmitClickHandler() {
        const newComment = {
            authorID: currentUser._id,
            objectID: searchParams.get(objectType === "Coin"?"coinID":"blogID"),
            objectType: objectType,
            detailContent: myComment
        }
        dispatch(createNewCommentThunk(newComment));
        setMyComment("");
    }


    return (
        !currentUser
        ? <h3>login to Comment</h3>
        : <fieldset className={"py-2"}>
            <div className="d-flex flex-column">
                <div className="d-flex pb-2">
                    <div className="col-1">
                        <img className="wd-rounded-image" width={"32px"} height={"32px"}
                             src={`/images/p${currentUser.avatar}.jpg`} alt="myAvatar"
                        />
                    </div>
                    <div className="mt-1 ms-3">
                        <h6 style={{textAlign: "center"}} className="">{currentUser.firstName} {currentUser.lastName}</h6>
                    </div>
                </div>
                <div className="">
                        <textarea cols="100" rows="3" className="form-control me-2 border wd-textarea-resize-none"
                                  id="coin-detail-comment"
                                  placeholder="Your Comment" value={myComment}
                                  onChange={(event) => setMyComment(event.target.value)}></textarea>
                    <div className="d-flex flex-column-reverse mt-2">
                        <button type="submit"
                                className="btn wd-btn-style" onClick={CommentSubmitClickHandler}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    )

}

export default ComposeComment;