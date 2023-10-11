import {useRef} from "react";

export default function Follow() {
    const url = useRef();
    const login = useRef();
    const button = useRef();
    const autocompletion = useRef();

    function research() {
        autocompletion.current.innerHTML = "";
        if (!url.current.value) return;

        fetch("http://192.168.1.26:4000/feed/get?name=" + url.current.value, {
            method: "GET",
        })
            .then(async (res) => {
                const data = await res.json();
                for (const key in data) {
                    const div = document.createElement("div");
                    div.innerHTML = data[key].name + ' - ' + data[key].description;
                    div.addEventListener("click", () => {
                        url.current.value = data[key].url;
                    })
                    autocompletion.current.appendChild(div);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function send(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("url", url.current.value);
        formData.append("login", login.current.value);

        //192.168.1.26
        fetch("http://192.168.1.26:4000/follow/create", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                res.status === 200
                    ? (button.current.style.backgroundColor = "lightgreen")
                    : (button.current.style.backgroundColor = "red");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<>
            <form onSubmit={send}>
                <input ref={url} onInput={research} type="text" placeholder="url"/>
                <div ref={autocompletion}>

                </div>
                <input ref={login} type="text" placeholder="login"/>
                <button ref={button} type="submit">Submit</button>
            </form>
        </>
    );
}