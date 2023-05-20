import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../core/requestHelper';
import PostEntity from '../../core/models/PostEntity';
import Loader from '../Loader'
import Post from "./Post"

export default function PostViewer() {
    const params = useParams();
    const [post, setPost] = useState(PostEntity.empty());
    const [isLoaded, setIsLoaded] = useState(false);

    function next() {
        getPost(params.id!).then(item => {
            setPost(item);
            setIsLoaded(item !== null);
        });
    }

    useEffect(() => {
        next();
    }, [])

    return <Loader loaded={isLoaded}>
        <Post key={post.id} id={post.id} user={post.userId} imageUrl={post.imageUrl} likeCount={post.likes}
            liked={post.isLiked} text={post.text} title={post.title} time={post.creationTime} canShare={false} />
    </Loader>
}