const KEY = `vlyiNA7nFMHMjK6AA0xc7g22vb29mVw5`;
let isRehydrating = false;
let page = 0;
let limit = 50;
let step = 50;

const fetcher = () => {
    const value = document.querySelector("#input-search").value;

    if (value == "") return;

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${KEY}&offset=${page}&limit=${limit}&q=${value.trim()}`)
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector(".container");

            console.log(data)
            
            for (let i = 0; i < data.data.length; i++) {
                container.innerHTML += `
                    <img src="${data.data[i].images.downsized.url}" alt="${data.data[i].title}">
                `
            };
        })
}

document.querySelector("#form-gifs").addEventListener("submit", (e) => {
    e.preventDefault();
    fetcher();
})

function checkForHydratingAgain() {
    const timeOut = setTimeout(()=>{
        isRehydrating = false;
        clearTimeout(timeOut);
    }, 1000);
};

document.addEventListener("scroll", (_e)=> {
    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    if (height - 1000 < window.scrollY) {
        if (!isRehydrating) {
            isRehydrating = true;
            page += step;
            limit += step;
            checkForHydratingAgain();
            fetcher();
        }
    }
});