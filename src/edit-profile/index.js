import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../services/users-thunks";

const EditProfile = () => {
    const {currentUser} = useSelector(state => state.users);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [banner, setBanner] = useState(currentUser.banner)
    const [avatar, setAvatar] = useState(currentUser.avatar)
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [bio, setBio] = useState(currentUser.bio)
    const [city, setCity] = useState(currentUser.city)
    const [website, setWebsite] = useState(currentUser.website)
    const birthdayData = currentUser.birthday.slice(0, 10)
    const [birthday, setBirthday] = useState(birthdayData)
    const [countryCode, setCountryCode] = useState(currentUser.countryCode)
    const [phoneNumber, setPhoneNumber] = useState(currentUser.number)
    const [address, setAddress] = useState(currentUser.address)
    const [accountType, setAccountType] = useState(currentUser.role)

    const updateProfileHandler = () => {
        const newUser = {
            ...currentUser,
            banner,
            avatar,
            firstName,
            lastName,
            bio,
            city,
            address,
            website,
            birthday,
            // email,
            // handle: handle,
            countryCode,
            number: phoneNumber,
            role: accountType,
        }
        dispatch(updateUserThunk(newUser))
        navigate('/profile')
    }
    return (
        <div className={'container-fluid'}>
            <div className="pt-2">
                <div className="card">
                    <div className="card-img-top position-relative">
                        <img src={`/images/b${currentUser.banner}.jpg`}
                             className="card-img-top" alt="..."/>
                        <img className="position-absolute rounded-circle img-thumbnail"
                             style={{
                                 'height': '85%',
                                 'width': '15%',
                                 'bottom': '10%',
                                 'left': '43%'
                             }}
                             src={`/images/p${currentUser.avatar}.jpg`} alt=""/>
                    </div>
                    <div className="card-body">
                        <div className="card-text">
                            <div className={'row pt-1'}>
                                <div className={'col text-center'}>
                                    <div className='w-100 '>
                                        <label className={'text-secondary fs-6'}
                                               htmlFor={"avatar"}>Avatar Image</label>
                                        <select name="Profile" id="avatar" className='form-select'
                                                onChange={event => setAvatar(event.target.value)}>
                                            <option value="" selected disabled hidden>
                                                Select Avatar
                                            </option>
                                            <option value="1">
                                                Dog 1
                                            </option>
                                            <option value="2">
                                                Cat 1
                                            </option>
                                            <option value="3">
                                                Cat 3
                                            </option>
                                            <option value="4">
                                                Dog 2
                                            </option>
                                            <option value="5">
                                                Abstract Human
                                            </option>
                                            <option value="6">
                                                Spaceman
                                            </option>
                                            <option value="7">
                                                River
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'col text-center'}>
                                    <div className='w-100'>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"banner"}>Banner Image</label>
                                        <select name="Banner" id="banner" className='form-select'
                                                onChange={event => setBanner(event.target.value)}>
                                            <option value="" selected disabled hidden>
                                                Select Banner
                                            </option>
                                            <option value="1">
                                                Rolling Hills
                                            </option>
                                            <option value="2">
                                                Snowy Mountain
                                            </option>
                                            <option value="3">
                                                Shore
                                            </option>
                                            <option value="4">
                                                Shore 2
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={'form-group pt-2'}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"firstName-field"}>First Name</label>
                                    <input type={"text"} className={"form-control border-0 ps-2"}
                                           id={"firstName-field"} value={firstName}
                                           onChange={event => {
                                               setFirstName(event.target.value)
                                           }}/>
                                </div>
                            </div>
                            <div className={'form-group pt-2'}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"lastName-field"}>Last Name</label>
                                    <input type={"text"} className={"form-control border-0 ps-2"}
                                           id={"lastName-field"} value={lastName}
                                           onChange={event => {
                                               setLastName(event.target.value)
                                           }}/>
                                </div>
                            </div>
                            <div className={"form-group pt-2"}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"bio-field"}>Bio</label>
                                    <textarea className={"form-control border-0 ps-2"}
                                              id={"bio-field"} value={bio}
                                              onChange={event => setBio(event.target.value)}/>
                                </div>
                            </div>
                            <div className={"form-group pt-2"}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"city-field"}>City</label>
                                    <input type={"text"} className={"form-control border-0 ps-2"}
                                           id={"city-field"} value={city}
                                           onChange={event => setCity(event.target.value)}/>
                                </div>
                            </div>
                            <div className={"form-group pt-2"}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"website-field"}>Website</label>
                                    <input type={"text"} className={"form-control border-0 ps-2"}
                                           id={"website-field"} value={website}
                                           onChange={event => setWebsite(event.target.value)}/>
                                </div>
                            </div>
                            <div className={"form-group pt-2"}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"birthday-field"}>Birthday</label>
                                    <input type={"date"} className={"form-control border-0 ps-2"}
                                           id={"birthday-field"} value={birthday}
                                           onChange={event => setBirthday(event.target.value)}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className={"form-group pt-2 col-5"}>
                                    <div className='border border-secondary rounded-2 border-opacity-25 p-1'>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"countryCode-field"}>Country Code</label>
                                        <select className={"form-control border-0 ps-2"}
                                                id={"countryCode-field"}
                                                onChange={event => setCountryCode(event.target.value)}
                                                value={countryCode}>
                                            <option selected disabled>
                                                Country code
                                            </option>
                                            <option value='1'>
                                                +1 (United States)
                                            </option>
                                            <option value='39'>
                                                +39 (Italy)
                                            </option>
                                            <option value='86'>
                                                +86 (China)
                                            </option>
                                            <option value='995'>
                                                +995 (Georgia)
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"form-group pt-2 col"}>
                                    <div className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"phone-field"}>Phone Number</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"phone-field"} value={phoneNumber}
                                               onChange={event => setPhoneNumber(event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"form-group pt-2"}>
                                <div
                                    className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"address-field"}>Address</label>
                                    <input type={"text"} className={"form-control border-0 ps-2"}
                                           id={"address-field"} value={address}
                                           onChange={event => setAddress(event.target.value)}/>
                                </div>
                            </div>
                            <div className={"form-group pt-2 mb-2"}>
                                <div className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                    <label className={'ps-2 text-secondary fs-6'}
                                           htmlFor={"account-field"}>Account Type</label>
                                    <select className={"form-control border-0 ps-2"}
                                            id={"account-field"}
                                            onChange={event => setAccountType(event.target.value)}
                                            value={accountType}>
                                        <option selected disabled>
                                            Select the account type
                                        </option>
                                        <option value='PERSONAL'>
                                            Personal
                                        </option>
                                        <option value='PROFESSIONAL'>
                                            Professional
                                        </option>
                                        <option value='ADMIN'>
                                            Administrator
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={'text-center row'}>
                            <div className={'col'}>
                                <button className={'btn btn-primary w-100'}
                                        onClick={updateProfileHandler}>
                                    Save
                                </button>
                            </div>
                            <div className={'col'}>
                                <Link to={'/profile'}>
                                    <button className={'btn btn-danger w-100'}>
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditProfile