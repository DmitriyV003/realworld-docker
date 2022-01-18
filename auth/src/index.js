const express = require('express')
const { connectDb } = require('./helpers/db');
const axios = require('axios')
const { apiUrl } = require('./config/index')
const app = express()

const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is on port ${process.env.PORT} !`)
    })
}

app.get('/test/current-user', (req, res) => {
    res.json({
        id: 125,
        name: 'John'
    })
})

app.get('/test/from-api', async (req, res) => {
    try {
        const response = await axios.get(apiUrl + '/data')
        res.json({
            authApiUrl: apiUrl,
            user: response.data
        })
    } catch (e) {
        res.send({
            authApiUrl: apiUrl,
            error: e
        })
    }
})

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
