import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


export default function BrowseCategories(){

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await axios.get('/api/category');
        setCategories(response.data);
    };
    const history = useHistory();
    return(
        <div style={{padding: '2rem'}}>
            <h1>Browse Category</h1>

            <Button variant="contained" color="primary" onClick={() => history.push('/category/create')}>
                Create Category
            </Button>

            <Divider style={{margin: '2rem 0'}}/>

            <List>
                {categories.map((cat, index) => (
                    <ListItem key={index} button onClick={() => history.push(`/category/${cat._id}`)}>
                        <ListItemText primary={cat.title} secondary={cat.createdAt} /> 

                    </ListItem>
                ))}
            </List>
        </div>
    )
}