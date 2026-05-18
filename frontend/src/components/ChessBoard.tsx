import { type Color, type PieceSymbol, type Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screen/gamePage";

export const ChessBoard = ({
    board,
    socket,
    playerColor,
}: {
    chess: any;
    setBoard: any;
    board: (
        {
            square: Square;
            type: PieceSymbol;
            color: Color;
        } | null
    )[][];
    socket: WebSocket;
    playerColor: "white" | "black";
}) => {
    const [from, setFrom] = useState<null | Square>(null);

    const pieces: any = {
        wp: "♙",
        wr: "♖",
        wn: "♘",
        wb: "♗",
        wq: "♕",
        wk: "♔",

        bp: "♟",
        br: "♜",
        bn: "♞",
        bb: "♝",
        bq: "♛",
        bk: "♚",
    };

    const displayedBoard =
        playerColor === "black"
            ? [...board].reverse().map((row) => [...row].reverse())
            : board;

    return (
        <div>
            {displayedBoard.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((square, j) => {
                        const squareRepresentation =
                            (
                                playerColor === "white"
                                    ? String.fromCharCode(97 + j) + (8 - i)
                                    : String.fromCharCode(104 - j) + (i + 1)
                            ) as Square;

                        return (
                            <div
                                key={j}
                                onClick={() => {
                                    // first click
                                    if (!from) {
                                        if (!square) return;

                                        setFrom(squareRepresentation);
                                        return;
                                    }

                                    // second click
                                    socket.send(
                                        JSON.stringify({
                                            type: MOVE,
                                            payload: {
                                                from,
                                                to: squareRepresentation,
                                            },
                                        })
                                    );

                                    setFrom(null);
                                }}
                                className={`w-16 h-16 flex justify-center items-center ${
                                    (i + j) % 2 === 0
                                        ? "bg-green-500"
                                        : "bg-white"
                                }`}
                            >
                                <div className="text-3xl text-black">
                                    {square
                                        ? pieces[
                                              square.color + square.type
                                          ]
                                        : ""}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};