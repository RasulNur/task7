import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const Login = ({ setIsAuth }) => {
    const cookies = new Cookies();
    const [username, setUsermame] = useState("");

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username,
        }).then((res) => {
            const { token, userId, username } = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            setIsAuth(true);
        });
    };

    return (
        <div className="login">
            <label>Login</label>

            <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                    setUsermame(e.target.value);
                }}
            />
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;
