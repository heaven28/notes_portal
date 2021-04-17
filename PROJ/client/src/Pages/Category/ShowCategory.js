import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';


export default function ShowCategory(){
    const history = useHistory();
    const {id} = useParams();


    const [category, setCategory] = useState(null);
    const [forums, setForums] = useState([]);

    useEffect(() => {
        getCategory();
        getForums();
    }, []);

    const getCategory = async () => {
        const response = await axios.get('/api/category/'+id);
        setCategory(response.data);
    };

    const getForums = async () => {
        const response = await axios.get('/api/forum/category/'+id);
        setForums(response.data);
    }


    return(
        <div style={{padding: '2rem'}}>
            {category && <h1>{category.title}</h1>}  

            <Button variant="contained" color="primary" onClick={() => history.push("/forum/create/"+id)}>Create Forum</Button>

            <List>
                {forums.map((forum, index) => (
                    <ListItem key={index} button onClick={() => history.push(`/forum/${forum._id}`)}>
                        <ListItemText primary={forum.title} secondary={forum.createdAt} /> 

                    </ListItem>
                ))}
            </List>
        </div>
    )
}