import Follow from "../components/follow.jsx";
import Feed from "../components/feed.jsx";
import "../styles/Root.scss";
import {useState} from "react";

export default function Root() {
    const [mode, setMode] = useState("feed");

    return (
        <>
            {mode === "feed" && <Feed />}
            {mode === "user" && <Follow />}

            <button onClick={() => mode === "feed" ? setMode("user") : setMode("feed")}>Switch</button>
        </>
    );
}