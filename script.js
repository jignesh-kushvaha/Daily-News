const API = "6dd4fc07f0874a56a54816e0bef2c2cc";
const URL = "https://newsapi.org/v2/everything?q=";
const TOP_HEADLINE_UTL = "https://newsapi.org/v2/top-headlines?country="
const country = "in";

window.addEventListener("load",(e)=> fetchHeadlines())

function fetchHeadlines(){
    fetch(`${TOP_HEADLINE_UTL}${country}&apiKey=${API}`)
   .then(res => res.json())
   .then(data => displayNews(data.articles))
   .catch(err => console.log(err))
}

function fetchNews(query){
    fetch(`${URL}${query}&sortBy=publishedAt&apiKey=${API}`)
   .then(res => res.json())
   .then(data => displayNews(data.articles))
   .catch(err => console.log(err))
}

function displayNews(articles){
    console.log(articles)
    const cardContainer = document.getElementById("card-container");
    let cardTemplate = document.getElementById("card-template");
    
    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const clone = cardTemplate.content.cloneNode(true);
        clone.querySelector("#card-image").src = article.urlToImage;
        clone.querySelector("#card-title").textContent = article.title;

        let date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"
        });
        clone.querySelector("#card-source").textContent = `${article.source.name} - ${date}`;

        clone.querySelector("#card-description").textContent = article.description;
        clone.querySelector("#read-more").addEventListener("click", () =>{
            window.open(article.url, "_blank");
        });
        cardContainer.appendChild(clone);
    });
}

const searchText = document.getElementById("search-text");
const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", (e) =>{
    let query = searchText.value;
    // console.log(query);
    if(!query) return;
    fetchNews(query);
});

document.getElementById("logo").addEventListener("click",()=>{
    window.location.reload();
});

function fetchNavNews(query){
    if(!query) return;
    fetchNews(query);
}