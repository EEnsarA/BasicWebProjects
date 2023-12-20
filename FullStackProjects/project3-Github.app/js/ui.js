class UI {
    constructor() {
        this.profileContentDiv = document.querySelector
        ("#profileContentDiv");
        this.githubNameInput = document.querySelector("#githubName");
        this.tableContent = document.querySelector("#tableContent");
        this.isShowRepos = true;
        this.table = document.querySelector("#table");
        this.searchedUserList = document.querySelector("#searchedUserList");
    }
    addUserProfileToUI(user) {
        this.profileContentDiv.innerHTML = `
    <div class="col-sm-12 col-md-4 col-lg-4 ">
        <div id="profileDiv">
            <img id="profileImg" src="${user.avatar_url}" width="200" height="200" class="mt-3 mb-3">
            <hr style="border : 1px solid lightgrey ; width : 100px ;">
            <span>${user.name}</span>
            <span>Software Developer</span>
        </div>
    </div>
    <div class="col-sm-12 col-md-8 col-lg-8">
        <div id="badgeDiv" class="mt-3">
            <button type="button" class="btn btn-secondary mr-4">
                Followers <span class="badge badge-light">${user.followers}</span>
            </button>
            <button type="button" class="btn btn-secondary ">
                Following <span class="badge badge-light">${user.following}</span>
            </button>
            <button type="button" class="btn btn-secondary ml-4">
                Repos <span class="badge badge-light">${user.public_repos}</span>
            </button>
        </div>
        <div id="infoDiv" class="mt-3">
            <div class="info">
                <img src="images/company.png" width="40" height="40">
                <span>${user.company==null?"":user.company}</span>
            </div>
            <div class="info">
                <img src="images/location.png" width="40" height="40">
                <span>${user.location==null?"":user.location}</span>
            </div>
            <div class="info">
                <img src="images/mail.png" width="40" height="40">
                <a>${user.email==null?"":user.email}</a>
            </div>
            <div class="info">
                <a id="showRepos" href="#">Show Repos</a>
            </div>
        </div>
    </div>`
    }
    clearInput(){
     this.githubNameInput.value = "";
     this.profileContentDiv.innerHTML = "";
     this.tableContent.innerHTML="";
    }
    checkMessage(){
        const showReposLink  = document.querySelector("#showRepos");
        if(this.isShowRepos){
            showReposLink.textContent = "Show Repos";
        }else{
            showReposLink.textContent = "Clear Repos";
        }
    }
    showRepos(repos){
        if(this.isShowRepos){
            if(repos != null && repos.length>0){
                let sayac = 0;
                repos.forEach((rep)=>{
                    sayac++;
                    this.tableContent.innerHTML +=`
                     <tr>
                        <th scope="row">${sayac}</th>
                        <td>${rep.name}</td>
                        <td>${rep.created_at}</td>
                     </tr> 
                    `
                })
            }
            this.isShowRepos = false;
            this.checkMessage();    
        }else{
            this.isShowRepos = true;
            this.checkMessage();
            this.tableContent.innerHTML = "";
        }   
        
       
    }
    fillSearchedUserToUIFromStorage(){
        const users = Storagex.getSearchedUsersFromStorage();
        if(users!=null && users.length>0){
            users.forEach(user=>{
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = user;
                this.searchedUserList.appendChild(li);
            })
        }
    }
    addSearchedUserToUI(usernamee){
        if(Storagex.checkUser(usernamee)){
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = usernamee;
            this.searchedUserList.appendChild(li);
        }
        // <li class="list-group-item">ali</li>  
    }
    clearSearchedUser(){
        this.searchedUserList.innerHTML = "";
    }   
}