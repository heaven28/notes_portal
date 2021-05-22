import React, {useState, useContext} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const CreateThread = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");

    const history = useHistory();

    const handleOnSubmit = async event => {
        event.preventDefault();

        const form = document.getElementById("thread_create");
        let data = new FormData(form);
        // const data = {
        //     title,
        //     content,
        //     userId: user._id,
        //     forumId: id,
        //     file
        // };
        console.log(title);
        console.log(content);
        data.append('title', title);
        data.append('content', content);
        data.append('userId', user._id);
        data.append('forumId', id);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        const response = await axios.post('/api/thread/create', data, config);
        const {_id} = response.data;
        history.push('/thread/'+_id);
    }

    return (
        <div style={{padding:'2rem'}}>
            <h1 style={{marginBottom: "2rem"}}> Create Thread</h1>

            <form onSubmit={handleOnSubmit} id="thread_create">
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

                <label for="file">Choose File</label>
                <input type="file" name="file" id="file"
                    value={file}
                    onChange={e => setFile(e.target.value)}/>

                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>       
    )
};

export default CreateThread;