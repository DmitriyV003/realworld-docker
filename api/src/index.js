const express = require('express')
const {connectDb} = require('./helpers/db');
const { authApiUrl } = require('./config/index')
const axios = require('axios')
const mongoose = require('mongoose')
const app = express()
const postSchema = new mongoose.Schema({
    name: String
})
const Post = mongoose.model('Post', postSchema)

const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is on port ${process.env.PORT} !`)
    })
}

app.get('/test', (req, res) => {
    const post = new Post({ name: 'New Post Created' })
    post.save(function (err, post) {
        console.log(post)
    })
    res.json({
        post: post,
        port: process.env.PORT
    })
})

app.get('/test/current-user', async (req, res) => {
    try {
        const response = await axios.get(authApiUrl + '/test/current-user')
        res.json({
            authApiUrl: authApiUrl,
            user: response.data
        })
    } catch (e) {
        res.send({
            authApiUrl: authApiUrl,
            error: e
        })
    }
})

app.get('/data', (req, res) => {
    res.json({
        data: {
            smt: 'new data'
        }
    })
})

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
