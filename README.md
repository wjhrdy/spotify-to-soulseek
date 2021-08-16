# Spotify to Soulseek

A nodejs script that will allow you to automatically download entire spotify playlists through soulseek.

## Setup

Go to https://developer.spotify.com/dashboard/login and make a new Spotify App. 

In your App settings, add the following redirect url: `http://localhost:3000/auth`

Create a new .env file like this:
```
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
SLSK_USER=your_soulseek_username
SLSK_PASS=your_soulseek_password
```

Usage:
```
node index.js spotify_playlist_url
```
Enjoy! 
