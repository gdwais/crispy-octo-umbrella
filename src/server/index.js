const express = require('express')
const app = express()
const port = 9001

let request = require('async-request');

const { name, version } = require('../../package.json');
const logMessage = (msg) => {
  //just logging to console here but ideally would be sending to a message queue or anywhere you want!
  console.log(`${name} v${version} :: ${msg}`);
};

app.get('/series-videos/:seriesId', async (req, res, next) => {
  try {
    req.params.seriesId ? logMessage(`retrieving data for ${req.params.seriesId}`) : res.status(500).send(`missing seriesId`);
    let { seriesId } = req.params;
    let seriesResponse = await request(`https://brooklyn.gaia.com/node/${seriesId}`);
    let { title, hero_image } = JSON.parse(seriesResponse.body);
    let episodesResponse = await request(`https://brooklyn.gaia.com/v2/videos/series/${seriesId}`);
    let epList = [];
    let { videos } = JSON.parse(episodesResponse.body);
    for (let vid of videos) {
      epList.push({
        episodeTitle: vid.title,
        episodeNumber: vid.episode,
      });
    }
    res.status(200).send({
      seriesHeroArt: hero_image,
      seriesTitle: title,
      episodesList: epList
    });
  } catch(err) {
    logMessage(err);
    res.status(500).send(err);
  }

})

app.listen(port, () => logMessage(`Congrats, the server is running.  Serving from port: ${port}`))