import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUserThunk} from "../services/users-thunks";

const randomizeBanner = () => Math.floor(Math.random() * 4) + 1;
const randomizeAvatar = () => Math.floor(Math.random() * 7) + 1;

const CreateUser = () => {
    const {currentUser, loading} = useSelector(state => state.users);
    const [error, setError] = useState(null);
    const banner = `${randomizeBanner()}`;
    const avatar = `${randomizeAvatar()}`;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeFirstName = event => {
        const newFirstName = event.target.value;
        setFirstName(newFirstName);
    };
    const changeLastName = event => {
        const newLastName = event.target.value;
        setLastName(newLastName);
    };
    const changeBio = event => {
        const newBio = event.target.value;
        setBio(newBio);
    };
    const changeCity = event => {
        const newCity = event.target.value;
        setCity(newCity);
    };
    const changeAddress = event => {
        const newAddress = event.target.value;
        setAddress(newAddress);
    };
    const changeWebsite = event => {
        const newWebsite = event.target.value;
        setWebsite(newWebsite);
    };
    const changeBirthday = event => {
        const newBirthday = event.target.value;
        setBirthday(newBirthday);
    };
    const changeEmail = event => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };
    const changeUsername = event => {
        const newUsername = event.target.value;
        setUsername(newUsername);
    };
    const changeCountryCode = event => {
        const newCountryCode = event.target.value;
        setCountryCode(newCountryCode);
    };
    const changeNumber = event => {
        const newNumber = event.target.value;
        setNumber(newNumber);
    };
    const changePassword = event => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };
    const changeAccountType = event => {
        const newAccountType = event.target.value;
        setAccountType(newAccountType);
    };
    const createUserHandler = () => {
        if (firstName === '') {
            setError('Please enter your first name');
        } else if (lastName === '') {
            setError('Please enter your last name');
        } else if (birthday === '') {
            setError('Please enter your date of birth');
        } else if (email === '') {
            setError('Please enter your email address');
        } else if (username === '') {
            setError('Please enter your username');
        } else if (password === '') {
            setError('Please enter your password');
        } else if (accountType === '') {
            setError('Please select the type of account you want to create');
        } else {
            const newUser = {
                banner,
                avatar,
                firstName,
                lastName,
                bio,
                city,
                address,
                website,
                birthday,
                email,
                "handle": username,
                countryCode,
                number,
                password,
                "role": accountType
            };
            dispatch(createUserThunk(newUser))
            if (!loading) {
                navigate('/edit-users');
            }
        }
    };

    if (currentUser.role !== 'ADMIN') {
        navigate('/');
    } else {
        return (
            <div className={'row'}>
                <div className={'col-3'}></div>
                <div className="col-6 pt-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-text">
                                <div className={'form-group pt-2'}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"firstName-field"}>First Name</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"firstName-field"} value={firstName}
                                               onChange={changeFirstName}/>
                                    </div>
                                </div>
                                <div className={'form-group pt-2'}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"lastName-field"}>Last Name</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"lastName-field"} value={lastName}
                                               onChange={changeLastName}/>
                                    </div>
                                </div>
                                <div className={'form-group pt-2'}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"username-field"}>Username</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"username-field"} value={username}
                                               onChange={changeUsername}/>
                                    </div>
                                </div>
                                <div className={'form-group pt-2'}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"email-field"}>Email</label>
                                        <input type={"email"} className={"form-control border-0 ps-2"}
                                               id={"email-field"} value={email}
                                               onChange={changeEmail}/>
                                    </div>
                                </div>
                                <div className={"form-group pt-2"}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"bio-field"}>Bio</label>
                                        <textarea className={"form-control border-0 ps-2"}
                                                  id={"bio-field"} value={bio}
                                                  onChange={changeBio}/>
                                    </div>
                                </div>
                                <div className={"form-group pt-2"}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"city-field"}>City</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"city-field"} value={city}
                                               onChange={changeCity}/>
                                    </div>
                                </div>
                                <div className={"form-group pt-2"}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"address-field"}>Address</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"address-field"} value={address}
                                               onChange={changeAddress}/>
                                    </div>
                                </div>
                                <div className={"form-group pt-2"}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"website-field"}>Website</label>
                                        <input type={"url"} className={"form-control border-0 ps-2"}
                                               id={"website-field"} value={website}
                                               onChange={changeWebsite}/>
                                    </div>
                                </div>
                                <div className={"form-group pt-2"}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"birthday-field"}>Birthday</label>
                                        <input type={"date"} className={"form-control border-0 ps-2"}
                                               id={"birthday-field"} value={birthday}
                                               onChange={changeBirthday}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className={"form-group pt-2 col-5"}>
                                        <div className='border border-secondary rounded-2 border-opacity-25 p-1'>
                                            <label className={'ps-2 text-secondary fs-6'}
                                                   htmlFor={"countryCode-field"}>Country Code</label>
                                            <select className={"form-control border-0 ps-2"}
                                                    id={"countryCode-field"}
                                                    onChange={changeCountryCode}
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
                                            <input type={"tel"} className={"form-control border-0 ps-2"}
                                                   id={"phone-field"} value={number}
                                                   onChange={changeNumber}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"form-group pt-2"}>
                                    <div
                                        className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"address-field"}>Password</label>
                                        <input type={"text"} className={"form-control border-0 ps-2"}
                                               id={"address-field"} value={password}
                                               onChange={changePassword}/>
                                    </div>
                                </div>
                                <div className={"form-group pt-2 mb-3"}>
                                    <div className={'border border-secondary rounded-2 border-opacity-25 p-1'}>
                                        <label className={'ps-2 text-secondary fs-6'}
                                               htmlFor={"account-field"}>Account Type</label>
                                        <select className={"form-control border-0 ps-2"}
                                                id={"account-field"}
                                                onChange={changeAccountType}
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
                            {
                                error &&
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            }
                            <div className={'text-center row'}>
                                <div className={'col'}>
                                    <button className={'btn btn-primary w-100'}
                                            onClick={createUserHandler}>
                                        Save
                                    </button>
                                </div>
                                <div className={'col'}>
                                    <Link to={'/edit-users'}>
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
        );
    }
};
export default CreateUser;