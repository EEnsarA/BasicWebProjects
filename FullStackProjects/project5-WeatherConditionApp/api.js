class WeatherApi{
    constructor(){
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        this.apiKey = "cfb46cf231a3695670337b413b611238";
    }
    async getWeatherInfo(cityName){
        const response = await fetch(`${this.baseUrl}?q=${cityName}&appid=${this.apiKey}&units=metric&lang=tr`);
        const data = await response.json();
        return data;    
    }
}
//* promise şeklinde yazma
/* 
   return new Promise((resolve , reject)=>{
            fetch(`${this.baseUrl}?q=${cityName}&appid=${this.apiKey}&units=metric`)
            .then(response=>response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));  
        })
*/