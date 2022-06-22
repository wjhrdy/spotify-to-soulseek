# Spotify to Soulseek

A Nodejs script that will allow you to automatically download entire Spotify playlists through Soulseek. At the moment it will only download songs with a minimum bitrate of 320kbps. 

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


**[Quick note as pointed out here](https://github.com/nlspnsgen/spotify-to-soulseek/issues/1#issuecomment-1146498844):**
You don't want to use the full playlist URL, just the last section of the URL before the parameters. For example, if my playlist's URL is: `https://open.spotify.com/playlist/abcdefghijklmo?si=1234567` then the command I would want to use would be:
```
node index.js abcdefghijklmo
```
Enjoy! 
