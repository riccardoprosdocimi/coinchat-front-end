import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../services/users-thunks";
import {Navigate, useNavigate} from "react-router-dom";

const randomizeBanner = () => Math.floor(Math.random() * 4) + 1;
const randomizeAvatar = () => Math.floor(Math.random() * 7) + 1;

const Register = () => {
    const {currentUser, loading, error} = useSelector(state => state.users);
    const [errorMessage, setErrorMessage] = useState(null);
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
    const [validatePassword, setValidatePassword] = useState('');
    const [accountType, setAccountType] = useState('');
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
    const changeValidatePassword = event => {
        const newValidatePassword = event.target.value;
        setValidatePassword(newValidatePassword);
    };
    const changeAccountType = event => {
        const newAccountType = event.target.value;
        setAccountType(newAccountType);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegisterBtn = () => {
        if (firstName === '') {
            setErrorMessage('Please enter your first name');
        } else if (lastName === '') {
            setErrorMessage('Please enter your last name');
        } else if (birthday === '') {
            setErrorMessage('Please enter your date of birth');
        } else if (email === '') {
            setErrorMessage('Please enter your email address');
        } else if (username === '') {
            setErrorMessage('Please enter your username');
        } else if (password === '') {
            setErrorMessage('Please enter your password');
        } else if (validatePassword === '') {
            setErrorMessage('Please reenter your password');
        } else if (password !== validatePassword) {
            setErrorMessage('Passwords must match');
        } else if (accountType === '') {
            setErrorMessage('Please select the type of account you want to create');
        } else {
            setErrorMessage(null);
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
            dispatch(registerThunk(newUser));
            if (error === 'Request failed with status code 403') {
                setErrorMessage('User already existing')
            } else if (!loading) {
                navigate('/profile');
            }
        }
    };

    if (currentUser) {
        return(<Navigate to={'/profile'}/>);
    } else {
        return(
            <div className="container w-50 mb-5">
                <h1 className="fw-bolder mt-2 text-center">
                    Create your CoinChat account
                </h1>
                <div className="position-relative">
                    <hr/>
                    <h6>
                        Required fields have an asterisk: *
                    </h6>
                    <div className="row g-3">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <label htmlFor="first-name"
                                   className="col-form-label col-form-label-lg">
                                FIRST NAME*
                            </label>
                            <input id="first-name"
                                   type="text"
                                   className="form-control form-control-lg"
                                   placeholder="John"
                                   aria-label="First name"
                                   title="Please enter your first name here"
                                   value={firstName}
                                   onChange={changeFirstName}/>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <label htmlFor="last-name"
                                   className="col-form-label col-form-label-lg">
                                LAST NAME*
                            </label>
                            <input id="last-name"
                                   type="text"
                                   className="form-control form-control-lg"
                                   placeholder="Doe"
                                   aria-label="Last name"
                                   title="Please enter your last name here"
                                   value={lastName}
                                   onChange={changeLastName}/>
                        </div>
                    </div>
                    <br/>
                    <label htmlFor="bio"
                           className="col-form-label col-form-label-lg">
                        BIO
                    </label>
                    <textarea id="bio"
                              className="form-control form-control-lg"
                              placeholder="Something about you"
                              title="Please enter something about you here"
                              value={bio}
                              onChange={changeBio}/>
                    <br/>
                    <label htmlFor="city"
                           className="col-form-label col-form-label-lg">
                        CITY
                    </label>
                    <input id="city"
                           type="text"
                           className="form-control form-control-lg"
                           placeholder="Nowhere, US"
                           title="Please enter the city where you currently live in here"
                           value={city}
                           onChange={changeCity}/>
                    <br/>
                    <label htmlFor="address"
                           className="col-form-label col-form-label-lg">
                        ADDRESS
                    </label>
                    <input id="address"
                           type="text"
                           className="form-control form-control-lg"
                           placeholder="159 Crypto St"
                           title="Please enter the city where you currently live in here"
                           value={address}
                           onChange={changeAddress}/>
                    <br/>
                    {/*<label htmlFor="country-region"*/}
                    {/*       className="col-form-label col-form-label-lg">*/}
                    {/*    COUNTRY/REGION**/}
                    {/*</label>*/}
                    {/*<select id="country-region"*/}
                    {/*        className="form-select form-select-lg"*/}
                    {/*        title="Please select the country/region where you reside here"*/}
                    {/*        required>*/}
                    {/*    <option selected>*/}
                    {/*        Choose...*/}
                    {/*    </option>*/}
                    {/*    <option value="UNITED-STATES">*/}
                    {/*        United States*/}
                    {/*    </option>*/}
                    {/*    <option value="EUROPE">*/}
                    {/*        Europe*/}
                    {/*    </option>*/}
                    {/*    <option value="AFRICA">*/}
                    {/*        Africa*/}
                    {/*    </option>*/}
                    {/*    <option value="OCEANIA">*/}
                    {/*        Oceania*/}
                    {/*    </option>*/}
                    {/*    <option value="ASIA">*/}
                    {/*        Asia*/}
                    {/*    </option>*/}
                    {/*</select>*/}
                    <label htmlFor="website"
                           className="col-form-label col-form-label-lg">
                        WEBSITE
                    </label>
                    <input id="website"
                           type="url"
                           className="form-control form-control-lg"
                           placeholder="example.com"
                           title="Please enter your website here"
                           value={website}
                           onChange={changeWebsite}/>
                    <br/>
                    <label htmlFor="birthday"
                           className="col-form-label col-form-label-lg">
                        BIRTHDAY*
                    </label>
                    <input type="date"
                           className="form-select form-select-lg"
                           id="birthday"
                           title="Please enter your birthdate here"
                           value={birthday}
                           onChange={changeBirthday}/>
                    <br/>
                    <hr/>
                    <label htmlFor="email"
                           className="col-form-label col-form-label-lg">
                        EMAIL*
                    </label>
                    <input type="email"
                           className="form-control form-control-lg"
                           id="email"
                           placeholder="name@example.com"
                           title="Please enter your email address here"
                           value={email}
                           onChange={changeEmail}/>
                    <br/>
                    <label className="visually-hidden"
                           htmlFor="username">
                        USERNAME
                    </label>
                    <div className="input-group">
                        <div className="input-group-text">
                            @
                        </div>
                        <input type="text"
                               className="form-control form-control-lg"
                               id="username"
                               placeholder="Username*"
                               title="Please enter your username here"
                               value={username}
                               onChange={changeUsername}/>
                    </div>
                    <br/>
                    <div className="row g-3">
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5">
                            <label htmlFor="country-code"
                                   className="visually-hidden">
                                COUNTRY CODE
                            </label>
                            <select id="country-code"
                                    className="form-select form-select-lg"
                                    title="Please select your phone number's country code"
                                    value={countryCode}
                                    onChange={changeCountryCode}>
                                <option value='' selected disabled>
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
                        <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-sm-7">
                            <label htmlFor="phone-number"
                                   className="visually-hidden">
                                PHONE NUMBER
                            </label>
                            <input type="tel"
                                   className="form-control form-control-lg"
                                   id="phone-number"
                                   placeholder="Phone number"
                                   title="Please enter your phone number here"
                                   value={number}
                                   onChange={changeNumber}/>
                        </div>
                    </div>
                    <br/>
                    <label htmlFor="password"
                           className="visually-hidden">
                        PASSWORD
                    </label>
                    <input type="password"
                           className="form-control form-control-lg"
                           id="password"
                           placeholder="Password*"
                           title="Please enter your password here"
                           value={password}
                           onChange={changePassword}/>
                    <br/>
                    <input type="password"
                           className="form-control form-control-lg"
                           placeholder="Confirm password*"
                           title="Please re-enter your password here"
                           value={validatePassword}
                           onChange={changeValidatePassword}/>
                    <br/>
                    <hr/>
                    <label htmlFor="account-type"
                           className="col-form-label col-form-label-lg">
                        ACCOUNT TYPE*
                    </label>
                    <select id="account-type"
                            className="form-select form-select-lg"
                            title="Please select which account type you want to create"
                            value={accountType}
                            onChange={changeAccountType}>
                        <option value='' selected disabled>
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
                    <br/>
                    {
                        errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }
                    <div className="d-flex justify-content-center">
                        <button type="button"
                                className="btn btn-lg wd-btn-style rounded-pill mt-2 w-75 wd-font"
                                onClick={handleRegisterBtn}>
                            Create free account
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};
export default Register;