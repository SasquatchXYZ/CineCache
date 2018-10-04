// Functions ===========================================================================================================
function queryYoutubeAPI(landmark) {
    let apikey = '';
    let queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&maxResults=25&part=snippet&q=${landmark}&type=video`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            /*let snippets = response.items;
            for (var k = 0; k < snippets.length; k++) {
                console.log(snippets[k]);
            }*/
            let snippets = response.items;
            for (var k = 0; k < snippets.length; k++) {
                console.log(snippets[k].id.videoId);
            }


        }).catch(console.log);
}


function queryOMDBAPI(landmark) {
    let apikey = '';
    let queryURL = `http://www.omdbapi.com/?apikey=${apikey}&s=${landmark}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            let movies = response;
            console.log(movies);

        }).catch(console.log);
}


function queryMarvelAPI(landmark) {
    let apikey = '';
    let queryURL = `https://gateway.marvel.com:443/v1/public/characters?name=${landmark}&apikey=${apikey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            let sh = response;
            let superhero = response.data;
            console.log(sh);
            console.log(superhero);

        }).catch(console.log);
}

function queryGooglePlaces(landmark) {

    let apikey = '';
    let queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apikey}&input=${landmark}&inputtype=textquery`;

    $.ajax({
        url: queryURL,
        contentType: "application/json; charset=UTF-8",
        method: "GET"
    })
        .then(function(response) {
            let placeID = response.data;
            console.log(placeID);
        }).catch(console.log);
}

function queryAMC(date, lat, long) {
    console.log(date);
    console.log(lat);
    console.log(long);

    $.ajax({
        method: "GET",
        url: `https://api.amctheatres.com/v2/showtimes/views/current-location/${date}/${lat}/${long}`,
        data: {"X-AMC-Vendor-Key": ""},
        contentType: "application/JSON",
    })
        .then(function(response) {
            let placeID = response.data;
            console.log(placeID);
        }).catch(console.log);

}

// Button Click Functions ==============================================================================================
$("#login").on("click", function() {
    console.log("login");
});

$("#submit-landmark").on("click", function(event) {
    event.preventDefault();
    console.log("Search Via Landmark");
    let landmark = $("#inputLandmark").val().trim();
    console.log(landmark);

    queryYoutubeAPI(landmark);
    /*queryOMDBAPI(landmark);*/
    /*queryMarvelAPI(landmark);*/
    /*queryGooglePlaces(landmark);*/

    $("#inputLandmark").val("");
});

$("#submit-zip").on("click", function(event) {
    event.preventDefault();
    console.log("submit zip");

});

$("#use-location").on("click", function(event) {
    event.preventDefault();
    console.log("Search using my location");
    navigator.geolocation.getCurrentPosition(granted, denied);

    function granted(position) {
        let userLatitude = position.coords.latitude;
        let userLongitude = position.coords.longitude;

        console.log(`Position is ${userLatitude} x ${userLongitude}`);
        let date = '10-3-2018';
        /*queryAMC(date, userLatitude, userLongitude)*/
    }

    function denied(error) {
        let message;
        switch(error.code) {
            case 1: message = 'Permission Denied'; break;
            case 2: message = 'Position Unavailable'; break;
            case 3: message = 'Operation Timed Out'; break;
            case 4: message = 'Unknown Error'; break;
        }
        console.log(`Geolocation Error: ${message}`)
    }

});

// Document Load Functions =============================================================================================
$(document).ready(function() {

});

