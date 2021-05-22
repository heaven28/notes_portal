import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../Contexts/AuthContext';
import Button from '@material-ui/core/Button';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {TextField} from "@material-ui/core";


export default function ShowThread(){

    const {user} = useContext(AuthContext);
    const [thread, setThread] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [image, setImage] = useState("");



    const {id} = useParams();

    useEffect(() => {
        getThread();
        getPosts();
    }, []);


    const getThread = async () => {
        const response = await axios.get('/api/thread/'+id);
        setThread(response.data.thread);
        setImage(response.data.file.filename);
    };

    const getPosts = async () => {
        const response = await axios.get('/api/post/thread/'+id, {
            params: {
                page
            }
        });
        if(response.data.length){
            setPosts(response.data);
            setPage(page + 1);
            setHasMore(true);
        }else {
            setHasMore(false);
        }
    };

    const handleReply = async e => {
        e.preventDefault();

        if(!replyContent){return;}
        
        if(!user){return;}
        
        const data = {
            userId: user._id,
            threadId: thread._id,
            content: replyContent
        };
        console.log(data);
        const response = await axios.post('/api/post/create', data);
        setPosts([...posts, response.data]);
        setIsReplying(false);
        console.log(posts);
    };

    const history = useHistory();

    return(
        <div style={{padding: '2rem'}}>
            {thread && <h1>{thread.title}</h1>}  
            {thread && <p>{thread.content}</p>}
            {thread && <p><img src={'/api/image/'+image} alt='error'/></p>}

            <List>
                {posts.map((post, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={post.content} secondary={post.createdAt} /> 
                    </ListItem>
                ))}
            </List>

            <Button 
                variant="contained" 
                color="primary" 
                disabled={!hasMore}
                style={{marginRight: '1rem'}} 
                onClick={() => getPosts()}>Load More Posts</Button>

            <Button margin="normal" variant="contained" color="primary" onClick={() => setIsReplying(true)}>Reply</Button>
            {isReplying && (
                <form onSubmit={handleReply}>
                    <TextField 
                        margin="normal" 
                        variant="outlined" 
                        fullWidth 
                        label="content" 
                        value={replyContent} 
                        onChange={e => setReplyContent(e.target.value)}/>
                    <Button type="submit" variant="contained" color="primary">Reply</Button>
                </form>
            )}
            
        </div>
    )
}