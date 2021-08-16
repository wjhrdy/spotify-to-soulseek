const findSongName = (fileName) => {
    let backSlashIndex = 0;
    for (let i = fileName.length - 1; i > 0; i--) {
        if (fileName[i] === `\\`[0]) {
            backSlashIndex = i;
            break;
        };
    }
    return fileName.slice(backSlashIndex + 1);
}

const findHighQualityMp3 = (results, songName) => {
    for (song of results) {
        if(song.bitrate === 320) return song;
    }
    console.log("No good bitrate found for: ", songName);
    return results[0];
}

module.exports = { findSongName, findHighQualityMp3 };