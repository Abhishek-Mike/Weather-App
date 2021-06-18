// Weather App using Fetch Api 
// https://abhishek-mike.github.io/Weather-App/
var cityName = document.querySelector('.cityName');
var button = document.querySelector('.button');

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

// Base set up of url to be used

const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    Url: "https://api.openweathermap.org/data/2.5/weather", 
}

//for button
button.addEventListener('click',(event)=>{
        console.log(cityName.value);
        getWeather(cityName.value);
        document.querySelector('.display').style.display = "block";
})

//for keyboard entry
cityName.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(cityName.value);
        getWeather(cityName.value);
        document.querySelector('.display').style.display = "block";
    }

});

// Get Weather Details
function getWeather(city) {
        fetch(`${weatherApi.Url}?q=${city}&appid=${weatherApi.key}&units=metric`)
        // response to be receive object notation
        .then(response => {
            return response.json();
        })
        // passed to showWeather function
        .then(showWeather) 
        // error handling          
        .catch((err)=> {
            console.log(err);
        })       
}

// Show Weather Report
 function showWeather(response)  {
    console.log(response);
    var visibility = document.querySelector('.visibility');
    var weather = document.querySelector('.weather');
    let temperature = document.getElementById('temp');
    let city = document.getElementById('city');
    let minMaxTemp = document.getElementById('max-minTemp');
    let weatherType = document.getElementById('weather');

    city.innerText = response['name'], response['sys']['country'];
    temperature.innerHTML = `${Math.round(response.main.temp)}&deg;C`;
    minMaxTemp.innerHTML = `${Math.floor(response.main.temp_min)}&deg;C (min)/ ${Math.ceil(response.main.temp_max)}&deg;C (max) `;
    weatherType.innerText = response['weather'][0]['description'];  
    var visibilityValue = `${response.visibility}`;
    visibility.innerHTML= visibilityValue/1000 +" kms";

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate)

    //managing background acc to weather type
    if(weatherType.textContent == 'clear sky') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        
    } else if((weatherType.textContent == 'few clouds')|| (weatherType.textContent == 'broken clouds')|| (weatherType.textContent == 'overcast clouds')|| (weatherType.textContent == 'scattered clouds')){

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'haze') {

        document.body.style.backgroundImage = "url('images/haze.jpg')";
        
    } else if((weatherType.textContent == 'light rain') || (weatherType.textContent == 'moderate rain')){
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if((weatherType.textContent == 'light snow') || (weatherType.textContent == 'snow')|| (weatherType.textContent == 'heavy snow')){
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } 
}

// Date manage
 function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

// another way to do it
// button.addEventListener('click',function(){
// fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&appid=03397aa0156e1f807d1b0b45ff952f54')
//     .then(response => response.json())
//     .then(data =>{
//         console.log(data);
//         var cityNameValue = data['name'];
//         var minTempValue = data['main']['temp_min'];
//         var maxTempValue = data['main']['temp_max'];
//         var visibilityValue = data['visibility'];
//         var weatherValue = data['weather'][0]['description'];
        

//         cityNameValue.innerHTML= cityNameValue;
//         minTemp.innerHTML= minTempValue;
//         maxTemp.innerHTML= maxTempValue;
//         visibility.innerHTML= visibilityValue;
//         weather.innerHTML= weatherValue;

//     })

    
//     .catch(err => {
//         alert("Wrong City Name Bro !");
//         console.log(err);
//     })
// }) 
