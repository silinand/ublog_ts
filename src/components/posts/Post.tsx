import { ReactElement, useState } from 'react';

import { getPath, executeLike } from '../../core/requestHelper';

import shareIcon from '../../resources/share.png';
import editIcon from '../../resources/edit.png';
import heartIcon from '../../resources/heart.png';
import heartLikedIcon from '../../resources/heart-liked.png';

export default function Post(props: {id: string,
    text: string,
    user: string,
    title: string,
    imageUrl: string,
    time: Date,
    likeCount: number,
    liked: boolean,
    canShare: boolean }): ReactElement | null {
        
    const [like, setLike] = useState(props.liked);
    const [count, setCount] = useState(props.likeCount);

    var source = getPath(props.imageUrl);
    var userLink = "/user/" + props.user;
    var shareLink = "/post/" + props.id;
    var editLink = "/edit-post/" + props.id;

    const doLike = () => {
        executeLike(props.id, !like);
        setCount(!like ? count + 1 : count - 1)
        setLike(!like);
    }

    return <div className="article">
        <h2>{props.title}</h2>
        <h4><a href={userLink}>{props.user}</a></h4>
        <h5>{props.time.toString()}</h5>
        <div>
            <img src={source} alt={props.title} />
            <p>{props.text}</p>
        </div>

        <div className='postButtons'>
            {props.canShare && <a href={shareLink}><button><img src={shareIcon} /></button></a>}
            <a href={editLink}><button><img src={editIcon} /></button></a>
            <button onClick={doLike}>
                {like ? <img src={heartLikedIcon} />
                    : <img src={heartIcon} />}
            </button>

            {count}
        </div>
    </div>
}