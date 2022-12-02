import React, { useState } from "react";
import Board from "./Board";

const Game = ({ channel, setChannel }) => {
    const [playersJoined, setPlayersJoined] = useState(
        channel.state.watcher_count === 2
    );
    const [result, setResult] = useState({ winner: "none", state: "none" });

    channel.on("user.watching.start", (e) => {
        setPlayersJoined(e.watcher_count === 2);
    });
    if (!playersJoined) {
        return (
            <div className="waiting">Waiting for other player to join...</div>
        );
    }
    return (
        <div className="gameContainer">
            <div className="winText">
                {result.state === "won" && (
                    <div>{result.winner} won the game </div>
                )}
                {result.state === "tie" && <div>Game tied</div>}
            </div>

            <Board result={result} setResult={setResult} />
            <button
                className="leaveGameButton"
                onClick={async () => {
                    await channel.stopWatching();
                    setChannel(null);
                }}
            >
                Leave Game
            </button>
        </div>
    );
};

export default Game;
