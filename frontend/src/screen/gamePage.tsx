import { useEffect, useState } from "react";
import { Chess } from "chess.js";

import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const OPPONENT_LEFT = "opponent_left";

export const GamePage = () => {
    const socket = useSocket();

    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    const [playerColor, setPlayerColor] =
        useState<"white" | "black">("white");

    const [gameStarted, setGameStarted] = useState(false);

    const [turn, setTurn] =
        useState<"white" | "black">("white");

    const [status, setStatus] =
        useState("Click Play to start");

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case INIT_GAME: {
                    const newChess = new Chess();

                    setChess(newChess);
                    setBoard(newChess.board());

                    setPlayerColor(message.payload.color);

                    setGameStarted(true);

                    setTurn("white");

                    setStatus("Game Started");

                    break;
                }

                case MOVE: {
                    setChess((prevChess) => {
                        const newChess = new Chess(prevChess.fen());

                        newChess.move({
                            from: message.payload.from,
                            to: message.payload.to,
                        });

                        setBoard(newChess.board());

                        setTurn(
                            newChess.turn() === "w"
                                ? "white"
                                : "black"
                        );

                        return newChess;
                    });

                    break;
                }

                case GAME_OVER: {
                    alert(`Winner is ${message.payload.winner}`);

                    setGameStarted(false);

                    setStatus("Game Over");

                    break;
                }

                case OPPONENT_LEFT: {
                    setGameStarted(false);

                    setStatus(
                        "Opponent left the game. Start a new game."
                    );

                    break;
                }
            }
        };
    }, [socket]);

    if (!socket) {
        return <div>Connecting...</div>;
    }

    return (
        <div className="pt-8 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-200 p-4 rounded-lg">

                <div className="flex flex-col items-center">

                    <div className="text-2xl font-bold mb-2">
                        {status}
                    </div>

                    <div className="text-lg mb-2">
                        {gameStarted
                            ? `You are ${playerColor}`
                            : "Waiting for opponent..."}
                    </div>

                    {gameStarted && (
                        <div className="text-lg mb-4">
                            {turn === playerColor
                                ? "Your Turn"
                                : "Opponent's Turn"}
                        </div>
                    )}

                    <ChessBoard
                        chess={chess}
                        board={board}
                        socket={socket}
                        setBoard={setBoard}
                        playerColor={playerColor}
                    />
                </div>

                <div className="flex justify-center items-center bg-green-200 rounded-lg">
                    <button
                        className="bg-black text-white px-6 py-3 rounded-lg"
                        onClick={() => {
                            if (gameStarted) return;

                            socket.send(
                                JSON.stringify({
                                    type: INIT_GAME,
                                })
                            );

                            setStatus(
                                "Waiting for opponent..."
                            );
                        }}
                    >
                        Play
                    </button>
                </div>

            </div>
        </div>
    );
};