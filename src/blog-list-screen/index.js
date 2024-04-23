import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllBlogsThunk} from "../services/blog-thunk";
import BlogListItem from "./blog-list-item";
import {useNavigate} from "react-router-dom";

const BlogListScreen = () => {
    const {currentUser} = useSelector(state => state.users);  // Only admin and prof user could operate blogs
    const {blogList, fetching, updateFlag} = useSelector(state => state.blogs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(
        () => {
            dispatch(findAllBlogsThunk())
        },
        [updateFlag, dispatch]
    )

    const handleNewBlogButton = (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('Please login before write a blog.')

        } else if (currentUser.role === "PERSONAL") {
            alert("Only Pro user could create a new blog.")

        } else (
            navigate('/blog-edit/Post')
        )
    }

    const reverseBlogList = [...blogList];
    reverseBlogList.reverse();


    return(
        fetching ?
            <h1>Loading...</h1>
            :
            <section id="blog-list" className="container col-xxl-6 col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 mt-5">
                <div className={"d-flex mb-2"}>
                    <h3 className={""}>Newest Coin Blogs</h3>
                    <button type={"button"} className={"btn ms-auto wd-btn-style"} onClick={(e) => handleNewBlogButton(e)}>
                        New Blog
                    </button>
                </div>
                <div className="list-group">
                    {
                        reverseBlogList.map(
                            blog => <BlogListItem key={blog._id} blog={blog} />
                        )
                    }
                </div>
            </section>



    )
}

export default BlogListScreen;