window.addEventListener('load',()=>{
    //Logic to read the coordinates
    var apikey = 'HMSwKbC4CoC3WazExjsdM45RGGURK4gV';
    var lat,long;
    var country,locationKey,timeZone,locationName;
    navigator.geolocation.getCurrentPosition((position)=>{
        lat=position['coords']['latitude'];
        long = position['coords']['longitude'];
        console.log(lat+" "+long);
        //dynamic url
        var geopositionurl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q${lat},${long}`;
        console.log(geopositionurl);
        //axios.get(geopositionurl)//...not working for me we shld use it like this...
        
        
        axios.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=HMSwKbC4CoC3WazExjsdM45RGGURK4gV&q=12.9564672%2C77.6175616&language=en-us')
        .then((responce)=>{
            //console.log(responce);
            country = responce.data.Country.EnglishName;
            locationKey = responce.data.Key;
            timeZone = responce.data.TimeZone;
            locationName = responce.data.LocalizedName;
            getWeatherData(apikey,locationKey);
        });

    })
})

function getWeatherData(apikey,locationKey){
    var weatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apikey}`
    axios.get(weatherUrl).then((reponse)=>{
        console.log("Weather Responce",reponse);
    })
}