const express = require('express');
const cache = require('memory-cache');
const axios = require('axios');

const app = express();

const secondsToCache = 43200; // 12 hours

app.get('/cars', (req, res) => {
    let cachedCars = cache.get('cars');
    if(cachedCars) {
        return res.json(cachedCars)
    } else {

axios.get('https://www.autotrader.co.uk/json/dealers/stock?dealer=833570').then((r) => {
    cache.put('cars', r.data, secondsToCache * 1000);
    return res.json(r.data)
})

    }
});

app.listen(process.env.PORT || 3000, () => console.log('running'));