import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const Signup = ({ setIsAuth }) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    const signUp = async () => {
        Axios.post("http://localhost:3001/signup", user).then((res) => {
            const { token, userId, username } = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            setIsAuth(true);
        });
    };

    return (
        <div className="signup">
            <label>Sign Up</label>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                }}
            />
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
};

export default Signup;
