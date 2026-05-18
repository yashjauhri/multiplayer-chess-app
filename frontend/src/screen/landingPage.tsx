import { useNavigate } from "react-router-dom";

import chess from "../assets/chess1.jpg";
import chessLeft from "../assets/chessLeft.jpg";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                
                <div>
                    <img
                        src={chess}
                        alt="Chess"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div
                    className="flex flex-col justify-center items-center text-white bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${chessLeft})`,
                    }}
                >
                    <div className="text-3xl pb-4 font-bold">
                        Play Chess Online
                    </div>

                    <button
                        onClick={() => navigate("/game")}
                        className="bg-green-500 text-3xl px-8 py-4 rounded-2xl shadow-2xl shadow-black hover:scale-105 transition"
                    >
                        Play Online
                    </button>
                </div>
            </div>
        </div>
    );
};