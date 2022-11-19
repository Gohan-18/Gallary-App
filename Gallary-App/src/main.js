const API_KEY = "JIiTGGkMz0PshhK76-PKRRkM1VplhiViGoRJNYG9yUw";
const search = document.querySelector("#input-field");
const searchBtn = document.querySelector("#search-btn-search-result");
const imageField = document.querySelector("#main-field");
let allImages;

document.addEventListener("keyup" , (event) => {
    console.log(event.key);
    if(event.key === 'Enter') {
        fetchData();
    }
})

const fetchDefaultData = () => {

    imageField.classList.add("load-animation");

    fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=30`)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        console.log(allImages);
        makeImages(allImages);
    })
    .catch(() => {
        imageField.classList.remove("load-animation");
        let noDataFound = document.createElement('h3');
        noDataFound.className = 'no-data-message';
        noDataFound.innerHTML = (`:( Couldn't fetch images...`).toUpperCase();
        imageField.style.height = "50vh";
        imageField.appendChild(noDataFound);
    });
}

const makeImages = (data) => {

    let imgRenderField = document.querySelector("#gallary-class");
    imgRenderField.remove();

    let gallaryClass = document.createElement('div');
    gallaryClass.id = 'gallary-class';
    imageField.appendChild(gallaryClass);
    data.map(data => {
        let img = document.createElement('img');
        img.src = data.urls.regular;
        img.key = data.id;
        img.className = 'gallary-image';
        imageField.classList.remove("load-animation");
        gallaryClass.appendChild(img);

        img.addEventListener("click", () => {
            showPopup(data);
        })
    })
}

fetchDefaultData();

const showPopup = (item) => {
    let popup = document.querySelector(".image-popup");
    const downloadBtn = document.querySelector(".download-btn");
    const closeBtn = document.querySelector(".close-btn");
    const img = document.querySelector(".large-img");

    popup.classList.remove("hide-popup");
    downloadBtn.href = item.links.html;
    downloadBtn.target = "_blank";
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hide-popup");
    })
    img.src = item.urls.regular;
}
