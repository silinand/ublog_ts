import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowerUsers, getFollowingUsers } from '../../core/requestHelper';
import Loader from '../Loader';

export default function UserArray(props: {type: string}) {
    const params = useParams();
    const [users, setUsers] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const title = props.type == 'follower'
        ? "All followers"
        : "All folowing";

    function next() {
        loadData(props.type, params.id!).then(items => {
            setUsers(items);
            setIsLoaded(items.length != 0);
        });
    }

    useEffect(() => { next() }, []);

    return <div>
        <h2>{params.id}</h2>
        <h3>{title}</h3>
        <Loader loaded={isLoaded}>
            <div className='userLinks'>
                {users.map(o => <a key={o} href={'/user/' + o}>{o}</a>)}
            </div>
        </Loader>
    </div>
}

function loadData(type: string, id: string): Promise<string[]> {
    return type == "follower"
        ? getFollowerUsers(id)
        : getFollowingUsers(id);
}