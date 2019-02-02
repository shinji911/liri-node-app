require("dotenv").config();

let axios = require("axios");
let moment = require("moment");
let Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let fs = require("fs");

let command = process.argv[2];

function liri(inCom) {
    if (command === "concert-this") {
        let artist = process.argv.slice(3).join(" ");
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("\nName of the venue: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("Date of the event: " + moment(response.data[0].datetime.slice(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY") + "\n");
            })
            .catch(function (error) {
                console.log(error);
            });
    } else if (command === "spotify-this-song") {
        let song = ""
        if (process.argv.length === 3) {
            song = "The-Sign"
        } else {
            song = process.argv.slice(3).join(" ");
        }
        spotify.search({ type: 'track', query: song, limit: 1 })
            .then(function (response) {
                console.log("\nArtist: " + response.tracks.items[0].artists[0].name);
                console.log("Song Name: " + response.tracks.items[0].name);
                console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
                console.log("Album Name: " + response.tracks.items[0].album.name + "\n");
            })
            .catch(function (err) {
                console.log(err);
            });
    } else if (command === "movie-this") {
        let movie = ""
        if (process.argv.length === 3) {
            movie = "Mr.Nobody"
        } else {
            movie = process.argv.slice(3).join(" ");
        }
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                console.log("\nMovie Title: " + response.data.Title);
                console.log("Year of Release: " + response.data.Year);
                console.log("IMDB Rating : " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating : " + response.data.Ratings[1].Value);
                console.log("Country of Production : " + response.data.Country);
                console.log("Language : " + response.data.Language);
                console.log("Plot : " + response.data.Plot);
                console.log("Actors : " + response.data.Actors + "\n");
            })
            .catch(function (error) {
                console.log(error);
            });

    } else if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            let dataArr = data.split(",");
            command = dataArr[0];
            process.argv[3] = dataArr[1];
            liri(command);
        });
    }
};

liri(command);