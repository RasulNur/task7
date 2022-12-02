import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import { Patterns } from "./WinningPatterns";

const Board = ({ result, setResult }) => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");

    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    useEffect(() => {
        checkIfDraw();
        checkWin();
    }, [board]);

    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");

            await channel.sendEvent({
                type: "game-move",
                data: { square, player },
            });

            setBoard(
                board.map((val, i) => {
                    if (i === square && val === "") {
                        return player;
                    }
                    return val;
                })
            );
        }
    };

    const checkWin = () => {
        Patterns.forEach((curr) => {
            const firstPlayer = board[curr[0]];
            if (firstPlayer == "") return;
            let foundWinningPattern = true;
            curr.forEach((i) => {
                if (board[i] != firstPlayer) {
                    foundWinningPattern = false;
                }
            });

            if (foundWinningPattern) {
                setResult({ winner: board[curr[0]], state: "won" });
            }
        });
    };

    const checkIfDraw = () => {
        let filled = true;
        board.forEach((square) => {
            if (square == "") {
                filled = false;
            }
        });

        if (filled) {
            setResult({ winner: "none", state: "draw" });
        }
    };

    channel.on((e) => {
        if (e.type === "game-move" && e.user.id !== client.userID) {
            const currPlayer = e.data.player === "X" ? "O" : "X";
            setPlayer(currPlayer);
            setTurn(currPlayer);

            setBoard(
                board.map((val, i) => {
                    if (i === e.data.square && val === "") {
                        return e.data.player;
                    }
                    return val;
                })
            );
        }
    });

    return (
        <div className="board">
            <div className="turn">{`Turn: ${turn}`}</div>

            <div className="row">
                <Square chooseSquare={() => chooseSquare(0)} val={board[0]} />
                <Square chooseSquare={() => chooseSquare(1)} val={board[1]} />
                <Square chooseSquare={() => chooseSquare(2)} val={board[2]} />
            </div>
            <div className="row">
                <Square chooseSquare={() => chooseSquare(3)} val={board[3]} />
                <Square chooseSquare={() => chooseSquare(4)} val={board[4]} />
                <Square chooseSquare={() => chooseSquare(5)} val={board[5]} />
            </div>
            <div className="row">
                <Square chooseSquare={() => chooseSquare(6)} val={board[6]} />
                <Square chooseSquare={() => chooseSquare(7)} val={board[7]} />
                <Square chooseSquare={() => chooseSquare(8)} val={board[8]} />
            </div>
        </div>
    );
};

export default Board;
