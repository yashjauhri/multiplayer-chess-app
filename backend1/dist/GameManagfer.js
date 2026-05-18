import { INIT_GAME, MOVE, OPPONENT_LEFT } from "./messages.js";
import { Game } from "./game.js";
export class GameManager {
    games;
    pendingUser;
    users;
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
        console.log("user added");
    }
    removeUser(socket) {
        this.users = this.users.filter((u) => u !== socket);
        if (this.pendingUser === socket) {
            this.pendingUser = null;
        }
        const game = this.games.find((g) => g.player1 === socket ||
            g.player2 === socket);
        if (game) {
            const opponent = game.player1 === socket
                ? game.player2
                : game.player1;
            opponent.send(JSON.stringify({
                type: OPPONENT_LEFT,
            }));
            this.games = this.games.filter((g) => g !== game);
        }
        console.log("user removed");
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            console.log("message received:", message);
            if (message.type === INIT_GAME) {
                console.log("INIT_GAME received");
                // prevent same user from joining twice
                if (this.pendingUser === socket) {
                    console.log("already waiting");
                    return;
                }
                // prevent user already in game
                const existingGame = this.games.find((g) => g.player1 === socket ||
                    g.player2 === socket);
                if (existingGame) {
                    console.log("user already in game");
                    return;
                }
                if (this.pendingUser) {
                    console.log("starting game");
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    console.log("waiting for second player");
                    this.pendingUser = socket;
                }
            }
            if (message.type === MOVE) {
                const game = this.games.find((g) => g.player1 === socket ||
                    g.player2 === socket);
                if (!game) {
                    console.log("game not found");
                    return;
                }
                game.makeMove(socket, message.payload);
            }
        });
    }
}
//# sourceMappingURL=GameManagfer.js.map