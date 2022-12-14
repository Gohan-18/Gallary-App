let searchParam = location.search.split('=').pop();
const API_KEY = "JIiTGGkMz0PshhK76-PKRRkM1VplhiViGoRJNYG9yUw";
let SEARCH_LINK = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${searchParam}&per_page=30`;
const imageField = document.querySelector("#main-field");
const loadMoreBtn = document.querySelector(".load-btn");
const loadImageAnime = document.querySelector(".load-animation");
let pageNo = 1;
let allImages;

const fetchData = async () => {

    loadImageAnime.classList.remove("hide");

    await fetch(SEARCH_LINK)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        console.log(allImages);
        if(allImages.length === 0){
            console.log("no data found...");
            loadImageAnime.classList.add("hide");
            let noDataFound = document.createElement('h3');
            noDataFound.className = 'no-data-message';
            noDataFound.innerHTML = (":( Couldn't get the searched result...").toUpperCase();
            imageField.style.height = "50vh";
            imageField.appendChild(noDataFound);
        }
        else{
            makeImagesSearch(allImages);
        }
    })
    .catch(() => {
        loadImageAnime.classList.add("hide");
        let noDataFound = document.createElement('h3');
        noDataFound.className = 'no-data-message';
        noDataFound.innerHTML = (":( Couldn't fetch the result...").toUpperCase();
        imageField.style.height = "50vh";
        imageField.appendChild(noDataFound);
    })
}

const makeImagesSearch = (data) => {

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
        loadImageAnime.classList.add("hide");
        gallaryClass.appendChild(img);

        img.addEventListener("click", () => {
            showPopup(data);
        })
    })

    loadMoreBtn.classList.remove("hide");
}

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

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})

loadMoreBtn.addEventListener("click", () => {

    loadMoreBtn.classList.add("btn--loading");

    pageNo += 1;
    let SEARCH_LINK = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${searchParam}&page=${pageNo}&per_page=30`;

    fetch(SEARCH_LINK)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        console.log(allImages);
        makeImagesSearchNxtPage(allImages);
    });

    const makeImagesSearchNxtPage = (data) => {
    
        let gallaryClass = document.createElement('div');
        gallaryClass.id = 'gallary-class-nxt';
        imageField.appendChild(gallaryClass);
        data.map(data => {
            let img = document.createElement('img');
            img.src = data.urls.regular;
            img.key = data.id;
            img.className = 'gallary-image';
            gallaryClass.appendChild(img);

            loadMoreBtn.classList.remove("btn--loading");
    
            img.addEventListener("click", () => {
                showPopup(data);
            })
        })
    }

})
