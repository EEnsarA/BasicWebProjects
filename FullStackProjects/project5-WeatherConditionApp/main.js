
const searchInput = document.querySelector("#searchInput");
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");
const background = document.querySelector("body");



const weather = new WeatherApi();

searchInput.addEventListener("keypress",findWeatherInfo);

function findWeatherInfo(e){
  if(e.keyCode == '13'){
    const cityName = searchInput.value.trim();
    weather.getWeatherInfo(cityName)
    .then((data)=>{
        if(data.message == "city not found"){
            alert("Şehir Bulunamadı !");
            searchInput.value="";
        }else{
            console.log(data);
            changeBackground(data);
            display(data);
        }
        
    })
    .catch((err)=>{console.log(err)})
  }
}
function display(data){
    cityNameEl.textContent = data.name;
    degreeEl.textContent = Math.round(data.main.temp) + "°";
    descEl.textContent = data.weather[0].description;
    searchInput.value = "";
}
function changeBackground(data){
    const dataWeather = (data.weather[0].description);
    console.log(dataWeather);
    if(dataWeather.includes("bulutlu","fırtına")){
        background.style.backgroundImage = "url('images/cloudy.jpg')";
    }
    else if(dataWeather.includes("açık")){  
        background.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(dataWeather.includes("sisli")){
        background.style.backgroundImage = "url('images/foggy.jpg')";
    }
    else if(dataWeather.includes("yağmur")){
        background.style.backgroundImage = "url('images/rainy.jpg')";
    }else if(dataWeather.includes("kapalı")){
        background.style.backgroundImage = "url('images/heavy.jpg')";
    }else if(dataWeather.includes("kar")){
        background.style.backgroundImage = "url('images/snowy.jpg')";
    }
   
}
