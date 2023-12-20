class Currency{
    constructor(){
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_3olvygEJ5p9zgVFfI5as0eUEIK0QivFbUrsIYWHx&base_currency=";
      //! url de parametre belirlemek için ilk parametrede ? atılır ve diğer parametlerlerde ise & işareti atılır
    }
    async exchange(amount,firstCurrency,secondCurrency){
       const response = await fetch(`${this.url}${firstCurrency}`);
       const result = await response.json();
       const exchangedResult = amount * result.data[secondCurrency];
       return exchangedResult ;
    }
}