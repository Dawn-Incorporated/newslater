export default function Feed() {

    function send(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("url", e.target.querySelector("#url").value);
        formData.append("name", e.target.querySelector("#name").value);
        formData.append("description", e.target.querySelector("#description").value);
        formData.append("website", e.target.querySelector("#website").value);

        fetch("http://192.168.1.26:4000/feed/create", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                res.status === 200
                    ? (e.target.querySelector("button").style.backgroundColor = "lightgreen")
                    : (e.target.querySelector("button").style.backgroundColor = "red");
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (<>
            <form onSubmit={send}>
                <input id={'url'} type="text" placeholder="http://..."/>
                <input id={'name'} type="text" placeholder="name"/>
                <input id={'description'} type="text" placeholder="description"/>
                <input id={'website'} type="text" placeholder="website"/>
                <button type="submit">Submit</button>
            </form>
        </>);
}