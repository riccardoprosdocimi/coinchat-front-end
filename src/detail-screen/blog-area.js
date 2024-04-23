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


    if (!blogList || fetching) {
        return
    }
    return (
        <div id={"relate-blogs"} className={"d-none d-lg-block"}>
            <h3>Related Blogs</h3>
            <div className="list-group">
                {
                    reverseBlogList.map(
                        blog => <BlogListItem key={blog._id} blog={blog} />
                    )
                }
            </div>
        </div>
    )
}

export default BlogArea;