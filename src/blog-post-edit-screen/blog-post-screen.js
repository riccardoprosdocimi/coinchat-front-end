import React, {useEffect, useState} from 'react';
import AsyncSelect from 'react-select/async';
import {useDispatch, useSelector} from "react-redux";
import {createNewBlogThunk} from "../services/blog-thunk";
import {useNavigate} from "react-router-dom";
import {COINGECKO_SEARCH_API, COINGECKO_TRENDING_API} from "../util/global-variables";

function BlogPostScreen() {
    const {currentUser} = useSelector(state => state.users);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [selectedValue, setSelectedValue] = useState(null);
    const [defaultOptions, setDefaultOptions] = useState([]);

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    // load options using API call
    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${COINGECKO_SEARCH_API}${inputValue}`);
            const data = await response.json();
            return data['coins'].slice(0, 5);
        } catch (error) {
            alert("Maximum API calls reached. Please wait a minute and try searching again.")
            console.error('Error fetching blog options:', error);
            return [];
        }
    };

    // load default options (trending coins) using API call
    const loadDefaultOptions = async () => {
        try {
            const response = await fetch(`${COINGECKO_TRENDING_API}`);
            const data = await response.json();
            const options = data.coins.map(coin => ({
                name: coin.item.name,
                id: coin.item.id,
                thumb: coin.item.thumb,
                image: coin.item.large,
                symbol: coin.item.symbol
            }));
            setDefaultOptions(options);
        } catch (error) {
            console.error('Error fetching blog default options:', error);
        }
    }
    useEffect(() => {
        loadDefaultOptions();
    }, []);

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleContentChange(event) {
        setContent(event.target.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleSubmit() {
        if (!currentUser) {
            alert("Please log in to publish a new blog")
        } else if (title.length === 0) {
            alert("Blog title cannot be empty")
        } else if (content.length === 0) {
            alert("Blog content cannot be empty")
        } else if (selectedValue === null) {
            alert("Please select the coin you want to blog about")
        } else {
            const newBlog = {
                authorID: currentUser._id,
                coinID: selectedValue.id,
                coinImage: selectedValue.image,
                coinSymbol: selectedValue.symbol,
                title,
                content
            }
            dispatch(createNewBlogThunk(newBlog));
            navigate('/bloglist');
        }
    }

    const formatOptionLabel = ({ name, thumb }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {thumb && <img src={thumb}
                           alt="Coin Thumbnail"
                           style={{ marginRight: 5, width: 20, height: 20 }} />}
            <span>{name}</span>
        </div>
    );

    return (
        <form className={"container pt-sm-1 pt-md-2 pt-lg-3 pt-xl-4 pt-xxl-5"}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6">
                    <div className={"form-group"}>
                        Coin
                        <AsyncSelect
                            className={"form-control"}
                            cacheOptions={true}
                            defaultOptions={defaultOptions}
                            placeholder={"Search coin here"}
                            value={selectedValue}
                            getOptionLabel={formatOptionLabel}
                            getOptionValue={e => e.id}
                            loadOptions={loadOptions}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"title"}>Title:</label>
                        <input id={"title"} className={"form-control"} type="text" value={title} onChange={handleTitleChange} />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"content"}>Content:</label>
                        <textarea id={"content"} rows="15" className={"form-control wd-textarea-resize-none"} value={content} onChange={handleContentChange} />
                    </div>
                    <button type="submit" className="btn wd-btn-style w-100 mt-2" onClick={handleSubmit}>Publish</button>
                </div>
            </div>
        </form>
    );
}

export default BlogPostScreen;