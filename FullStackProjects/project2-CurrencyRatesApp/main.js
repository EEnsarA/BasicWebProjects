const amountElement = document.querySelector("#amount");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultElement = document.querySelector("#result");
const currency = new Currency();

 function runEventListener(){
 amountElement.addEventListener("input",exchange)
}

function exchange(){
 const amount = Number(amountElement.value.trim());
 const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;

 const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;
 console.log(firstOptionValue,secondOptionValue);

 currency.exchange(amount,firstOptionValue,secondOptionValue)
 .then((result)=>{
  resultElement.value = result.toFixed(3) ; //! toFixed() metodu noktadan sonraki kaç basamak görünmesini belirler
 })
}
    


runEventListener();