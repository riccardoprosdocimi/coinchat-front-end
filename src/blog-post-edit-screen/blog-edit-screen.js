import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateABlogThunk} from "../services/blog-thunk";


const BlogEditScreen = () => {
    const {currentUser} = useSelector(state => state.users);
    const {curBlog, fetching} = useSelector(state => state.blogs);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    useEffect(
        () => {
            curBlog &&
            setTitle(curBlog.title);
            curBlog &&
            setContent(curBlog.content);
        },
        [curBlog, fetching]
    )

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }


    function handleContentChange(event) {
        setContent(event.target.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit() {
        if (!currentUser) {
            alert("Please log in to publish a new blog")
        }else if (!curBlog || curBlog.authorID._id !== currentUser._id) {
            alert("The author ID does not match the user ID")
        }else if (title.length === 0) {
            alert("Blog title cannot be empty")
        } else if (content.length === 0) {
            alert("Blog content cannot be empty")
        } else {
            const blogData = {
                title,
                content
            }
            const thunkArg = {
                blogID: curBlog._id,
                blogData
            }
            dispatch(updateABlogThunk(thunkArg));
            navigate({ pathname: '../blog',
                search: "blogID="+curBlog._id});
        }

    }


    return (

        <form className={"container col-xxl-6 col-xl-7 col-lg-8 col-md-9 col-sm-12 col-12 mt-5"}
              onSubmit={handleSubmit}>
            <div className={"form-group"}>
                <label htmlFor={"title"}>
                    Title:
                </label>
                <input id={"title"} className={"form-control"} type="text" value={title}
                       onChange={handleTitleChange}/>
            </div>
            <div className={"form-group"}>
                <label htmlFor={"content"}>
                    Content:
                </label>
                <textarea id={"content"} rows="15"
                          className={"form-control wd-textarea-resize-none"} value={content}
                          onChange={handleContentChange}/>
            </div>
            <div className="d-flex">
                <button type="submit"
                        className="btn btn-danger flex-grow-1 me-2 mt-2 pe-3">
                    Cancel
                </button>
                <button type="button"
                        onClick={() => navigate({ pathname: '../blog',
                                              search: "blogID="+curBlog._id})}
                        className="btn wd-btn-style flex-grow-1 mt-2">
                    Update
                </button>
            </div>
        </form>

    );
}

export default BlogEditScreen;