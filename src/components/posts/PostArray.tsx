import { useState, useEffect } from 'react'

import { getPosts } from '../../core/requestHelper'
import { IPostEntity } from '../../core/models/PostEntity'

import Loader from '../Loader'
import Post from '../posts/Post'

export default function Posts(props: { type?: string, id?: string }) {
    const [posts, setPosts] = useState<IPostEntity[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string>();

    function next() {
        getPosts(props.type ?? "", props.id ?? "").then(items => {
            setPosts(items);
            setIsLoaded(items.length != 0);
        }, 
        err => setError(err.message));
    }

    useEffect(() => {
        next();
    }, [])

    return (
        <div className="App">
            <Loader loaded={isLoaded} message={error}>
                {posts.map(o => <Post key={o.id} id={o.id} user={o.userId} imageUrl={o.imageUrl} text={o.text}
                    title={o.title} time={o.creationTime} likeCount={o.likes} liked={o.isLiked} canShare={true} />)}

                <button className='load' onClick={next}>next page</button>
            </Loader>
        </div>)
}