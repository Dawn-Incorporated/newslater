export default function Follow() {

    function send(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("url", e.target.querySelector("#url").value);
        formData.append("login", e.target.querySelector("#login").value);

        //192.168.1.26
        fetch("http://100.104.59.104:4000/follow/create", {
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
                <input id={'url'} type="text" placeholder="url"/>
                <input id={'login'} type="text" placeholder="login"/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}