import Follow from "../components/follow.jsx";
import Feed from "../components/feed.jsx";
import "../styles/Root.scss";
import {useState} from "react";

export default function Root() {
    //const [mode, setMode] = useState("feed");

    return (
        <>
            <div className={"hero"}>
                <Feed />
                <Follow />
            </div>
        </>
    );
}