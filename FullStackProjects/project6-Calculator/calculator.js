class Calculator{
    
    static isHaveOperator(value){
        let result = false;
        for(let i = 0;i < value.length ; i++){
            if(this.getOperators().has(value[i])){
                result = true;
                break;
            }
        }
        return result;
    }

    static isHaveDot(value){
        let result = false;
        if(value.includes(".")){
            result = true;
        }
        return result;
    }

    static getOperators(){
        const map = new Map();
        map.set("+","sum");
        map.set("-","extraction");
        map.set("/","division");
        map.set("*","multiplication");
        return map;
    }

    static deleteLastChar(value){
        return value.slice(0,value.length-1);  
    }

}