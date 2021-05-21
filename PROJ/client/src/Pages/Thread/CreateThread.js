import React, {useState, useContext} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const CreateForum = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();

    const handleOnSubmit = async event => {
        event.preventDefault();

        const data = {
            title,
            content,
            userId: user._id,
            forumId: id
        };

        const response = await axios.post('/api/thread/create', data);
        const {_id} = response.data;
        history.push('/thread/'+_id);
    }

    return (
        <div style={{padding:'2rem'}}>
            <h1 style={{marginBottom: "2rem"}}> Create Thread</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField 
                    variant="outlined" 
                    label="Title" 
                    required 
                    fullWidth 
                    margin="normal" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}/>

                <textarea 
                    placeholder="Content" 
                    required 
                    style={{width: "100%", height: "20%"}}
                    value={content} 
                    onChange={e => setContent(e.target.value)}/>

                {/* <input type="file" name="file" id="file" class="custom-file-input"></input>
                <label for="file" class="custom-file-label">Choose File</label> */}

                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>       
    )
};

export default CreateForum;