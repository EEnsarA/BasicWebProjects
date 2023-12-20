const container = document.querySelector(".container");
const movie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat")); 
const buyButton = document.querySelector("#buyButton");  

function runEventListeners() {
    container.addEventListener("click", select);
    movie.addEventListener("change",changeMovie); // oyyyyy
    document.addEventListener("DOMContentLoaded",runPageLoaded);
    buyButton.addEventListener("click",buyTicket);
}

function changeMovie(){
    calculate();
    saveSelectedMovieIndexToStorage();

}
function select(e) {
    selectedElement = e.target.parentElement;
    if (selectedElement.classList.contains("seat") && !selectedElement.classList.contains(".filledColor")) {
        selectedElement.classList.toggle("selectedColor"); //! add kullanırsak eklendikden sonra tekrar basıldıgında gitmez
        calculate();                                       //! toggle kullanrak basıldıgında ekler , tekrar basıldıgında kaldırır !
        saveSelectedSeatsToStorage();
        saveSelectedMovieIndexToStorage();
    }

    e.preventDefault();
}
function calculate() {
    selectedSeatCount = getSelectedSeats().length;
    const price = movie.value;
    amount.textContent = price * selectedSeatCount ;
    count.textContent = selectedSeatCount;


}
function getSelectedSeats(){
    const selectedSeats = Array.from(container.querySelectorAll(".selectedColor")); //! array cevırme yolu 2 : [...]
    return selectedSeats;
}
function getSelectedSeatsIndex(){
    const selectedList = getSelectedSeats();
    const selectedSeatsIndex = selectedList.map((seat)=>{
        return seats.indexOf(seat);
    })  
    return selectedSeatsIndex;
}
function saveSelectedSeatsToStorage(){
    const selectedSeatsIndex = getSelectedSeatsIndex(); 
    Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
}
function runPageLoaded(){
    const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
    const filledSeatsIndex = Storagex.getFilledSeatsFromStorage();
    seats.forEach((seat , index)=>{
        if(selectedSeatsIndex.includes(index)){
            seat.classList.add("selectedColor")
        }
    })
    seats.forEach((seat , index)=>{
        if(filledSeatsIndex.includes(index)){
            seat.classList.add("filledColor")
        }
    })
    movie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
    calculate();

}
function saveSelectedMovieIndexToStorage(){
    const selectedMovieIndex = movie.selectedIndex;
    Storagex.addSelectedMovieToStorage(selectedMovieIndex); 
}
function buyTicket(){
    if(confirm("Satın almak istiyormusunuz ?")){
        const selectedSeats = getSelectedSeats();
        const selectedSeatsIndex = getSelectedSeatsIndex();
        selectedSeats.forEach((seat)=>{
            seat.classList.remove("selectedColor")
            seat.classList.add("filledColor");
        })  
        Storagex.addFullSeatToStorage(selectedSeatsIndex);
        Storagex.addSelectedSeatToStorage(getSelectedSeatsIndex());
       
    }    
}



runEventListeners();