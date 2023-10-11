import {useRef} from "react";

export default function Feed() {
    const url = useRef();
    const name = useRef();
    const description = useRef();
    const website = useRef();
    const button = useRef();


    function send(e) {
        e.preventDefault();
        if(!url.current.value || !name.current.value || !description.current.value || !website.current.value){
            button.current.style.backgroundColor = "red";
            return;
        }
        const formData = new FormData();
        formData.append("url", url.current.value);
        formData.append("name", name.current.value);
        formData.append("description", description.current.value);
        formData.append("website", website.current.value);

        fetch("http://192.168.1.26:4000/feed/create", {
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
                <input ref={url} type="text" placeholder="http://..."/>
                <input ref={name} type="text" placeholder="name"/>
                <input ref={description} type="text" placeholder="description"/>
                <input ref={website} type="text" placeholder="website"/>
                <button ref={button} type="submit">Submit</button>
            </form>
        </>);
}