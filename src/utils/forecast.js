const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=29c06ac52864bfe91454c9fe0678b688&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const {
        weather_descriptions,
        temperature,
        feelslike,
        wind_speed,
        uv_index,
      } = response.body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The wind speed is currently at ${wind_speed}km/hr and UV index ${uv_index}.`
      );
    }
  });
};

module.exports = forecast;
