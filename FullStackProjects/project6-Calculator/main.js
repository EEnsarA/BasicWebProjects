const calculatorEl = document.querySelector(".calculator");
const resultEl = document.querySelector(".result");
const clearAllEl = document.querySelector("#clearAll");
const deleteCharEl = document.querySelector("#deleteChar");
const resultPanelEl = document.querySelector(".resultPanel");
 

let firstNumber = "";
let selectedOperator = "";
let afterNumber = "";
let waitingNewValue = false;

function runEventListeners(){
    calculatorEl.addEventListener("click",write);
    clearAllEl.addEventListener("click",clearAll);
    deleteCharEl.addEventListener("click",deleteChar);
}

function deleteChar(){
    if(waitingNewValue){
        afterNumber = Calculator.deleteLastChar(afterNumber);
    }
    else{
        firstNumber = Calculator.deleteLastChar(firstNumber);
    }
    resultEl.innerHTML = Calculator.deleteLastChar(resultEl.innerHTML);
}

function clearAll(){
    firstNumber = "";
    selectedOperator = "";
    afterNumber = "";
    waitingNewValue = "";
    clearResultPanel();
}

function write(e){
    const element = e.target;
    if(element.classList.contains("number")){
        if(waitingNewValue){
            afterNumber += element.value;
            updateResultPanel(element.value);

        }else{
            firstNumber += element.value;
            updateResultPanel(element.value);
            
        }   
         
    }
    else if(element.classList.contains("operatorsKey")){
        if(!Calculator.isHaveOperator(resultEl.innerHTML)){      
            selectedOperator = element.value;
            waitingNewValue = true;
            updateResultPanel(element.value);

        }
    }
    else if(element.classList.contains("equal")){
        let result = calculate(firstNumber,selectedOperator,afterNumber).toString();
        firstNumber = result;
        waitingNewValue = false;
        clearOperatorAndAfterNumber();
        clearResultPanel(); 
        updateResultPanel(result);
    }
}

function updateResultPanel(value){
    if(value.length >= 6){
        value = parseFloat(value).toFixed(2); //* noktadan sonra nıncı sayıya kadar gösterir (tofixed)
    }
    resultEl.innerHTML += value;
    
}

function clearResultPanel(){
    resultEl.innerHTML = "";
}

function clearOperatorAndAfterNumber(){
    selectedOperator ="";
    afterNumber = "";
}

function calculate(firstNumber,operators,secondNumber){
    
    let result;
    let isHaveDot = Calculator.isHaveDot(firstNumber) || Calculator.isHaveDot(secondNumber);
    switch(operators){
        case "+":
            result = isHaveDot ? parseFloat(firstNumber) + parseFloat(secondNumber) : parseInt(firstNumber) + parseInt(secondNumber);
        break;
        case "-":
            result = isHaveDot ? parseFloat(firstNumber) - parseFloat(secondNumber) : parseInt(firstNumber) - parseInt(secondNumber);
        break;
        
        case "*":
            result = isHaveDot ? parseFloat(firstNumber) * parseFloat(secondNumber) : parseInt(firstNumber) * parseInt(secondNumber);
        break;
        case "/":
            result = isHaveDot ? parseFloat(firstNumber) / parseFloat(secondNumber) : parseInt(firstNumber) / parseInt(secondNumber);
        break;
        
    }
    return result;
}


runEventListeners();