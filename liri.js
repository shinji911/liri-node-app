require("dotenv").config();

let axios = require("axios");
let moment = require("moment");
let spotify = require('node-spotify-api');

let command = process.argv[2];

if (command === "concert-this") {
    let artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //console.log(response.data[0]);
            console.log("\nName of the venue: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date of the event: " + moment(response.data[0].datetime.slice(0,10), "YYYY-MM-DD").format("MM/DD/YYYY") + "\n");
        })
        .catch(function (error) {
            if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
} else if (command === "spotify-this-song") {

} else if (command === "movie-this") {

} else if (command === "do-what-it-says") {

}