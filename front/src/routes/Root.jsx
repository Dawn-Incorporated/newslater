import Follow from "../components/follow.jsx";
import Feed from "../components/feed.jsx";
import "../styles/Root.scss";

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