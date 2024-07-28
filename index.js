const weatherForm = document.querySelector(".weatherForm"); 
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey ="ce1be80364fe6b82d51a55b878b0fe14" 

weatherForm.addEventListener("submit", async event => {
        event.preventDefault();
        const city = cityInput.value;
        if(city){
            try{
                const weatherdata= await getweatherData(city);
                displayweatherInfo(weatherdata);
            }
            catch{
                console.error(error);
                displayerror(error);
            }
        }
        else{
            
            displayerror("enter a city");
        }
});


async function getweatherData(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    if(!response){
        throw new Error("could not fetch");
    }
    return await response.json();
}


function displayweatherInfo(data){

    const {name: city,
         main:{temp,humidity},
         weather:[{description,id}]} =data;

         card.textContent="";
          
         card.style.display="flex";

         const cityDisplay =document.createElement("h1");
         const tempDisplay =document.createElement("p");
         const humidityDisplay =document.createElement("p");
         const descDisplay =document.createElement("p");
         const weatherEmoji =document.createElement("p");

         cityDisplay.textContent = city;
         cityDisplay.classList.add("cityDisplay");
          

          tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
          tempDisplay.classList.add("tempDisplay");
          humidityDisplay.textContent=`humidity: ${humidity}`;
          humidityDisplay.classList.add("humidityDisplay")
          descDisplay.textContent=description;
          descDisplay.classList.add("descDisplay");
          weatherEmoji.textContent=getweatheremoji(id);
          weatherEmoji.classList.add("weatherEmoji");

          card.appendChild(tempDisplay);
          card.appendChild(cityDisplay);
          card.appendChild(humidityDisplay);
          card.appendChild(descDisplay);
          card.appendChild(weatherEmoji);

}



function getweatheremoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId <300):
            return "⛈";
         case(weatherId >= 300 && weatherId <400):
            return "⛈";
        case(weatherId >= 400 && weatherId <500):
            return "⛈";
        case(weatherId >= 500 && weatherId <600):
            return "⛈";
         case(weatherId >= 600 && weatherId <700):
            return "❄";
        case(weatherId >= 700 && weatherId <800):
            return "⛈";
        case(weatherId === 800):
            return "🌞";
            case(weatherId >= 801 && weatherId <810):
            return "🌞";
        default:return "❓";
    }

}
function displayerror(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    
   
    card.textContent = "";  
    card.style.display = "flex";
    
    card.appendChild(errorDisplay);
}
