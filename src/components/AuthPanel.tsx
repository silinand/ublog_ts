import { getPath } from '../core/requestHelper'
import logoutIcon from '../resources/logout.png'
import UserManager from '../core/userManager';

export default function AuthPanel(props: {userManager: UserManager}) {
    var user = props.userManager.getUser();

    if (user.isEmpty) {
        return <div className="right" >
            <a href="/signup" > Sign up </a>
            < a href="/login" > Log in </a>
        </div>
    }

    var source = getPath(user.image);
    var link = "/user/" + user.id;

    return <div className="authPanel" >
        <img className="userIcon" src={source} />
        <a className="userlink" href={link} > {user.id} </a>
        <button onClick={props.userManager.logout} >
            <img className="logoutIcon" src={logoutIcon} />
        </button>
    </div>
}