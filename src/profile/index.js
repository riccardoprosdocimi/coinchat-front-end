import WatchListTable from "../watchlist-table/watchlist-table";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import PostList from "./posts/post-list";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {findUsersFollowedByUserThunk, findUsersFollowingUserThunk} from "../services/follow-thunks";
import moment from "moment";
import {getCommentsByAuthorIDThunk} from "../services/comment-thunk";
import BlogListItem from "../blog-list-screen/blog-list-item";
import {findBlogByAuthorIDThunk} from "../services/blog-thunk";

// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct
    let match = /^(1)?(\d{3})(\d{3})(\d{4})$/.exec(cleaned);

    if (match) {
        //Remove the matched extension code
        //Change this to format for any country code.
        let intlCode = (match[1] ? `+${match[1]} ` : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null;
}

const Profile = () => {
    const {currentUser} = useSelector(state => state.users);
    const {blogList} = useSelector(state => state.blogs);
    const {followers, following} = useSelector(state => state.follow);
    const {comments, updateFlag} = useSelector(state => state.comments)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findUsersFollowingUserThunk(currentUser._id))
        dispatch(findUsersFollowedByUserThunk(currentUser._id))
        dispatch(findBlogByAuthorIDThunk(currentUser._id))
        dispatch(getCommentsByAuthorIDThunk(currentUser._id))
    }, [dispatch, currentUser, updateFlag]);

    return (
        <div className={'row mb-5'}>
            <div className="col-xl-3 col-lg-3 col-md-4 mt-2">
                <div className="card">
                    <div className="card-img-top position-relative d-flex d-lg-block d-none">
                        <img src={`/images/b${currentUser?.banner}.jpg`}
                             className="card-img-top"
                             style={{}}
                             alt="..."/>
                        <img className="position-absolute  img-thumbnail"
                             style={{
                                 height: '85%',
                                 width: '55%',
                                 bottom: '7%',
                                 left: '24%',
                                 objectFit: 'cover',
                                 borderRadius: '50%'
                             }}
                             src={`/images/p${currentUser?.avatar}.jpg`}
                             alt=""/>
                    </div>
                    <div className="card-body">
                        <div className="card-title fw-bold fs-5">
                            {currentUser?.firstName} {currentUser?.lastName}
                            <span className="fw-light text-secondary fs-6 ps-2">
                                @{currentUser?.handle}
                            </span>
                        </div>
                        <div className="card-text">
                            <div className={'row'}>
                                <div className={'col'}>
                                    <span
                                        className={'fw-bold pe-2'}>{followers.length.toLocaleString('en-US')}</span>
                                    <span className={'text-secondary'}>Followers</span>
                                </div>
                                <div className={'col'}>
                                    <span
                                        className={'fw-bold pe-2'}>{following.length.toLocaleString('en-US')}</span>
                                    <span className={'text-secondary'}>Following</span>
                                </div>
                            </div>
                            {
                                currentUser?.bio &&
                                <div className={`row`}>
                                    <div className={`col-1`}>
                                        <i className={`bi bi-person-vcard-fill pe-2`}/>
                                    </div>
                                    <div className={`col-11`}>
                                        {currentUser.bio}
                                    </div>
                                </div>
                            }
                            {
                                currentUser?.city &&
                                <div className={'pt-2'}>
                                    <i className={'bi bi-geo-fill pe-2'}/>
                                    {currentUser.city}
                                </div>
                            }
                            {
                                currentUser?.address &&
                                <div className={'pt-2'}>
                                    <i className={'bi bi-house-fill pe-2'}/>
                                    {currentUser.address}
                                </div>
                            }
                            <div className={'pt-2'}>
                                <i className={'bi bi-balloon-fill pe-2'}/>
                                {currentUser && moment.utc(currentUser.birthday)
                                    .format('MMMM Do[,] YYYY')}
                            </div>
                            {
                                currentUser?.number &&
                                <div className={'pt-2'}>
                                    <i className={'bi bi-telephone-fill pe-2'}/>
                                    +{currentUser.countryCode} {formatPhoneNumber(currentUser.number)}
                                </div>
                            }
                            {
                                currentUser?.website &&
                                <div className={'pt-2'}>
                                    <i className={'bi bi-globe pe-2'}></i>
                                    <a href={`https://www.${currentUser.website}`}
                                       style={{textDecorationLine: 'none'}}>
                                        {currentUser.website}
                                    </a>
                                </div>
                            }
                            <div className={'pt-2'}>
                                <i className={'bi bi-person-square pe-2'}/>
                                {currentUser?.role}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'text-center pt-3'}>
                    <Link to={'/profile/edit-profile'}>
                        <button className={'btn btn-warning w-100'}>
                            Edit Profile
                        </button>
                    </Link>
                </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm mt-2">
                <Tabs defaultActiveKey="watchlist" variant={'pills'} fill={true}>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="watchlist" title="Watchlist">
                        <WatchListTable uid={currentUser?._id}
                                        allowedToRemove={true}/>
                    </Tab>
                    {
                        (currentUser.role === 'PROFESSIONAL' || currentUser.role === 'ADMIN') &&
                        <Tab tabClassName={'wd-profile-tabs'}
                             eventKey="blog" title="Blog Posts">
                            {
                                blogList.filter(b => b.authorID !== null).map(
                                blog =>
                                    <div key={blog.id} className='border border-dark border-opacity-25 rounded-3 pb-1'>
                                        <BlogListItem blog={blog}/>
                                    </div>
                            )}
                            {
                                blogList.length === 0 &&
                                <div className='list-group'>
                                    <div className='list-group-item'>
                                        <br/><br/>
                                        <h4 className='text-center text-secondary'>
                                            You haven't made a post yet
                                        </h4>
                                        <br/><br/>
                                    </div>
                                </div>
                            }
                        </Tab>
                    }
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="comments" title="Comments">
                        <PostList comments={comments}
                                  allowedToRemove={true}/>
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="followers" title="Followers">
                        <div className='list-group'>
                            {
                                followers?.filter(f => f.follower !== null).map(
                                    follow =>
                                        <Link to={`/profile/${follow.follower._id}`}
                                            className='list-group-item' key={follow.follower._id}>
                                          <div className='row'>
                                              <div className='col-1'>
                                                  <img
                                                      src={`/images/p${follow.follower.avatar}.jpg`}
                                                      alt=""
                                                      className='rounded-circle pt-2 w-100'/>
                                              </div>
                                              <div className='col pt-2 fs-3 fw-bold'>
                                                  {follow.follower.firstName} {follow.follower.lastName}
                                                  <div
                                                      className='fs-5 text-secondary fw-normal'>
                                                      @{follow.follower.handle}
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
                                            You have no followers yet!
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
                                        <Link to={`/profile/${follow.followee._id}`}
                                            className='list-group-item' key={follow.followee._id}>
                                          <div className='row'>
                                              <div className='col-1'>
                                                  <img
                                                      src={`/images/p${follow.followee.avatar}.jpg`}
                                                      alt=""
                                                      className='rounded-circle pt-2 w-100'/>
                                              </div>
                                              <div className='col pt-2 fs-3 fw-bold'>
                                                  {follow.followee.firstName} {follow.followee.lastName}
                                                  <div
                                                      className='fs-5 text-secondary fw-normal'>
                                                      @{follow.followee.handle}
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
                                            You don't follow anyone yet!
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
};
export default Profile;