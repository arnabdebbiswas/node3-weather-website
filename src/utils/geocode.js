const request = require("request");

const geocode = (location, callback) => {
  const geoCodedURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiYXJuYWJkZWJiaXN3YXMiLCJhIjoiY2tlcnh5dnRlMjk1bzJxbXNqcWIwdzh4ZyJ9.VbS2k4DA8FDSumu-RcIk6Q`;

  request({ url: geoCodedURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (!response.body.features.length) {
      callback("Unable to find location", undefined);
    } else {
      const location = response.body.features[0].place_name;
      const [longitude, latitude] = response.body.features[0].center;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
