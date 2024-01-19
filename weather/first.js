var weatherInfoObject = {};

window.addEventListener('load',()=>{
    //Logic to read the coordinates
    var apikey = 'HMSwKbC4CoC3WazExjsdM45RGGURK4gV';
    var lat,long;
    navigator.geolocation.getCurrentPosition((position)=>{
        lat=position['coords']['latitude'];
        long = position['coords']['longitude'];
        console.log(lat+" "+long);
        //dynamic url
        var geopositionurl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q${lat},${long}`;
        console.log(geopositionurl);
        //axios.get(geopositionurl)//...not working for me we shld use it like this...
        
        
        axios.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=HMSwKbC4CoC3WazExjsdM45RGGURK4gV&q=12.9564672%2C77.6175616&language=en-us')
        .then((response)=>{

            weatherInfoObject['country']=response.data.Country.EnglishName;
            weatherInfoObject['locationKey']=response.data.Key;
            weatherInfoObject['timeZone']= response.data.TimeZone;
            weatherInfoObject['currentLocation']=response.data.LocalizedName;
            console.log('der',weatherInfoObject);
            getWeatherData(apikey,weatherInfoObject.locationKey);
        });

    })
})

function getWeatherData(apikey,locationKey){
    var weatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apikey}`
    axios.get(weatherUrl).then((response)=>{
        console.log("Weather Responce",response);
       weatherInfoObject['date']=response.data.DailyForecasts[0].Date;
       weatherInfoObject['day']=response.data.DailyForecasts[0].Day;
       weatherInfoObject['night']=response.data.DailyForecasts[0].Night;
       weatherInfoObject['temperature']=response.data.DailyForecasts[0].Temperature;
       console.log('weatherInfoObject',weatherInfoObject);
       var today = new Date(weatherInfoObject['date']);

        returnid('country').textContent=weatherInfoObject['country'];
        returnid('currentLocation').textContent=weatherInfoObject['currentLocation'];
        returnid('date').textContent=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+"  "+weatherInfoObject.timeZone.Code;
        if(weatherInfoObject.day.Icon < 10){
            returnid('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObject.day.Icon}-s.png`);
        }
        else{
            returnid('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObject.day.Icon}-s.png`) ;
        }
        if(weatherInfoObject.night.Icon < 10){
            returnid('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObject.night.Icon}-s.png`);
        }
        else{
            returnid('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObject.night.Icon}-s.png`) ;
        }
        returnid('morning-desc').textContent=weatherInfoObject.day.IconPhrase;
        returnid('night-desc').textContent=weatherInfoObject.night.IconPhrase;

        //temp Maximum
        returnid('tempMax').setAttribute('src',`https://developer.accuweather.com/sites/default/files/30-s.png`);
        returnid('tempMax-desc').textContent=weatherInfoObject.temperature.Maximum.Value+weatherInfoObject.temperature.Maximum.Unit;

        //temp Minimum
        returnid('tempMin').setAttribute('src',`https://developer.accuweather.com/sites/default/files/31-s.png`);
        returnid('tempMin-desc').textContent=weatherInfoObject.temperature.Minimum.Value+weatherInfoObject.temperature.Minimum.Unit;

    })
}

function returnid(id){
    return document.getElementById(id);
}