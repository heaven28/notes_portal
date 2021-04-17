import React, {useState} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';


const CreateForum = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const history = useHistory();

    const handleOnSubmit = async event => {
        event.preventDefault();

        const data = {
            title,
            categoryId: id
        };

        const response = await axios.post('/api/forum/create', data);
        const {_id} = response.data;
        history.push('/forum/'+_id);
    }

    return (
        <div style={{padding:'2rem'}}>
            <h1 style={{marginBottom: "2rem"}}> Create Forum</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField variant="outlined" label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>       
    )
};

export default CreateForum;