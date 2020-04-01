const express = require('express')
const episodes = express.Router()
const { client } = require('../redis/client')
const { capitalize } = require('../util/capitalize')

// Route por add character of episode
episodes.get('/:episode/add/:character', (req, res) => {
    try {
        const episode = req.params.episode
        const character = req.params.character

        client.exists(episode, (error, exists) => 
            exists > 0 
            ?   client.lrange(episode, 0 , -1, (error, characters) =>
                    !characters.includes(capitalize(character)) 
                    ? client.lpush(episode, capitalize(character)) && res.status(201).send('OK')
                    : res.status(201).send('OK')
                )
            : client.lpush(episode, capitalize(character), (error, response) => res.status(201).send('OK'))
        )
    } catch (error) {
        return next(error)
    }
})


// Route por delete character of episode
episodes.get('/:episode/delete/:character', (req, res) => {
    try {
        const episode = req.params.episode
        const character = req.params.character

        client.lrem(episode, 0, capitalize(character), (error, response) => res.status(200).send('OK'))
    } catch (error) {
        return next(error)
    }
})

// Route por get characters of episode
episodes.get('/:episode', (req, res) => {
    try {
        const episode = req.params.episode        
        
        client.exists(episode, (error, exists) => 
            exists 
            ? client.lrange(episode, 0, -1, (error, response) => 
                res.status(200).send(JSON.stringify({characters: response}, null, 2)))
            : res.status(200).send(JSON.stringify({characters: []}, null, 2))
        )
    } catch (error) {
        return next(error)
    }
})


module.exports = episodes