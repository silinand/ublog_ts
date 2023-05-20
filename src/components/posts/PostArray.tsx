import { useState, useEffect } from 'react'

import { getPosts } from '../../core/requestHelper'
import PostEntity from '../../core/models/PostEntity'

import Loader from '../Loader'
import Post from '../posts/Post'

export default function Posts(props: { type?: string, id?: string }) {
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function next() {
        getPosts(props.type ?? "", props.id ?? "").then(items => {
            setPosts(items);
            setIsLoaded(items.length != 0);
        });
    }

    useEffect(() => {
        next();
    }, [])

    return (
        <div className="App">
            <Loader loaded={isLoaded}>
                {posts.map(o => <Post key={o.id} id={o.id} user={o.userId} imageUrl={o.imageUrl} text={o.text}
                    title={o.title} time={o.creationTime} likeCount={o.likes} liked={o.isLiked} canShare={true} />)}

                <button className='load' onClick={next}>next page</button>
            </Loader>
        </div>)
}