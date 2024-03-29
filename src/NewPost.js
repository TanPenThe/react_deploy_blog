import { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';

const NewPost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    const { posts, setPosts } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try {
          const response = await api.post('/posts', newPost);
          const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/');
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="Post Title">Title:</label>
                <input
                    id="postTitle"
                    required
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
