const colorThiefAPI = require('colorthief');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyAPI = new SpotifyWebApi();

import { gateRemoval, gitLinkAdjustment, fade} from "./domManipulations.js"

/* 

  gustavfahraeus @ GitHub  |  ☂️ 2020 
  -----
  Where the magic happens.

  This file contains:
   - The code that is ran when the site is entered. 
   - Functions involving calls to the Spotify API.

  'colorthief' by Lokesh Dhakar (github.com/lokesh/color-thief) is used to extract the primary color in an image.
   I use it to set appropriately colored box-shadows for the artist/songs images. I think it looks pretty cool! 😊

  'spotify-web-api-node' by Michael Thelin (github.com/thelinmichael/spotify-web-api-node) is used to make the
   Spotify API calls.

*/

const userState = {
  currentlyChecking: "artists",
  apiArgs: {
    limit: "25", time_range: "short_term"
  }
}

const myParam = new URLSearchParams(window.location.search).get('access_token');
spotifyAPI.setAccessToken(myParam);

if (myParam !== null && myParam !== undefined) {
  gateRemoval();
  initialDataFetch();
  setUserProfileImage();
  gitLinkAdjustment();
} else document.getElementById("body").removeChild(document.getElementById("serverContent"));


                                                             
function initialDataFetch() {
  spotifyAPI.getMyTopArtists(userState.apiArgs).then(
    (spotifyData) => {
      for (let i = 0; i < spotifyData.body.items.length; i++) {
        let artistEntry = document.createElement('div');

        if (i === 0) artistEntry.id = "firstCell";
        if (i === 1) artistEntry.id = "secondCell";
        if (i === 2) artistEntry.id = "thirdCell";
  
        if (i % 3 === 0) artistEntry.className = "artistEntry rightEdgeCell";
        else artistEntry.className = "artistEntry";

        let artistImage = document.createElement("img");
        artistImage.setAttribute("src", spotifyData.body.items[i].images[2].url);
        artistImage.className = "artistImage";

        colorThiefAPI.getColor(spotifyData.body.items[i].images[2].url).then(
          (color) => artistImage.style.boxShadow = "3px 3px " + "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")", (err =>  console.log(err)))
     
        let artistName = document.createElement('p');
        artistName.className = "artistName";
        artistName.innerHTML = (i + 1) + '. ' + spotifyData.body.items[i].name;
       
        artistEntry.appendChild(artistName);
        artistEntry.appendChild(artistImage);
        document.getElementById("serverContent").appendChild(artistEntry);
      }}, (err) =>  console.error(err));
}

function setUserProfileImage() {
  spotifyAPI.getMe().then(
    (server_data) => {
      document.getElementById("userProfileMenuToggle").setAttribute("src", (server_data.body.images[0].url));
    
    }, (err) => console.error(err));
}

export function fetchArtistData(state) {
  spotifyAPI.getMyTopArtists(state.apiArgs).then(
    (spotifyData) => {
      let arrayOfImages = document.getElementsByClassName("artistImage");
      let arrayOfNames = document.getElementsByClassName("artistName");

      for (let i = 0; i < spotifyData.body.items.length; i++) {
        let artistEntry = arrayOfImages[i];
        let artistNameParagraph = arrayOfNames[i];
        let imageURL = spotifyData.body.items[i].images[0].url;

        fade(artistEntry);

        // We need to wait for the just made 'fade'-call to finish, before we start manipulating the DOM.
        setTimeout((passedImageURL, passedArtistEntry) => {
          colorThiefAPI.getColor(passedImageURL).then(
            (color) => artistEntry.style.boxShadow = "3px 3px " + "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")", (err =>  console.log(err)))
          passedArtistEntry.setAttribute("src", passedImageURL)
        }, 425, imageURL, artistEntry);

        artistNameParagraph.innerHTML = (i + 1) + '. ' + spotifyData.body.items[i].name;
      }
    }, (err) =>console.error(err));
}


export function fetchSongData(state) {
  spotifyAPI.getMyTopTracks(state.apiArgs).then(
    (spotifyData) => {
    let arrayOfImages = document.getElementsByClassName("artistImage");
    let arrayOfNames = document.getElementsByClassName("artistName");

    for (let i = 0; i < 25; i++) {
      let artistEntry = arrayOfImages[i];
      let artistNameParagraph = arrayOfNames[i];
      let imageURL = spotifyData.body.items[i].album.images[0].url;
    
      fade(artistEntry);


      setTimeout((passedImageURL, passedArtistEntry) => {
        colorThiefAPI.getColor(passedImageURL).then(
          (color) => artistEntry.style.boxShadow = "3px 3px " + "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")", (err =>  console.log(err)))
        passedArtistEntry.setAttribute("src", passedImageURL)
      }, 425, imageURL, artistEntry);

      artistNameParagraph.innerHTML = (i + 1) + '. ' + spotifyData.body.items[i].name;
    }
  }, (err) =>console.error(err));
}



