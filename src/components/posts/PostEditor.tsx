import { useRef, useEffect, useState, ReactEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { executePostCreation, getPath, getPost } from '../../core/requestHelper';
import readImage from '../../core/fileHelper';

export default function PostEditor(props: {isEdit?: boolean}) {
    const navigate = useNavigate();
    const params = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [source, setSource] = useState("");

    var header = props.isEdit ? "Edit post" : "New post";

    useEffect(() => {
        if (props.isEdit) {
            getPost(params.id!).then(post => {
                setTitle(post.title);
                setText(post.text);
                setSource(getPath(post.imageUrl))
            })
        }
    }, [])

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        executePostCreation(title, text, await readImage(image))
            .then(response => {
                if (response.ok) {
                    navigate("/post/" + response.value);
                }
            })
            .catch(e => console.log(e));
    }

    const onChange = () => {
        var s = URL.createObjectURL(new Blob([image]))
        setSource(s);
    };

    return <form onSubmit={onSubmitHandler}>
        <div className="postEditor">
            <div>
                <h2>{header}</h2>
                <hr />
            </div>
            <input type="text" placeholder="Title..." value={title} onChange={o => setTitle(o.target.value)} required />
            <img src={source} />
            <input type="file" accept="image/png, image/jpeg, image/jpg" value={image} onChange={e => setImage(e.target.value)} />
            <textarea placeholder="Write here..." value={text} onChange={e => setText(e.target.value)} required />
            <div>
                <button type="submit" className="submitbtn">Create</button>
                <button className="cancelbtn">Cancel</button>
            </div>
        </div>
    </form>
}