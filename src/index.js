const fetch = require('node-fetch');

const main = async () => {
    try {
        const response = await fetch('https://ay61jgu2hf.execute-api.us-east-1.amazonaws.com/default/weather-api', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        
        const arrayLocation = [];
        json.map((city) => {
            console.log(city);
            let location = new Object(); 

            location.id = city.id;
            location.city = city.city;
            location.country = city.country;
            
            let avgMax = 0;
            let avgMin = 0;
            let totalDryDays = 0;
            let totalSnowDays = 0;

            city.monthlyAvg.map((avg) => {
                avgMax += avg.high;
                avgMin += avg.low;

                totalDryDays += avg.dryDays;
                totalSnowDays += avg.snowDays;

            });

            location.avgMax = avgMax / 12;
            location.avgMin = avgMin / 12;

            location.totalDryDays = totalDryDays;
            location.totalSnowDays = totalSnowDays;
            location.totalRainFall = 365 - totalDryDays - totalSnowDays;

            arrayLocation.push(location);
        });

        console.log(arrayLocation);

    }
    catch (err) {
        console.error("Hubo un problema en la petición: " + err);

        return;
    }
};


main();