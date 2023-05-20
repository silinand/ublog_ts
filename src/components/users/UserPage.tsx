import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PostsArray from '../posts/PostArray'
import UserHeader from './UserHeader'
import Loader from '../Loader'
import { getUser } from "../../core/requestHelper"
import UserEntity from '../../core/models/UserEntity'

export default function UserPage(props: {id: string}) {
    var params = useParams();
    const [user, setUser] = useState(UserEntity.empty());

    var isMyPage = props.id == params.id;

    useEffect(() => {
        getUser(params.id!).then(setUser);
    }, []);


    return <div>
        <Loader loaded={user.id != ""}>
            <UserHeader id={params.id!}
                imageUrl={user.imageUrl}
                followers={user.followersCount}
                followings={user.followingsCount}
                posts={user.postsCount} />
            {
                isMyPage
                    ? <button><a href="/settings">Edit profile</a></button>
                    : <button>Subscribe</button>
            }
            <PostsArray type={"user"} id={params.id!} />
        </Loader>
    </div>
}