import PostListItem from "./post-list-item";

const PostList = ({comments, allowedToRemove}) => {
    // Source: https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    const sortedComments = comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return(
        <ul className={'list-group'}>
            {
                sortedComments.length > 0 && sortedComments.filter(c => c.authorID !== null).map(
                    comment => <PostListItem
                        key={comment._id}
                        comment={comment}
                        allowedToRemove={allowedToRemove}/>
                )
            }
            {
                sortedComments.length === 0 &&
                <li className='list-group-item'>
                    <br/><br/>
                    <h4 className='text-center text-secondary'>
                        No comments yet!
                    </h4>
                    <br/><br/>
                </li>
            }
        </ul>
    )
}
export default PostList