const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const dotenv = require('dotenv').config();
const {downloadSong, setupSlsk} = require('./downloadSong');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SLSK_USER = process.env.SLSK_USER;
const SLSK_PASS = process.env.SLSK_PASS;
const REDIRECT_URI = 'http://localhost:3000/auth';

const playlistId = process.argv.slice(2)[0];
const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

const downloadSongs = async (songs) => {
  const asyncArray = songs.map((songName) => () => downloadSong(songName));
  try {
   await Promise.all(asyncArray.map(elem => elem()));
  } catch (error) {
    console.log("download failed: ", error);
  }
}

const getPlaylistSongs = async () => {
  const playlist = await spotifyApi.getPlaylistTracks(playlistId);
  const songs = [];
  for (track of playlist.body.items) {
    songs.push(track.track.artists[0].name + " " + track.track.name)
  }
  console.log("Playlist found. We will try and download: ");
  console.log(songs);
  downloadSongs(songs);
}

const setAccessToken = async (code) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    console.log("Authenticated!");
    getPlaylistSongs();
  } catch (err) {
    console.log("authorization failed: ", err);
  }
}

app.get("/auth", (req, res, next) => {
  setAccessToken(req.query.code);
  res.send("You have been authenticated and can close this tab!");
})

app.listen(3000, async () => {
  console.log("listening on port 3000");
  const authorizeURL = spotifyApi.createAuthorizeURL([], "state");
  await setupSlsk(SLSK_USER, SLSK_PASS);
  console.log("Please click this link: ", authorizeURL);
})
