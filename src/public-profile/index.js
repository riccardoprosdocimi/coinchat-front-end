import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import WatchListTable from "../watchlist-table/watchlist-table";
import PostList from "../profile/posts/post-list";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "../services/users-thunks";
import {
    findFollowIdThunk,
    findUsersFollowedByUserThunk,
    findUsersFollowingUserThunk,
    userFollowsUserThunk, userUnfollowsUserThunk
} from "../services/follow-thunks";
import {getCommentsByAuthorIDThunk} from "../services/comment-thunk";
import {findBlogByAuthorIDThunk} from "../services/blog-thunk";
import BlogListItem from "../blog-list-screen/blog-list-item";

const PublicProfile = () => {
    const {uid} = useParams()
    const {currentUser} = useSelector(state => state.users)
    const {publicProfile} = useSelector(state => state.users)
    const {comments, updateFlag} = useSelector(state => state.comments)
    const {blogList} = useSelector(state => state.blogs);
    const {followers, following} = useSelector(state => state.follow)
    const {followId} = useSelector(state => state.follow)
    const [followsUser, setFollowsUser] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFollowBtn = async () => {
        if (currentUser) {
            dispatch(userFollowsUserThunk({followee: uid}))
            setFollowsUser(true)
        } else {
            navigate('/login')
        }
    }
    const handleUnFollowBtn = async () => {
        dispatch(userUnfollowsUserThunk(followId))
        setFollowsUser(false)
    }
    useEffect(() => {
        if (currentUser && uid === currentUser._id) {
            navigate('/profile')
        }
        async function fetchData() {
            dispatch(findUserByIdThunk(uid))
            dispatch(getCommentsByAuthorIDThunk(uid))
            dispatch(findBlogByAuthorIDThunk(uid))
            dispatch(findUsersFollowingUserThunk(uid))
            dispatch(findUsersFollowedByUserThunk(uid))
            dispatch(findFollowIdThunk(uid))
            setFollowsUser(followId !== null)
        }
        fetchData()
    }, [dispatch, currentUser, navigate, uid, updateFlag, followsUser, followId])
    return (
        <div className={'row'}>
            <div className="col-xl-3 col-lg-3 col-md-4 mt-2">
                <div className="card">
                    <div className="card-img-top position-relative d-flex d-lg-block d-none">
                        <img src={`/images/b${publicProfile.banner}.jpg`}
                             className="card-img-top" alt="..."/>
                        <img className="position-absolute  img-thumbnail"
                             style={{
                                 height: '85%',
                                 width: '55%',
                                 bottom: '7%',
                                 left: '24%',
                                 objectFit: 'cover',
                                 borderRadius: '50%'
                             }}
                             src={`/images/p${publicProfile.avatar}.jpg`} alt=""/>
                    </div>
                    <div className="card-body">
                        <div className="card-title fw-bold fs-5">
                            {publicProfile.firstName} {publicProfile.lastName}
                            <span className="fw-light text-secondary fs-6 ps-2">
                                @{publicProfile.handle}
                            </span>
                        </div>
                        <div className="card-text">
                            <div className={'row'}>
                                <div className={'col'}>
                                    <span
                                        className={'fw-bold pe-2'}>{followers.length}</span>
                                    <span className={'text-secondary'}>Followers</span>
                                </div>
                                <div className={'col'}>
                                    <span
                                        className={'fw-bold pe-2'}>{following.length}</span>
                                    <span className={'text-secondary'}>Following</span>
                                </div>
                            </div>
                            <div className={'pt-2'}>
                                {publicProfile.bio}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-geo-fill pe-2'}></i>
                                {publicProfile.city}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-globe pe-2'}></i>
                                <a href={`https://www.${publicProfile.website}`}
                                   style={{textDecorationLine: 'none'}}>
                                    {publicProfile.website}
                                </a>
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-person-square pe-2'}></i>
                                {publicProfile.type}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'text-center pt-3'}>
                    {
                        followsUser &&
                        <button className={'btn btn-danger w-100'}
                                onClick={handleUnFollowBtn}>
                            Unfollow
                        </button>
                    }
                    {
                        !followsUser &&
                        <button className={'btn btn-success w-100'}
                                onClick={handleFollowBtn}>
                            Follow
                        </button>
                    }
                </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm mt-2">
                <Tabs defaultActiveKey="watchlist" variant={'pills'} fill={true}>
                    {
                        currentUser &&
                        <Tab tabClassName={'wd-profile-tabs'}
                             eventKey="watchlist" title="Watchlist">
                            <WatchListTable uid={uid} allowedToRemove={false}/>
                        </Tab>
                    }
                    {
                        !currentUser &&
                        <Tab tabClassName={'wd-profile-tabs'}
                             eventKey="watchlist" title="Watchlist">
                            <div className='list-group'>
                                <div className='list-group-item'>
                                    <br/><br/>
                                    <h4 className='text-center text-secondary'>
                                        Login to view {publicProfile.firstName} {publicProfile.lastName}'s Watchlist
                                    </h4>
                                    <br/><br/>
                                </div>
                            </div>
                        </Tab>
                    }
                    {
                        (publicProfile.role === 'PROFESSIONAL' || publicProfile.role === 'ADMIN') &&
                        <Tab tabClassName={'wd-profile-tabs'}
                             eventKey="blog" title="Blog Posts">
                            {
                                blogList.filter(b => b.authorID !== null).map(
                                    blog =>
                                        <div key={blog.id} className='border border-dark border-opacity-25 rounded-3 pb-1'>
                                            <BlogListItem blog={blog}/>
                                        </div>)
                            }
                            {
                                blogList.length === 0 &&
                                <div className='list-group'>
                                    <div className='list-group-item'>
                                        <br/><br/>
                                        <h4 className='text-center text-secondary'>
                                            {publicProfile.firstName} {publicProfile.lastName} has no posts yet!
                                        </h4>
                                        <br/><br/>
                                    </div>
                                </div>
                            }
                        </Tab>
                    }
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="comments" title="Comments">
                        <PostList comments={comments} allowedToRemove={false}/>
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="followers" title="Followers">
                        <div className='list-group'>
                            {
                                followers?.filter(f => f.follower !== null).map(
                                    follow =>
                                        <Link to={`/profile/${follow.follower?._id}`}
                                              className='list-group-item' key={follow.follower?._id}>
                                            <div className='row'>
                                                <div className='col-1'>
                                                    <img
                                                        src={`/images/p${follow.follower?.avatar}.jpg`}
                                                        alt=""
                                                        className='rounded-circle pt-2 w-100'/>
                                                </div>
                                                <div className='col pt-2 fs-3 fw-bold'>
                                                    {follow.follower?.firstName} {follow.follower?.lastName}
                                                    <div className='fs-5 text-secondary fw-normal'>
                                                        @{follow.follower?.handle}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                )
                            }
                            {
                                followers.length === 0 &&
                                <div className='list-group'>
                                    <div className='list-group-item'>
                                        <br/><br/>
                                        <h4 className='text-center text-secondary'>
                                            No one follows {publicProfile.firstName} {publicProfile.lastName} yet!
                                        </h4>
                                        <br/><br/>
                                    </div>
                                </div>
                            }
                        </div>
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="following" title="Following">
                        <div className='list-group'>
                            {
                                following?.filter(f => f.followee !== null).map(
                                    follow =>
                                        <Link to={`/profile/${follow.followee?._id}`}
                                              className='list-group-item' key={follow.followee?._id}>
                                            <div className='row'>
                                                <div className='col-1'>
                                                    <img
                                                        src={`/images/p${follow.followee?.avatar}.jpg`}
                                                        alt=""
                                                        className='rounded-circle pt-2 w-100'/>
                                                </div>
                                                <div className='col pt-2 fs-3 fw-bold'>
                                                    {follow.followee?.firstName} {follow.followee?.lastName}
                                                    <div className='fs-5 text-secondary fw-normal'>
                                                        @{follow.followee?.handle}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                )
                            }
                            {
                                following.length === 0 &&
                                <div className='list-group'>
                                    <div className='list-group-item'>
                                        <br/><br/>
                                        <h4 className='text-center text-secondary'>
                                            {publicProfile.firstName} {publicProfile.lastName} follows no one yet!
                                        </h4>
                                        <br/><br/>
                                    </div>
                                </div>
                            }
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
export default PublicProfile