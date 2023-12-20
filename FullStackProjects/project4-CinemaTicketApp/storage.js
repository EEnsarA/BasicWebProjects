class Storagex {

    static keySelectedSeats = "keySelectedSeats";
    static keyFilledSeats = "keyFilledSeats";
    static keySelectedMovie = "keySelectedMovie";

    static getSelectedSeatsFromStorage() {
        let selectedSeats;
        if (localStorage.getItem(this.keySelectedSeats) == null) {
            selectedSeats = [];
        } else {
            selectedSeats = JSON.parse(localStorage.getItem(this.keySelectedSeats));
        }
        return selectedSeats;
    }
    static getFilledSeatsFromStorage(){
        let filledSeats;
        if(localStorage.getItem(this.keyFilledSeats) == null){
            filledSeats = [];
        }else{
            filledSeats = JSON.parse(localStorage.getItem(this.keyFilledSeats));
        }
        return filledSeats;
    }
    static getSelectedMovieIndexFromStorage(){
        return localStorage.getItem(this.keySelectedMovie);
    }
    
    //* Ekleme
    static addSelectedSeatToStorage(indexs){
        localStorage.setItem(this.keySelectedSeats , JSON.stringify(indexs));
    } 
    static addFullSeatToStorage(indexs){
        const filledSeatsIndex = this.getFilledSeatsFromStorage();
        indexs.forEach((index)=>{filledSeatsIndex.push(index)});
        localStorage.setItem(this.keyFilledSeats,JSON.stringify(filledSeatsIndex));
    }
    static addSelectedMovieToStorage(index){
        localStorage.setItem(this.keySelectedMovie,JSON.stringify(index));
    }

}