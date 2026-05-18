import { Chess } from "chess.js";
import type WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;

    private board: Chess;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;

        this.board = new Chess();

        this.player1.send(
            JSON.stringify({
                type: INIT_GAME,
                payload: {
                    color: "white",
                },
            })
        );

        this.player2.send(
            JSON.stringify({
                type: INIT_GAME,
                payload: {
                    color: "black",
                },
            })
        );
    }

    makeMove(
        socket: WebSocket,
        move: {
            from: string;
            to: string;
        }
    ) {
        // check turn
        if (
            (this.board.turn() === "w" && socket !== this.player1) ||
            (this.board.turn() === "b" && socket !== this.player2)
        ) {
            return;
        }

        try {
            this.board.move({
                from: move.from,
                to: move.to,
            });
        } catch (e) {
            console.log("invalid move");
            return;
        }

        // send updated move to BOTH
        const message = JSON.stringify({
            type: MOVE,
            payload: {
                from: move.from,
                to: move.to,
            },
        });

        this.player1.send(message);
        this.player2.send(message);

        // game over
        if (this.board.isGameOver()) {
            const gameOverMessage = JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner:
                        this.board.turn() === "w"
                            ? "black"
                            : "white",
                },
            });

            this.player1.send(gameOverMessage);
            this.player2.send(gameOverMessage);
        }
    }
}