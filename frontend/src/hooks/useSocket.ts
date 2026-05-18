import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log("Connected");
            setSocket(ws);
        };

        ws.onerror = (err) => {
            console.log("WebSocket error:", err);
        };

        ws.onclose = () => {
            console.log("Disconnected");
        };

        // IMPORTANT:
        // don't auto-close during strict mode rerenders
        return () => {};
    }, []);

    return socket;
};