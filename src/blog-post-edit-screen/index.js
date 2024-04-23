import BlogPostScreen from "./blog-post-screen";
import {useParams} from "react-router-dom";
import BlogEditScreen from "./blog-edit-screen";

const BlogPostEditScreen = () => {
    const { type } = useParams();
    if (type === "Post") {
        return (
            <BlogPostScreen />
        )
    } else if (type === "Edit") {
        return (
            <BlogEditScreen/>
        )
    }
    return (
        <h1>Blog Edit/Post</h1>
    )

}

export default BlogPostEditScreen;