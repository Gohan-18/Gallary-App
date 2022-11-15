const API_KEY = "JIiTGGkMz0PshhK76-PKRRkM1VplhiViGoRJNYG9yUw";
const search = document.querySelector("#input-field");
const submitBtn = document.querySelector("#submit-btn");
const imageField = document.querySelector("#main-field");

let allImages;
let searchTag;

search.addEventListener("change", (event) => {
    searchTag = event.target.value;
})

const fetchData = () => {
    console.log(searchTag)
    fetch(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${searchTag}&per_page=30`)
    .then(res => res.json())
    .then(data => {
        // allImages = data.hits;
        allImages = data.results;
        console.log(allImages);
        makeImages(allImages);
    });
}

submitBtn.addEventListener("click", fetchData)

document.addEventListener("keyup" , (event) => {
    console.log(event.key);
    if(event.key === 'Enter') {
        fetchData();
    }
})

const makeImages = (data) => {

    let imgRenderField = document.querySelector("#gallary-class");
    imgRenderField.remove();

    let gallaryClass = document.createElement('div');
    gallaryClass.id = 'gallary-class';
    imageField.appendChild(gallaryClass);
    data.map(data => {
        let img = document.createElement('img');
        img.style.height = "350px";
        img.style.width = "350px";
        img.src = data.urls.regular;
        img.key = data.id;
        img.className = 'gallary-image';
        gallaryClass.appendChild(img);
    })
}

// PixaBay API code below :-

// const PIXABAY_API_KEY = "31203409-7714967bd984fca2e2e04f944";
// const GET_IMG_URL_UNSPLASH = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=30`

// const GET_IMG_URL_custom = `https://pixabay.com/api?key=${API_KEY2}&q=${searchTag}`;
// `https://pixabay.com/api?key=${API_KEY2}&q=${searchTag}`

// const fetchData = () => {
//     console.log(searchTag)
//     fetch(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${searchTag}&per_page=30`)
//     .then(res => res.json())
//     .then(data => {
//         allImages = data.hits;
//         console.log(allImages);
//         makeImages(allImages);
//     });
// }

// const makeImages = (data) => {
//     data.map(data => {
//         let img = document.createElement('img');
//         img.src = data.largeImageURL;
//         img.key = data.id;
//         img.className = 'gallary-image';
//         imageField.appendChild(img);
//     })
// }
