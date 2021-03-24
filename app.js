
window.addEventListener('load', ()=> {

    let lat;
    let lon;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(
        ".temperature-degree"
    );
    let locationTimezone = document.querySelector(
        ".location-timezone"
    );

    if(navigator.geolocation){
		navigator.geolocation.watchPosition(onSuccess, onError);
        function onSuccess(position){
        
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            //console.log(lat, lon);
            
            const api = `http://api.weatherstack.com/current?access_key=ACCESS_KEY&query=${lat},${lon}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                    const {temperature, weather_descriptions} = data.current;
                    const {timezone_id} = data.location;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions;
                    locationTimezone.textContent = timezone_id;
                });
        }

        function onError(error){
            console.log(error);
        }
	}else{
		console.log('Not Supported');
	}
});
