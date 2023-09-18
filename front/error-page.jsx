import {useEffect} from "react";
import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    useEffect(() => {
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    }, []);

    return (
        <>
            <div id={"errorPage"}>
                <h1>Oops!</h1>
                <p>Désolé, une erreur inattendue s&apos;est produite.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <button onClick={() => (window.location.href = "/")}>Retour</button>
            </div>
        </>
    );
}
