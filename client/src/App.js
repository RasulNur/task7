import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
    const api_key = "uu6gh4c9m79e";
    const cookies = new Cookies();
    const token = cookies.get("token");
    const client = StreamChat.getInstance(api_key);
    const [isAuth, setIsAuth] = useState(false);

    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("username");
        client.disconnectUser();
        setIsAuth(false);
    };

    if (token) {
        client
            .connectUser(
                {
                    id: cookies.get("userId"),
                    name: cookies.get("username"),
                },
                token
            )
            .then((user) => {
                setIsAuth(true);
            });
    }

    return (
        <div className="App">
            {isAuth ? (
                <Chat client={client}>
                    <div className="joinGameForm">
                        <JoinGame />
                        <button onClick={logout}>Log Out</button>
                    </div>
                </Chat>
            ) : (
                <div className="registrationContainer">
                    <Signup setIsAuth={setIsAuth} />
                    <Login setIsAuth={setIsAuth} />
                </div>
            )}
        </div>
    );
}

export default App;
