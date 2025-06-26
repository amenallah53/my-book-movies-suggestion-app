async function hundleSubmit (id,name,age) {
    try {
        const response = await fetch("http//:localhost:500/api/recommend",{
            method : "POST",
            headers : "JSON-application",
            body : JSON.stringify({
                id,
                name,
                age
            })
        })

        if (!response.ok){
            throw new Error(`Error ! I am sorry but we have an HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);

    } catch (err) {
        console.error("Fetch error : ",err);
    }
}