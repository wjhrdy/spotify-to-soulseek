
const { promisify } = require('util');
const slsk = require('slsk-client');
const { findSongName, findHighQualityMp3 } = require('./util');
const connect = promisify(slsk.connect);

let client;
let search;
let download;

const setupSlsk = async (username, password) => {
    console.log("setting up Soulseek...");
    try {
        client = await connect({
            user: username,
            pass: password
        });
        search = promisify(client.search);
        download = promisify(client.download);
    } catch (err) {
        console.error(err);
    }
    console.log("Soulseek Setup done.")
    return Promise.resolve();
}

const downloadSong = async (songName) => {
    try {
        console.log("searching for ", songName);
        const searchResults = await search.call(client, ({ req: songName, timeout: 5000 }));
        console.log("search done!");
        const songToDownload = findHighQualityMp3(searchResults, songName);
        if(songToDownload) {
            console.log("downloading: ", songName);
            const fileName = songToDownload.file;
            await download({ file: songToDownload, path: `/data/slsk-downloads/${findSongName(fileName)}` });
            console.log("Download done: ", songName);
        }
        return Promise.resolve();
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
}

module.exports = {downloadSong, setupSlsk};