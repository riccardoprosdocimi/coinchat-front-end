import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import {useDispatch, useSelector} from "react-redux";
import {createNewBlogThunk} from "../services/blog-thunk";
import {useNavigate} from "react-router-dom";
import {coinGeckoSearch_API} from "../util/global-variables";

function BlogPostScreen() {
    const {currentUser} = useSelector(state => state.users);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [selectedValue, setSelectedValue] = useState(null);

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    // load options using API call
    const loadOptions = async (inputValue) => {
        const res = await fetch(`${coinGeckoSearch_API}${inputValue}`)
        const data = await res.json()
        return data["coins"].slice(0, 5)
    };

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
            alert("Please login before publish a new blog")
        }else if (title.length === 0) {
            alert("Title of blog cannot be empty")
        } else if (content.length === 0) {
            alert("Content of blog cannot be empty")
        } else if (selectedValue === null) {
            alert("Please select a coin pertaining to the blog")
        } else {
            const newBlog = {
                authorID: currentUser._id,
                coinID: selectedValue.id,
                title,
                content
            }
            dispatch(createNewBlogThunk(newBlog));
            navigate('/bloglist');
        }

    }

    const defaultOpt = [
        { name: 'Please input the keyword of Crypto', id: 'Bitcoin' },
    ];

    return (

        <form className={"container col-xxl-6 col-xl-7 col-lg-8 col-md-9 col-sm-12 col-12"}
              onSubmit={handleSubmit}>
            <label>
                <div className={"form-group"}>
                    Choose the coin
                    <AsyncSelect
                        className={"form-control"}
                        cacheOptions
                        defaultOptions={defaultOpt}
                        placeholder={"Search coin here"}
                        value={selectedValue}
                        getOptionLabel={e => e.name}
                        getOptionValue={e => e.id}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                    />
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"title"}>
                        Title:
                    </label>
                    <input id={"title"} className={"form-control"} type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"content"}>
                        Content:
                    </label>
                    <textarea id={"content"} rows="15" className={"form-control wd-textarea-resize-none"} value={content} onChange={handleContentChange} />
                </div>
                <button type="submit"
                        className="btn wd-btn-style w-100 mt-2" >
                    Publish
                </button>
            </label>
        </form>
    );
}


export default BlogPostScreen;
