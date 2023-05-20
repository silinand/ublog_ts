import { getPath } from '../../core/requestHelper';

export default function UserHeader(props: { id: string, imageUrl: string, posts: number, followers: number, followings: number }) {
  var link1 = "/user/" + props.id + "/followers";
  var link2 = "/user/" + props.id + "/following";
  var source = props.imageUrl == null ? "" : getPath(props.imageUrl);

  return <div className="userHeader">
    <h2>{props.id}</h2>
    {
      props.imageUrl == null
        ? <img src="../avatar.jpg" />
        : <img src={source} alt={props.id} />
    }
    <div className="counts">
      <p><b>{props.posts}</b> posts</p>
      <p><a href={link1}><b>{props.followers}</b> followers</a></p>
      <p><a href={link2}><b>{props.followings}</b> following</a></p>
    </div>
  </div>
}