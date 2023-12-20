const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageList = document.querySelector(".imagelist-wrapper");

function runEventListeners(){
    form.addEventListener("submit",search);
    clearButton.addEventListener("click",clear);
}

function clear(e){
    searchInput.value ="";
    imageList.innerHTML ="";
    
}


function search(e){
    const value = searchInput.value.trim();
    // ? : @RequestParam - Spring - Rest APİ
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID 3QTBgFJn_u4wnqEntS7a2q10DZ3nAZcR-3o3dFh-6H8"      
        }
    })
    .then((respond)=>respond.json())
    .then((data)=>{
       Array.from(data.results).forEach((image)=>{
        addImageToUI(image.urls.small);
       })
    })
    .catch((err)=>console.log(err));
    e.preventDefault(); 
}

function addImageToUI(url){ 
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src",url);
  img.height = "400";
  img.width = "400";
  div.append(img);
  imageList.append(div);
}

runEventListeners();

