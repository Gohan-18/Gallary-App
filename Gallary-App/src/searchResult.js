const API_KEY = "JIiTGGkMz0PshhK76-PKRRkM1VplhiViGoRJNYG9yUw";
const search = document.querySelector("#input-field");
const searchBtn = document.querySelector("#search-btn-search-result");
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
        makeImagesSearch(allImages);
    });
}

searchBtn.addEventListener("click", fetchData)

document.addEventListener("keyup" , (event) => {
    console.log(event.key);
    if(event.key === 'Enter') {
        fetchData();
    }
})

const makeImagesSearch = (data) => {

    let imgRenderField = document.querySelector("#gallary-class");
    imgRenderField.remove();

    let gallaryClass = document.createElement('div');
    gallaryClass.id = 'gallary-class';
    imageField.appendChild(gallaryClass);
    data.map((data, index) => {
        let img = document.createElement('img');
        img.style.height = "350px";
        img.style.width = "350px";
        img.src = data.urls.regular;
        img.key = data.id;
        img.className = 'gallary-image';
        gallaryClass.appendChild(img);

        img.addEventListener("click", () => {
            let currentImage = index;
            showPopup(data);
        })
    })
}

const showPopup = (item) => {
    let popup = document.querySelector(".image-popup");
    const downloadBtn = document.querySelector(".download-btn");
    const closeBtn = document.querySelector(".close-btn");
    const img = document.querySelector(".large-img");

    popup.classList.remove("hide-popup");
    downloadBtn.href = item.links.html;
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hide-popup");
    })
    img.src = item.urls.regular;
}