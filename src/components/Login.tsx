import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { executeLogin } from "../core/requestHelper"
import UserManager from "../core/userManager";

export default function Login(props: {userManager: UserManager}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        executeLogin(name, password)
            .then(response => {
                props.userManager.setUser(response.id, response.image, response.token);
                navigate("/user/" + response.id);
            });
    }

    return <form onSubmit={onSubmitHandler}>

        <div className="loginForm">
            <h1>Log in</h1>
            <p>Fill in this form to log in into account.</p>
            <hr />

            <label><b>Username</b></label>
            <input type="text" placeholder="Enter Username" value={name} onChange={(o) => setName(o.target.value)} required />

            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(o) => setPassword(o.target.value)} required />

            <button type="submit" className="submitbtn">Login</button>
        </div>
    </form>
}