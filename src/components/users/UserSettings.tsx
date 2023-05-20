import { useEffect, useState } from "react";
import { getPath, getUser, executeUserUpdate } from "../../core/requestHelper";
import readImage from "../../core/fileHelper";

export default function UserSettings(props: {id: string}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [source, setSource] = useState("");

    useEffect(() => {
        getUser(props.id).then(user => {
            setEmail(user.email);
            setName(user.name);
            setBio(user.bio);

            if (user.imageUrl !== null) {
                setSource(getPath(user.imageUrl))
            }
        })
    }, [])

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        var imageUrl = await readImage(image);
        executeUserUpdate(email, name, bio, imageUrl);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
        var s = URL.createObjectURL(new Blob([image]))
        setSource(s);
    };

    return <form onSubmit={onSubmitHandler}>
        <div className="postEditor">
            <div>
                <h2>User settings</h2>
                <hr />
            </div>
            <input type="text" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="text" placeholder="Name..." value={name} onChange={e => setName(e.target.value)} required />
            <img src={source} />
            <input type="file" accept="image/png, image/jpeg, image/jpg" value={image} onChange={onChange} />
            <textarea placeholder="Bio..." value={bio} onChange={e => setBio(e.target.value)} required />
            <div>
                <button type="submit" className="submitbtn">Save</button>
            </div>
        </div>
    </form>
}