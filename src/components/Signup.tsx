import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { executeSignup } from "../core/requestHelper";
import UserManager from "../core/userManager";

export default function Signup(props: {userManager: UserManager}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        executeSignup(name, password)
            .then(response => {
                props.userManager.setUser(response.id, response.image, response.token);
                navigate("/user/" + response.id);
            });
    }

    return <form onSubmit={onSubmitHandler}>
        <div className="loginForm">
            <h1>Sign Up</h1>
            <p>Fill in this form to create an account.</p>
            <hr />

            <label><b>Username</b></label>
            <input type="text" placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} required />

            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label><b>Repeat Password</b></label>
            <input type="password" placeholder="Enter Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} required />

            <button type="submit" className="submitbtn">Sign Up</button>
        </div>
    </form>
}