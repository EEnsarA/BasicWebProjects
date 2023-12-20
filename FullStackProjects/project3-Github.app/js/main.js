const githubName = document.querySelector("#githubName");
const searchForm = document.querySelector("#searchForm");
const clearButton = document.querySelector("#clearButton");
const clearAllButton = document.querySelector("#clearAllButton");
const github = new Github();    
const ui = new UI();

function runEventListeners(){
  searchForm.addEventListener("submit",search);
  clearButton.addEventListener("click",clear);
  document.addEventListener("DOMContentLoaded",runPageLoaded);
  clearAllButton.addEventListener("click",clearSearchedUser);
}

function search(e){
    const userName = githubName.value.trim();
    if(userName == null || userName == ""){
        alert("Pls enter a user name !");
    }else{
        github.getGithubData(userName)  //* async işaretli function promise döner !
        .then(response=>{
            ui.addSearchedUserToUI(userName);    
            Storagex.addSearchedUsersToStorage(userName);
            ui.addUserProfileToUI(response.user);
            document.querySelector("#showRepos").addEventListener("click",()=>{ui.showRepos(response.repos)})
        })
        .catch((err)=>{console.log(err)})
    }

    e.preventDefault();  //* sayfayı yenilemeyi kapatyırouz
}
function clear(e){
    ui.clearInput();
    e.preventDefault()
}

function runPageLoaded(){
    ui.fillSearchedUserToUIFromStorage();    
}
function clearSearchedUser(){
    Storagex.clearAllSearcheUserFromStorage();
    ui.clearSearchedUser();
}



runEventListeners();