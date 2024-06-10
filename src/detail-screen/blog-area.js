import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {findBlogByCoinIDThunk} from "../services/blog-thunk";
import BlogListItem from "../blog-list-screen/blog-list-item";


const BlogArea = () => {
    const {blogList, fetching} = useSelector(state => state.blogs);
    let [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(findBlogByCoinIDThunk(searchParams.get("coinID")))
        },
        [dispatch, searchParams]
    )

    const reverseBlogList = [...blogList];
    reverseBlogList.toReversed().slice(0, 3);

    const renderContent = () => {
        if (fetching) {
            return "Loading...";
        } else if (!blogList || blogList.length === 0) {
            return "No blogs yet";
        } else {
            return null
        }
    };

    return (
        <div id={"relate-blogs"} className={"d-none d-lg-block"}>
            <h3>Related Blogs</h3>
            <h4>
                {
                    renderContent()
                }
            </h4>
            <div className="list-group">
                {!fetching && blogList && blogList.length > 0 &&
                    reverseBlogList.map(
                        blog => <BlogListItem key={blog._id} blog={blog} />
                    )
                }
            </div>
        </div>
    )
}

export default BlogArea;