class Storagex {
    static key = "searchedUsers";

    static getSearchedUsersFromStorage() {
        let users;
        if (localStorage.getItem(this.key) == null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem(this.key));
        }
        return users;
    }

    static checkUser(userName){
        const users = this.getSearchedUsersFromStorage();
        if(!users.includes(userName)){
           return true;
        }
        return false;
    }
     
    static addSearchedUsersToStorage(userName){
        const users = this.getSearchedUsersFromStorage();
        if(this.checkUser(userName)){
            users.push(userName.trim());
            localStorage.setItem(this.key , JSON.stringify(users));
        }
    }

    static clearAllSearcheUserFromStorage(){
        localStorage.removeItem(this.key);
    }
}
