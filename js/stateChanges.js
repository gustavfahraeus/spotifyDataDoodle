const SpotifyWebApi = require('spotify-web-api-node');
const spotifyAPI = new SpotifyWebApi();

import {fetchArtistData, fetchSongData} from "./src.js"


/* 

  gustavfahraeus @ GitHub  |  ☂️ 2020 
  -----

  This file contains:
   - The event listeners that handles user events involving changes to the state (i.e 'parameter'-clicks).

*/


export const state = {
  currentlyChecking: "artists",
  apiArgs: {
    limit: "25", time_range: "short_term"
  }
}

const myParam = new URLSearchParams(window.location.search).get('access_token');
spotifyAPI.setAccessToken(myParam);

/* State Changes */
const topSongs = document.getElementById("topSongs");
const topArtists = document.getElementById("topArtists");

const shortTermState = document.getElementById("shortTermState");
const mediumTermState = document.getElementById("medium_term_state");
const longTermState = document.getElementById("long_term_state");

topSongs.addEventListener('click', () => {
if (state.currentlyChecking != "songs") {
  state.currentlyChecking = "songs"

  let topSongs = document.getElementById("topSongs");
  topSongs.innerHTML = "&#9835 My Top Songs";
  topSongs.style.fontWeight = "bold";

  let topArtists = document.getElementById("topArtists");
  topArtists.innerHTML = "My Top Artists";
  topArtists.style.fontWeight = "normal"

  document.getElementById("currentDataType").innerHTML = "Songs (Top 25)";

  fetchSongData(state);
}
});

topArtists.addEventListener('click', () => {
  if (state.currentlyChecking != "artists") {
    state.currentlyChecking = "artists";

    let topArtists = document.getElementById("topArtists");
    topArtists.innerHTML = "&#9835 My Top Artists";
    topArtists.style.fontWeight = "bold"

    let topSongs = document.getElementById("topSongs");
    topSongs.innerHTML = "My Top Songs";
    topSongs.style.fontWeight = "normal";

    document.getElementById("currentDataType").innerHTML = "Artists (Top 25)";

    fetchArtistData(state);
  }
});


shortTermState.addEventListener('click', () => {
  if (state.apiArgs.time_range != "short_term") {
    state.apiArgs.time_range = "short_term"

    let shortTermState = document.getElementById("shortTermState");
    shortTermState.innerHTML = "★ Short Term (~4 weeks)"
    shortTermState.style.fontWeight = "bold";

    let mediumTermState = document.getElementById("medium_term_state");
    mediumTermState.innerHTML = "Medium Term (~6 months)"
    mediumTermState.style.fontWeight = "normal";

    let longTermState = document.getElementById("long_term_state");
    longTermState.innerHTML = "Long Term (years back)"
    longTermState.style.fontWeight = "normal";

    document.getElementById("currentTimePeriod").textContent = "Short Term (~4 weeks)"

    if (state.currentlyChecking == "artists")
      fetchArtistData(state);
    else
      fetchSongData(state)
  }
});

mediumTermState.addEventListener('click', () => {
  if (state.apiArgs.time_range != "medium_term") {
    console.log("yes i am here")
    state.apiArgs.time_range = "medium_term"

    let shortTermState = document.getElementById("shortTermState");
    shortTermState.innerHTML = "Short Term (~4 weeks)"
    shortTermState.style.fontWeight = "normal";

    let mediumTermState = document.getElementById("medium_term_state");
    mediumTermState.innerHTML = "★ Medium Term (~6 months)"
    mediumTermState.style.fontWeight = "bold";

    let longTermState = document.getElementById("long_term_state");
    longTermState.innerHTML = "Long Term (years back)"
    longTermState.style.fontWeight = "normal";

    document.getElementById("currentTimePeriod").textContent = "Medium Term (~6 months)"
    if (state.currentlyChecking == "artists") {
      console.log("yeahyup")
      fetchArtistData(state);
    }
    else 
      fetchSongData(state)
  }
});

longTermState.addEventListener('click', () => {
  if (state.currentlyChecking != "long_term") {
    state.apiArgs.time_range = "long_term"

    let shortTermState = document.getElementById("shortTermState");
    shortTermState.innerHTML = "Short Term (~4 weeks)"
    shortTermState.style.fontWeight = "normal";

    let mediumTermState = document.getElementById("medium_term_state");
    mediumTermState.innerHTML = "Medium Term (~6 months)"
    mediumTermState.style.fontWeight = "normal";

    let longTermState = document.getElementById("long_term_state");
    longTermState.innerHTML = "★ Long Term (years back)"
    longTermState.style.fontWeight = "bold";

    document.getElementById("currentTimePeriod").textContent = "Long Term (years back)"
    if (state.currentlyChecking == "artists")
      fetchArtistData(state);
    else
      fetchSongData(state)
  }
});
